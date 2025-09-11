namespace WebApi.IProductRepository;

public interface IProductRepository
{
  List<Product> Products { get; }
}

public class InMemoryProductRepository : IProductRepository
{
  public List<Product> Products { get; } = new();
}

public record Product
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public decimal Price { get; set; }
}