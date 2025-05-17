using Dunnhumby.Domain.Common;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess.Repositories.Products;

public interface IProductRepository
{
    Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, Guid? categoryId = null);
    
    Task<Product?> GetByIdAsync(Guid id);
    
    Task<Product> AddAsync(Product product);
    
    Task DeleteAsync(Guid id);
    
    Task DeleteAllAsync();
    
    Task<IEnumerable<Product>> GetProductsInDateRangeAsync(DateTime fromDate, DateTime toDate);
    
    Task<IEnumerable<CategoryTotalResult>> GetCategoryTotalsInDateRangeAsync(DateTime fromDate, DateTime toDate);
}
