using Dunnhumby.DataAccess.Repositories.Categories;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Services.Categories;

public class CategoryCommandService : ICategoryCommandService
{
    private readonly ICategoryRepository _repository;

    public CategoryCommandService(ICategoryRepository repository)
    {
        _repository = repository;
    }
    
    public async Task SeedAsync()
    {
        var existing = await _repository.GetAllAsync();
        
        if (existing.Any())
        {
            return;
        }

        var categories = new List<Category>
        {
            new() { Id = Guid.NewGuid(), Name = "Electronics" },
            new() { Id = Guid.NewGuid(), Name = "Home Appliances" },
            new() { Id = Guid.NewGuid(), Name = "Books" },
            new() { Id = Guid.NewGuid(), Name = "Clothing" },
            new() { Id = Guid.NewGuid(), Name = "Footwear" },
            new() { Id = Guid.NewGuid(), Name = "Toys" },
            new() { Id = Guid.NewGuid(), Name = "Sports & Outdoors" },
            new() { Id = Guid.NewGuid(), Name = "Health & Beauty" },
            new() { Id = Guid.NewGuid(), Name = "Groceries" },
            new() { Id = Guid.NewGuid(), Name = "Office Supplies" },
            new() { Id = Guid.NewGuid(), Name = "Furniture" },
            new() { Id = Guid.NewGuid(), Name = "Garden & Outdoor" },
            new() { Id = Guid.NewGuid(), Name = "Automotive" },
            new() { Id = Guid.NewGuid(), Name = "Pet Supplies" },
            new() { Id = Guid.NewGuid(), Name = "Jewelry" },
            new() { Id = Guid.NewGuid(), Name = "Watches" },
            new() { Id = Guid.NewGuid(), Name = "Musical Instruments" },
            new() { Id = Guid.NewGuid(), Name = "Baby Products" },
            new() { Id = Guid.NewGuid(), Name = "Video Games" },
            new() { Id = Guid.NewGuid(), Name = "DIY & Tools" }
        };

        foreach (var category in categories)
        {
            await _repository.AddAsync(category);
        }
    }
}