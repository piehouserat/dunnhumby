using Dunnhumby.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess.Repositories.Products;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, Guid? categoryId = null)
    {
        var query = _context.Products
            .Include(p => p.Category)
            .AsQueryable();

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var totalCount = await query.CountAsync();

        var products = await query
            .OrderByDescending(p => p.DateAdded)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Product>(products, totalCount);
    }

    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<Product> AddAsync(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task DeleteAsync(Guid id)
    {
        int affectedRows = await _context.Products.Where(p => p.Id == id).ExecuteDeleteAsync();
        
        if (affectedRows == 0)
        {
            throw new Exception("Product not found");
        }
    }

    public async Task DeleteAllAsync()
    {
        await _context.Products.ExecuteDeleteAsync();
    }
    
    public async Task<IEnumerable<Product>> GetProductsInDateRangeAsync(DateTime fromDate, DateTime toDate)
    {
        return await _context.Products
            .Where(p => p.DateAdded >= fromDate && p.DateAdded <= toDate)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<(DateTime Date, int ProductCount, int StockQuantity)>> GetDailyProductStatsAsync(
        DateTime fromDate, 
        DateTime toDate)
    {
        var results = await _context.Products
            .Where(p => p.DateAdded.Date >= fromDate.Date && p.DateAdded.Date <= toDate.Date)
            .GroupBy(p => p.DateAdded.Date)
            .Select(g => new
            {
                Date = g.Key,
                ProductCount = g.Count(),
                InitialStockQuantity = g.Sum(p => p.StockQuantity)
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        return results.Select(r => (r.Date, r.ProductCount, r.InitialStockQuantity));
    }
}