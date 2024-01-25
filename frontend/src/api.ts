
export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL(`http://localhost:5100/api/recipes/search`);

  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));
  console.log("Request URL:", baseUrl.toString());

  const response = await fetch(baseUrl.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`);
  }
  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/summary`);
  console.log("Request URL:", url.toString());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }


  return res.json();
};

