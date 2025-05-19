using Dunnhumby.Domain.Common;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess.Repositories.Products;

public interface IProductRepository
{
    Task<PagedResult<Product>> GetAllAsync(int? page = null, int? pageSize = null, Guid? categoryId = null, ProductOrderBy? orderBy = null, bool? isDescending = null);
    
    Task<Product?> GetByIdAsync(Guid id);
    
    Task<Product> AddAsync(Product product);
    
    Task DeleteAsync(Guid id);
    
    Task DeleteAllAsync();
    
    Task<IEnumerable<Product>> GetProductsInDateRangeAsync(DateTime fromDate, DateTime toDate);
    
    Task<IEnumerable<(DateTime Date, int ProductCount, int StockQuantity)>> GetDailyProductStatsAsync(DateTime fromDate, DateTime toDate);
}
