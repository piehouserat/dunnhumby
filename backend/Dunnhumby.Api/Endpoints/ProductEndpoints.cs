using Dunnhumby.Common.Extensions;
using Dunnhumby.Contracts;
using Dunnhumby.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace Dunnhumby.Api.Endpoints;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/products", async ([AsParameters] GetProductsRequest request, IProductQueryService productService) =>
        {
            var response = await productService.GetAllProductsAsync(request.Page, request.PageSize, request.CategoryId, request.OrderBy, request.IsDescending);
            return Results.Ok(response);
        });
        
        endpoints.MapGet("/products/{productId:guid}", async (Guid productId, IProductQueryService productService) =>
        {
            var product = await productService.GetProductByIdAsync(productId);
            return product is null ? Results.NotFound() : Results.Ok(product);
        });

        
        endpoints.MapGet("/products/seed", async (IProductCommandService productService) =>
        {
            try
            {
                await productService.SeedAsync();
                return Results.Ok("Successfully seeded products");
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to seed products: {ex.Message}");
            }
        });
        
        endpoints.MapPost("/products", async (CreateProductRequest request, IProductCommandService productService) =>
        {
            try
            {
                var productId = await productService.CreateProductAsync(request);
                return Results.Created($"/products/{productId}", productId);
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to create product: {ex.Message}");
            }
        });

        endpoints.MapDelete("/products/{productId:guid}", async (Guid productId, IProductCommandService productService) =>
        {
            try
            {
                await productService.DeleteProductAsync(productId);
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                return Results.Problem($"Failed to delete product: {ex.Message}");
            }
        });
        
        endpoints.MapGet("/products/totals", async (
            [AsParameters] DateRangeRequest request,
            IProductQueryService productService) =>
        {

    
            var totals = await productService.GetProductTotalsAsync(request.StartDate, request.EndDate);
            return Results.Ok(totals);
        });
        
        endpoints.MapGet("/products/daily-stats", async (
            [AsParameters] DateRangeRequest request,
            IProductQueryService productService) =>
        {
            var stats = await productService.GetDailyProductStatsAsync(request.StartDate, request.EndDate);
            return Results.Ok(stats);
        });
        
        return endpoints;
    }
}