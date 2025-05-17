using Dunnhumby.DataAccess;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public class ProductQueryService : IProductQueryService
{
    private readonly IProductRepository _repository;

    public ProductQueryService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync(int pageNumber, int pageSize)
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Product?> GetProductByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}