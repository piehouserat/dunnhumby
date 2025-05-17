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

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
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
}