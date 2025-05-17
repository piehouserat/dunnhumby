namespace Dunnhumby.Contracts;

public record CreateProductRequest
{
    public string Name { get; init; } = null!;
    
    public decimal Price { get; init; }
    
    public Guid CategoryId { get; init; }
}
