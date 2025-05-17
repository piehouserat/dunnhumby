using Dunnhumby.Common.Extensions;
using Dunnhumby.Contracts;
using Dunnhumby.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace Dunnhumby.Api.Endpoints;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/products", async (int? page, int? pageSize, Guid? categoryId, IProductQueryService productService) =>
        {
            var currentPage = page ?? 1;
            var currentPageSize = pageSize ?? 10;
            var response = await productService.GetAllProductsAsync(currentPage, currentPageSize, categoryId);
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
            [FromQuery] DateTime? fromDate, 
            [FromQuery] DateTime? toDate, 
            IProductQueryService productService) =>
        {
            var from = fromDate ?? DateTime.Now.Date.StartOfMonth();
            var to = toDate ?? DateTime.Now;
    
            var totals = await productService.GetProductTotalsAsync(from, to);
            return Results.Ok(totals);
        });
        
        return endpoints;
    }
}