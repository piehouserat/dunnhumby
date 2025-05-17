using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public interface IProductCommandService
{
    // Task<Product> AddProductAsync(string name, decimal price, ProductType type);
    
    Task DeleteProductAsync(Guid id);
    
    Task SeedAsync();
}