using Dunnhumby.Services.Categories;

namespace Dunnhumby.Api.Endpoints
{
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

            return endpoints;
        }
    }
}