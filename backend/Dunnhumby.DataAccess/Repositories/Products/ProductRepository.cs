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

    public async Task<PagedResult<Product>> GetAllAsync(int? page = null, int? pageSize = null, Guid? categoryId = null, ProductOrderBy? orderBy = null, bool? isDescending = null)
    {
        var query = _context.Products
            .Include(p => p.Category)
            .AsNoTracking();

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }
        
        if (orderBy == null)
        {
            query = query.OrderByDescending(p => p.DateAdded);
        }
        else
        {
            var descending = isDescending ?? true;
        
            query = orderBy.Value switch
            {
                ProductOrderBy.Name => descending 
                    ? query.OrderByDescending(p => p.Name)
                    : query.OrderBy(p => p.Name),
                ProductOrderBy.Price => descending 
                    ? query.OrderByDescending(p => (double)p.Price)
                    : query.OrderBy(p => (double)p.Price),
                ProductOrderBy.Category => descending 
                    ? query.OrderByDescending(p => p.Category.Name)
                    : query.OrderBy(p => p.Category.Name),
                ProductOrderBy.StockQuantity => descending 
                    ? query.OrderByDescending(p => p.StockQuantity)
                    : query.OrderBy(p => p.StockQuantity),
                ProductOrderBy.DateAdded => descending 
                    ? query.OrderByDescending(p => p.DateAdded)
                    : query.OrderBy(p => p.DateAdded),
                _ => query.OrderByDescending(p => p.DateAdded)
            };
        }

        var totalCount = await query.CountAsync();

        if (page.HasValue && pageSize.HasValue)
        {
            query = query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value);
        }

        var products = await query.ToListAsync();

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