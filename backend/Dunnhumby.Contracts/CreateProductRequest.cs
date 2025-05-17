namespace Dunnhumby.Contracts;

public record CreateProductRequest
{
    public string Name { get; init; } = null!;
    
    public decimal Price { get; init; }
    
    public Guid CategoryId { get; init; }
    
    public string ProductCode { get; init; } = null!;
    
    public string Sku { get; init; } = null!;
    
    public int StockQuantity { get; init; }
}
