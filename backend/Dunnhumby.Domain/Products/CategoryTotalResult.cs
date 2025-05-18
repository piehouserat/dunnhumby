namespace Dunnhumby.Domain.Products;

public record CategoryTotalResult(
    Guid CategoryId,
    string CategoryName,
    int ProductCount,
    int StockQuantity,
    decimal StockValue
);
