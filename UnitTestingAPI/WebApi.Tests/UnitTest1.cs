namespace WebApi.Tests;

using WebApi.IProductRepository;
using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

public class ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public ApiTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    private HttpClient CreateClientWithSeed()
    {
        var factory = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var repo = new InMemoryProductRepository();
                
                repo.Products.AddRange(new List<Product>
                    {
                        new Product { Id = 1, Name = "Lapop", Price = 10.0M },
                        new Product { Id = 2, Name = "Mouse", Price = 20.0M }
                    });

                services.AddSingleton<IProductRepository>(repo);
            });
        });
        return factory.CreateClient();
    }


    [Fact]
    public async Task GetRoot_ReturnsHelloWorld()
    {
        // Arrange
        var client = CreateClientWithSeed();

        // Act
        var response = await client.GetAsync("/");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Be("Hello World!");
    }

    [Fact]
    public async Task PostEcho_ReturnsSameMessage()
    {
        // Arrange
        var client = CreateClientWithSeed();
        var request = new { Message = "Test Message" };

        // Act
        var response = await client.PostAsJsonAsync("/echo", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var echoedMessage = await response.Content.ReadFromJsonAsync<Request>();

        echoedMessage.Should().NotBeNull();
        echoedMessage!.Message.Should().Be(request.Message);
    }

    [Fact]
    public async Task DeleteProduct_RemovesProduct()
    {
        // Arrange
        var client = CreateClientWithSeed();

        // Act
        var deleteResponse = await client.DeleteAsync("/products/1");

        // Assert
        deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var getResponse = await client.GetAsync("/products");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var products = await getResponse.Content.ReadFromJsonAsync<List<Product>>();

        products.Should().NotBeNull();
        products!.Should().HaveCount(1);
        products[0].Id.Should().Be(2);
    }

    [Fact]
    public async Task GetProducts_ReturnsSeededProducts()
    {
        // Arrange
        var client = CreateClientWithSeed();

        // Act
        var response = await client.GetAsync("/products");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var products = await response.Content.ReadFromJsonAsync<List<Product>>();

        products.Should().NotBeNull();
        products!.Should().HaveCount(2);
        products[0].Id.Should().Be(1);
        products[0].Name.Should().Be("Lapop");
        products[0].Price.Should().Be(10.0M);
        products[1].Id.Should().Be(2);
        products[1].Name.Should().Be("Mouse");
        products[1].Price.Should().Be(20.0M);
    }

    [Fact]
    public async Task PostProduct_AddsNewProduct()
    {
        // Arrange
        var client = CreateClientWithSeed();
        var newProduct = new Product { Id = 3, Name = "Keyboard", Price = 30.0M };

        // Act
        var response = await client.PostAsJsonAsync("/products", newProduct);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        var createdProduct = await response.Content.ReadFromJsonAsync<Product>();

        createdProduct.Should().NotBeNull();
        createdProduct!.Id.Should().Be(newProduct.Id);
        createdProduct.Name.Should().Be(newProduct.Name);
        createdProduct.Price.Should().Be(newProduct.Price);

        // Verify the product was added
        var getResponse = await client.GetAsync("/products");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var products = await getResponse.Content.ReadFromJsonAsync<List<Product>>();

        products.Should().NotBeNull();
        products!.Should().ContainSingle(p => p.Id == newProduct.Id && p.Name == newProduct.Name && p.Price == newProduct.Price);
    }

    [Fact]
    public async Task PutProduct_UpdatesExistingProduct()
    {
        // Arrange
        var client = CreateClientWithSeed();
        var updatedProduct = new Product { Id = 1, Name = "Updated Laptop", Price = 15.0M };

        // Act
        var response = await client.PutAsJsonAsync("/products/1", updatedProduct);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var product = await response.Content.ReadFromJsonAsync<Product>();

        product.Should().NotBeNull();
        product!.Id.Should().Be(updatedProduct.Id);
        product.Name.Should().Be(updatedProduct.Name);
        product.Price.Should().Be(updatedProduct.Price);

        // Verify the product was updated
        var getResponse = await client.GetAsync("/products");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var products = await getResponse.Content.ReadFromJsonAsync<List<Product>>();

        products.Should().NotBeNull();
        products!.Should().ContainSingle(p => p.Id == updatedProduct.Id && p.Name == updatedProduct.Name && p.Price == updatedProduct.Price);
    }
}
