using Dunnhumby.DataAccess;
using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Categories;

public class CategoryQueryService : ICategoryQueryService
{
    private readonly ICategoryRepository _repository;

    public CategoryQueryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync(int pageNumber, int pageSize)
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}