import { Recipe } from "./types";

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

// export const getRecipeSummary = async (recipeId: string) => {
//   const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/summary`);
//   console.log("Request URL:", url.toString());
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Failed to fetch recipe: ${res.status}`);
//   }

//   return res.json();
// };
export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/summary`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch recipe.");
  }
};

export const getRecipeInformation = async (recipeId: string) => {
  const url = new URL(
    `http://localhost:5100/api/recipes/${recipeId}/information`
  );
  console.log("Request URL:", url.toString());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  return res.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL("http://localhost:5100/api/recipes/favourite");
  console.log("Request URL:", url.toString());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  return res.json();
};

export const favouriteRecipe = async (recipeId: string, userId: string) => {
  const url = new URL("http://localhost:5100/api/recipes/favourite");
  console.log("Request URL:", url.toString());
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId, userId }),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  return res.json();
};

export const removeFavouriteRecipe = async (recipeId: string) => {
  const url = new URL(
    `http://localhost:5100/api/recipes/favourite/${recipeId}`
  );

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }
};

export const addFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5100/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  return res.json();
};
