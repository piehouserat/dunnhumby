using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Categories;

public interface ICategoryQueryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync(int pageNumber, int pageSize);
    
    Task<Category?> GetCategoryByIdAsync(Guid id);
}