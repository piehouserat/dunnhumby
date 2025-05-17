using Dunnhumby.Contracts;

namespace Dunnhumby.Services.Products;

public interface IProductCommandService
{
    Task<Guid> CreateProductAsync(CreateProductRequest request);
    
    Task DeleteProductAsync(Guid id);
    
    Task SeedAsync();
}