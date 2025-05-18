using Dunnhumby.Contracts;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public interface IProductQueryService
{
    Task<PaginatedResponse<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize, Guid? categoryId = null);
    
    Task<ProductDto?> GetProductByIdAsync(Guid id);
    
    Task<ProductTotalsDto> GetProductTotalsAsync(DateTime? fromDate = null, DateTime? toDate = null);
    
    Task<IEnumerable<DailyProductStats>> GetDailyProductStatsAsync(DateTime? fromDate, DateTime? toDate);
}