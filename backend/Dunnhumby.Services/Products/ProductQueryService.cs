using Dunnhumby.Contracts;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Common.Extensions;

namespace Dunnhumby.Services.Products;

public class ProductQueryService : IProductQueryService
{
    private readonly IProductRepository _repository;

    public ProductQueryService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<PaginatedResponse<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize, Guid? categoryId = null)
    {
        var pagedResult = await _repository.GetAllAsync(pageNumber, pageSize, categoryId);

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

        return new PaginatedResponse<ProductDto>(productDtos, pagedResult.TotalCount);

    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);

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
        var from = fromDate ?? DateTime.Now.Date.StartOfMonth();
        var to = toDate ?? DateTime.Now;

        var products = await _repository.GetProductsInDateRangeAsync(from, to);
        var categoryTotals = await _repository.GetCategoryTotalsInDateRangeAsync(from, to);

        var categoryTotalsDtos = categoryTotals
            .Select(ct => new CategoryTotalsDto(
                ct.CategoryId,
                ct.CategoryName,
                ct.ProductCount,
                ct.StockQuantity,
                ct.StockValue
            ))
            .ToList();

        return new ProductTotalsDto(
            TotalProductCount: products.Count(),
            TotalStockQuantity: products.Sum(p => p.StockQuantity),
            TotalStockValue: products.Sum(p => p.Price * p.StockQuantity),
            CategoryTotals: categoryTotalsDtos,
            FromDate: from,
            ToDate: to
        );
    }
}