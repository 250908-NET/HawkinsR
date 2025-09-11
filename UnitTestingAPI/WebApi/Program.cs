using WebApi.IProductRepository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IProductRepository, InMemoryProductRepository>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/echo", (Request message) => Results.Ok(message));

app.MapGet("/products", (IProductRepository repo) => Results.Ok(repo.Products));

app.MapPost("/products", (Product product, IProductRepository repo) =>
{
  repo.Products.Add(product);
  return Results.Created($"/products/{product.Id}", product);
});

app.MapPut("/products/{id}", (int id, Product updatedProduct, IProductRepository repo) =>
{
  var product = repo.Products.FirstOrDefault(p => p.Id == id);
  if (product is null) return Results.NotFound();

  product.Name = updatedProduct.Name;
  product.Price = updatedProduct.Price;
  return Results.Ok(product);
});

app.MapDelete("/products/{id}", (int id, IProductRepository repo) =>
{
  var product = repo.Products.FirstOrDefault(p => p.Id == id);
  if (product is null) return Results.NotFound();

  repo.Products.Remove(product);
  return Results.NoContent();
});

app.Run();

public record Request(string Message);

public partial class Program { } // For integration testing

