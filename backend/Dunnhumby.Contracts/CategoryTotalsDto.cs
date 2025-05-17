namespace Dunnhumby.Contracts;

public record CategoryTotalsDto(
    Guid CategoryId,
    string CategoryName,
    int TotalQuantity,
    decimal TotalValue
);