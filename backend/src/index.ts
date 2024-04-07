import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello Ebrahim jan!");
})

// Endpoint to search recipes
app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});

// Endpoint to get recipe summary by ID
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  const results = await RecipeAPI.getRecipeSummary(recipeId);
  return res.json(results);
});

// Endpoint to get favorite recipes
app.get("/api/recipes/favourite", async (_, res) => {
  try {
    const recipes = await prismaClient.favouriteRecipe.findMany();
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

    const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIds);
    return res.json(favourites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});

// Endpoint to add a recipe to favorites
app.post("/api/recipes/favourite", async (req, res) => {
  const { body } = req.body;
  let id: string = "";

  if (body && body.recipeId) {
    const { recipeId } = body;
    id = recipeId.toString();
  } else {
    console.log("Invalid request body structure");
  }

  try {
    const favouriteRecipe = await prismaClient.favouriteRecipe.create({
      data: {
        recipeId: id,
      },
    });

    return res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});

// Endpoint to delete a recipe from favorites
app.delete("/api/recipes/favourite/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    // Check if the recipe exists before attempting to delete
    const existingRecipe = await prismaClient.favouriteRecipe.findUnique({
      where: {
        recipeId: recipeId,
      },
    });

    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // If the recipe exists, proceed with deletion
    await prismaClient.favouriteRecipe.delete({
      where: {
        recipeId: recipeId,
      },
    });

    return res.status(204).send(); // Successfully delete
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});

app.listen(5100, () => {
  console.log("server running on localhost:5100");
});
