using Dunnhumby.Domain.Products;
using Microsoft.EntityFrameworkCore;

namespace Dunnhumby.DataAccess.Repositories.Categories;

public class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
{
    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await context.Categories.OrderBy(c => c.Name).ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await context.Categories.FindAsync(id);
    }

    public async Task<Category> AddAsync(Category category)
    {
        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task UpdateAsync(Category category)
    {
        context.Entry(category).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var category = await context.Categories.FindAsync(id);
        if (category != null)
        {
            context.Categories.Remove(category);
            await context.SaveChangesAsync();
        }
    }
    
    public async Task<IEnumerable<CategoryTotalResult>> GetCategoryTotalsInDateRangeAsync(DateTime fromDate, DateTime toDate)
    {
        return await context.Categories
            .GroupJoin(
                context.Products.Where(p => p.DateAdded >= fromDate && p.DateAdded <= toDate),
                c => c.Id,
                p => p.CategoryId,
                (category, products) => new CategoryTotalResult(
                    category.Id,
                    category.Name,
                    products.Count(),
                    products.DefaultIfEmpty().Sum(p => p == null ? 0 : p.StockQuantity),
                    products.DefaultIfEmpty().Sum(p => p == null ? 0 : p.Price * p.StockQuantity)
                ))
            .ToListAsync();
    }
}