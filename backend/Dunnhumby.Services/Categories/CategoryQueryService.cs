using Dunnhumby.Common.Extensions;
using Dunnhumby.Contracts;
using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Categories;

public class CategoryQueryService(ICategoryRepository repository) : ICategoryQueryService
{
    public async Task<IEnumerable<Category>> GetAllCategoriesAsync(int pageNumber, int pageSize)
    {
        return await repository.GetAllAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        return await repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<CategoryTotalsDto>> GetCategoryTotalsAsync(DateTime? fromDate = null, DateTime? toDate = null)
    {
        var from = fromDate ?? DateTime.Now.Date.StartOfMonth();
        var to = toDate ?? DateTime.Now;
        
        var categoryTotals = await repository.GetCategoryTotalsInDateRangeAsync(from, to);

        var categoryTotalsDtos = categoryTotals
            .Select(ct => new CategoryTotalsDto(
                ct.CategoryId,
                ct.CategoryName,
                ct.ProductCount,
                ct.StockQuantity,
                ct.StockValue
            ))
            .ToList();

        return categoryTotalsDtos;
    }
}