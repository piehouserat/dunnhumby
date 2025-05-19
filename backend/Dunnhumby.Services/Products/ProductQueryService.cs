using Dunnhumby.Contracts;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Common.Extensions;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public class ProductQueryService(IProductRepository repository) : IProductQueryService
{
    public async Task<PaginatedResponse<ProductDto>> GetAllProductsAsync(int? page = null, int? pageSize = null, Guid? categoryId = null, string? orderBy = null, bool? isDescending = null)
    {
        var orderByEnum = orderBy != null 
            ? Enum.TryParse<ProductOrderBy>(orderBy, true, out var result) 
                ? result 
                : ProductOrderBy.DateAdded 
            : ProductOrderBy.DateAdded;

        var pagedResult = await repository.GetAllAsync(page, pageSize, categoryId, orderByEnum, isDescending);

        var productDtos = pagedResult.Items.Select(p => new ProductDto(
            p.Id,
            p.Name,
            p.ProductCode,
            p.Price,
            p.Sku,
            p.StockQuantity,
            p.DateAdded,
            p.CategoryId,
            p.Category?.Name ?? string.Empty
        ));

        return new PaginatedResponse<ProductDto> { Data = productDtos, Total = pagedResult.TotalCount };

    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid id)
    {
        var product = await repository.GetByIdAsync(id);

        return product == null ? null : new ProductDto(
            product.Id,
            product.Name,
            product.ProductCode,
            product.Price,
            product.Sku,
            product.StockQuantity,
            product.DateAdded,
            product.CategoryId,
            product.Category?.Name ?? string.Empty
        );
    }

    public async Task<ProductTotalsDto> GetProductTotalsAsync(DateTime? fromDate = null, DateTime? toDate = null)
    {
        var from = (fromDate ?? DateTime.Now.Date.StartOfMonth()).StartOfDay();
        var to = (toDate ?? DateTime.Now).EndOfDay();

        var products = await repository.GetProductsInDateRangeAsync(from, to);
        
        return new ProductTotalsDto(
            TotalProductCount: products.Count(),
            TotalStockQuantity: products.Sum(p => p.StockQuantity),
            TotalStockValue: products.Sum(p => p.Price * p.StockQuantity),
            FromDate: from,
            ToDate: to
        );
    }
    
    public async Task<IEnumerable<DailyProductStats>> GetDailyProductStatsAsync(DateTime? fromDate, DateTime? toDate)
    {
        var from = fromDate ?? DateTime.Now.Date.StartOfMonth();
        var to = toDate ?? DateTime.Now;

        var stats = await repository.GetDailyProductStatsAsync(from, to);
        
        var dailyStats = stats.Select(s => new DailyProductStats(
            DateOnly.FromDateTime(s.Date),
            s.ProductCount,
            s.StockQuantity
        ));

        return dailyStats;
    }
}