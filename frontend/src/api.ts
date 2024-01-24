export const searchRecipes = async (searchTerm: string, page: number) => {

    const baseUrl = new URL("http://localhost:5000/api/recipes/search}");
    baseUrl.searchParams.append("searchTerm", searchTerm)
    baseUrl.searchParams.append("page", String(page))
    const response = await fetch(baseUrl.toString());

    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
    }
    return  response.json();
    
}