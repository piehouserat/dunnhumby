namespace Dunnhumby.Contracts;

public record ProductTotalsDto(
    int TotalProductCount,
    int TotalStockQuantity,
    decimal TotalStockValue,
    IEnumerable<CategoryTotalsDto> CategoryTotals,
    DateTime FromDate,
    DateTime ToDate
);
