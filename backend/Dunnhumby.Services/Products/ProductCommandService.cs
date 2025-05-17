using Dunnhumby.DataAccess;
using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public class ProductCommandService : IProductCommandService
{
    private readonly IProductRepository _repository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductCommandService(IProductRepository repository, ICategoryRepository categoryRepository)
    {
        _repository = repository;
        _categoryRepository = categoryRepository;
    }

    // public async Task<Product> AddProductAsync(string name, decimal price, ProductType type)
    // {
    //     return await _repository.AddProductAsync();
    // }

    public async Task DeleteProductAsync(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
        {
            throw new Exception("Product not found");
        }
        await _repository.DeleteAsync(id);
    }

    public async Task SeedAsync()
    {
        var existing = await _repository.GetAllAsync();
        if (existing.Any())
            return;

        var categories = await _categoryRepository.GetAllAsync();
        var random = new Random();

        foreach (var category in categories)
        {
            var count = random.Next(50, 101);

            for (int i = 0; i < count; i++)
            {
                var product = new Product
                {
                    Id = Guid.NewGuid(),
                    Name = $"{category.Name} Product {i + 1}",
                    ProductCode = $"{category.Name.Substring(0, 3).ToUpper()}{i + 1:D4}",
                    Price = Math.Round((decimal)(random.NextDouble() * 100 + 1), 2),
                    Sku = $"SKU-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    StockQuantity = random.Next(0, 500),
                    DateAdded = DateTime.UtcNow,
                    CategoryId = category.Id
                };

                await _repository.AddAsync(product);
            }
        }
    }
}