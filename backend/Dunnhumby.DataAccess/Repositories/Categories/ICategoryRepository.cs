using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess.Repositories.Categories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllAsync();
    
    Task<Category?> GetByIdAsync(Guid id);
    
    Task<Category> AddAsync(Category category);
    
    Task UpdateAsync(Category category);
    
    Task DeleteAsync(Guid id);
    
    Task<IEnumerable<CategoryTotalResult>> GetCategoryTotalsInDateRangeAsync(DateTime fromDate, DateTime toDate);
}