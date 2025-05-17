using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public interface IProductQueryService
{
    Task<IEnumerable<Product>> GetAllProductsAsync(int pageNumber, int pageSize);
    
    Task<Product?> GetProductByIdAsync(Guid id);
}