"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavouriteRecipe = exports.removeFavouriteRecipe = exports.favouriteRecipe = exports.getFavouriteRecipes = exports.getRecipeInformation = exports.getRecipeSummary = exports.searchRecipes = void 0;
const searchRecipes = (searchTerm, page) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = new URL(`http://localhost:5100/api/recipes/search`);
    baseUrl.searchParams.append("searchTerm", searchTerm);
    baseUrl.searchParams.append("page", String(page));
    console.log("Request URL:", baseUrl.toString());
    const response = yield fetch(baseUrl.toString());
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
    }
    return response.json();
});
exports.searchRecipes = searchRecipes;
// export const getRecipeSummary = async (recipeId: string) => {
//   const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/summary`);
//   console.log("Request URL:", url.toString());
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Failed to fetch recipe: ${res.status}`);
//   }
//   return res.json();
// };
const getRecipeSummary = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/summary`);
    try {
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch recipe: ${res.status}`);
        }
        const data = yield res.json();
        return data;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to fetch recipe.");
    }
});
exports.getRecipeSummary = getRecipeSummary;
const getRecipeInformation = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(`http://localhost:5100/api/recipes/${recipeId}/information`);
    console.log("Request URL:", url.toString());
    const res = yield fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
    return res.json();
});
exports.getRecipeInformation = getRecipeInformation;
const getFavouriteRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL('http://localhost:5100/api/recipes/favourite');
    console.log("Request URL:", url.toString());
    const res = yield fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
    return res.json();
});
exports.getFavouriteRecipes = getFavouriteRecipes;
const favouriteRecipe = (recipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL('http://localhost:5100/api/recipes/favourite');
    console.log("Request URL:", url.toString());
    const res = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId, userId }),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
    return res.json();
});
exports.favouriteRecipe = favouriteRecipe;
const removeFavouriteRecipe = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(`http://localhost:5100/api/recipes/favourite/${recipeId}`);
    const res = yield fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
});
exports.removeFavouriteRecipe = removeFavouriteRecipe;
const addFavouriteRecipe = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL('http://localhost:5100/api/recipes/favourite');
    const body = {
        recipeId: recipe.id
    };
    const res = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe: ${res.status}`);
    }
    return res.json();
});
exports.addFavouriteRecipe = addFavouriteRecipe;
