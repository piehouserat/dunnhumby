using Microsoft.EntityFrameworkCore;
using Dunnhumby.Domain.Products;

namespace Dunnhumby.DataAccess;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    
    public DbSet<Category> Categories { get; set; }
}