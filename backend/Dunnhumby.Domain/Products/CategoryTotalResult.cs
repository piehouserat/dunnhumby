namespace Dunnhumby.Domain.Products;

public record CategoryTotalResult(
    Guid CategoryId,
    string CategoryName,
    int TotalQuantity,
    decimal TotalValue
);
