using Dunnhumby.Contracts;
using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Products;

public class ProductCommandService : IProductCommandService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductCommandService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<Guid> CreateProductAsync(CreateProductRequest request)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Price = request.Price,
            CategoryId = request.CategoryId
        };

        await _productRepository.AddAsync(product);
        return product.Id;

    }


    public async Task DeleteProductAsync(Guid id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
        {
            throw new Exception("Product not found");
        }
        await _productRepository.DeleteAsync(id);
    }

    public async Task SeedAsync()
    {
        // Clear all existing products
        await _productRepository.DeleteAllAsync();

        var categories = await _categoryRepository.GetAllAsync();
        var random = new Random();
    
        // Calculate date range
        var endDate = DateTime.UtcNow;
        var startDate = endDate.AddYears(-2);
        var rangeDays = (endDate - startDate).Days;

        foreach (var category in categories)
        {
            var count = random.Next(50, 101);

            for (int i = 0; i < count; i++)
            {
                // Generate random date within the last 2 years
                var randomDays = random.Next(rangeDays);
                var randomDate = startDate.AddDays(randomDays);

                var product = new Product
                {
                    Id = Guid.NewGuid(),
                    Name = $"{category.Name} Product {i + 1}",
                    ProductCode = $"{category.Name.Substring(0, 3).ToUpper()}{i + 1:D4}",
                    Price = Math.Round((decimal)(random.NextDouble() * 100 + 1), 2),
                    Sku = $"SKU-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    StockQuantity = random.Next(0, 500),
                    DateAdded = randomDate,
                    CategoryId = category.Id
                };

                await _productRepository.AddAsync(product);
            }
        }
    }
}