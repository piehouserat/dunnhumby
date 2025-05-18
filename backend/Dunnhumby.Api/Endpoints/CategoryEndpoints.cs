using Dunnhumby.Contracts;
using Dunnhumby.Services.Categories;

namespace Dunnhumby.Api.Endpoints;

public static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/categories", async (ICategoryQueryService categoryService) =>
        {
            var categories = await categoryService.GetAllCategoriesAsync(1, 10);
            return Results.Ok(categories);
        });
        
        endpoints.MapGet("/categories/seed", async (ICategoryCommandService categoryService) =>
        {
            try
            {
                await categoryService.SeedAsync();
                return Results.Ok("Successfully seeded categories");
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to seed categories: {ex.Message}");
            }
        });
        
        endpoints.MapGet("/categories/totals", async (
            ICategoryQueryService categoryService,
            [AsParameters] DateRangeRequest request) =>
        {
            var totals = await categoryService.GetCategoryTotalsAsync(request.StartDate, request.EndDate);
            return Results.Ok(totals);
        });

        return endpoints;
    }
}