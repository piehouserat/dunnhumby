using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dunnhumby.Domain.Products;

public class Product
{
    public Guid Id { get; set; }
    
    [Required]
    public required string Name { get; set; } = string.Empty;
    
    [Required]
    public string ProductCode { get; set; } = string.Empty;

    [Required]
    public decimal Price { get; set; }

    [Required]
    public string Sku { get; set; } = string.Empty;

    [Required]
    public int StockQuantity { get; set; }

    public DateTime DateAdded { get; set; } = DateTime.UtcNow;

    [ForeignKey("Category")]
    public Guid CategoryId { get; set; }

    public Category? Category { get; set; }
}