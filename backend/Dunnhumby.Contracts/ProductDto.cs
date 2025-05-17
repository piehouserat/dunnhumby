namespace Dunnhumby.Contracts;

public record ProductDto(
    Guid Id,
    string Name,
    string ProductCode,
    decimal Price,
    string Sku,
    int StockQuantity,
    DateTime DateAdded,
    Guid CategoryId,
    string CategoryName
);