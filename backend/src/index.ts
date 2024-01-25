import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api'
import { PrismaClient } from '@prisma/client'


const app = express();
const prismaClient = new PrismaClient();
app.use(express.json());
app.use(cors());


app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt (req.query.page as string);
    const result = await RecipeAPI.searchRecipes(searchTerm, page );
    return res.json(result);
})
// Get recipe by ID
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const result = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(result);
  } catch (error) {
    console.error("Error fetching recipe summary:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// favourite recipe
app.post("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;
  const userId = req.body.userId;
  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create({
      data: {
        recipeId,
        userId,
      },
    });
    return res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.log( error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// Remove from favourites
app.delete("/api/recipes/favourite/:id", async (req, res) => {
  const recipeId = req.body.recipeId;
  try {
     await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId: recipeId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.log( error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// Get favourite recipes
app.get("/api/recipes/favourite", async (req, res) => {
  try {
    const favouriteRecipes = await prismaClient.favouriteRecipes.findMany();
    // Map through the array and get only the recipe's data
    const favouriteRecipeIds = favouriteRecipes.map((favouriteRecipe) => favouriteRecipe.recipeId.toString());
    const favourites = await RecipeAPI.getFavouriteRecipeByIDs(favouriteRecipeIds);
    return res.json(favourites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// Get favourite recipes by 



app.listen(5100, () => {
  console.log("Server running on port 5100");
});
