using System.ComponentModel.DataAnnotations;

namespace Dunnhumby.Domain.Products;

public class Category
{
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}