namespace Dunnhumby.Contracts;

public record CategoryTotalsDto(
    Guid CategoryId,
    string CategoryName,
    int ProductCount,
    int StockQuantity,
    decimal StockValue
);