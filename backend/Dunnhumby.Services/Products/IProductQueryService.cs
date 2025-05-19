using Dunnhumby.Contracts;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public interface IProductQueryService
{
    Task<PaginatedResponse<ProductDto>> GetAllProductsAsync(int? page = null, int? pageSize = null, Guid? categoryId = null, string? orderBy = null, bool? isDescending = false);
    
    Task<ProductDto?> GetProductByIdAsync(Guid id);
    
    Task<ProductTotalsDto> GetProductTotalsAsync(DateTime? fromDate = null, DateTime? toDate = null);
    
    Task<IEnumerable<DailyProductStats>> GetDailyProductStatsAsync(DateTime? fromDate, DateTime? toDate);
}