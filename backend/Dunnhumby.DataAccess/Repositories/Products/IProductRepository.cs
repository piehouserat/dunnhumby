using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess.Repositories.Products;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    
    Task<Product?> GetByIdAsync(Guid id);
    
    Task<Product> AddAsync(Product product);
    
    Task DeleteAsync(Guid id);
}
