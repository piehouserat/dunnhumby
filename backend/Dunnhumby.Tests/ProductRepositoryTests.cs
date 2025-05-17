using Microsoft.EntityFrameworkCore;
using Dunnhumby.DataAccess;
using Dunnhumby.DataAccess.Repositories.Products;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.Tests;

public class ProductRepositoryTests : IAsyncLifetime
{
    private ApplicationDbContext _dbContext;

    private ApplicationDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        return new ApplicationDbContext(options);
    }

    public async Task InitializeAsync()
    {
        _dbContext = GetInMemoryDbContext();
    }

    public async Task DisposeAsync()
    {
        // Reset database after each test
        await _dbContext.Database.EnsureDeletedAsync();
        await _dbContext.DisposeAsync();
    }

    [Fact]
    public async Task AddProductAsync_Should_Add_Product_To_Database()
    {
        // Arrange
        var dbContext = GetInMemoryDbContext();
        var repository = new ProductRepository(dbContext);
        var category = new Category { Id = Guid.NewGuid(), Name = "Electronics" };
        await dbContext.Categories.AddAsync(category);
        await dbContext.SaveChangesAsync();
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = "Test Product",
            CategoryId = category.Id,
            Price = 9.99m
        };

        // Act
        await repository.AddAsync(product);
        var result = await repository.GetByIdAsync(product.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Product", result.Name);
        Assert.Equal(9.99m, result.Price);
    }

    [Fact]
    public async Task GetAllProductsAsync_Should_Return_All_Products()
    {
        // Arrange
        var dbContext = GetInMemoryDbContext();
        var repository = new ProductRepository(dbContext);
        var category = new Category { Id = Guid.NewGuid(), Name = "Electronics" };
        await dbContext.Categories.AddAsync(category);
        await dbContext.SaveChangesAsync();
        await repository.AddAsync(new Product { Id = Guid.NewGuid(), Name = "Product 1", CategoryId = category.Id, Price = 5.99m });
        await repository.AddAsync(new Product { Id = Guid.NewGuid(), Name = "Product 2", CategoryId = category.Id, Price = 12.49m });

        // Act
        var products = await repository.GetAllAsync(1, 10);

        // Assert
        Assert.Equal(2, products.TotalCount);
    }
}