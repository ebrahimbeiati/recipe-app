// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import * as RecipeAPI from "./recipe-api";
// import { PrismaClient } from "@prisma/client";

// const app = express();
// const prismaClient = new PrismaClient();

// app.use(express.json());
// app.use(cors());

// app.get("/api/recipes/search", async (req, res) => {
//   const searchTerm = req.query.searchTerm as string;
//   const page = parseInt(req.query.page as string);
//   const results = await RecipeAPI.searchRecipes(searchTerm, page);

//   return res.json(results);
// });

// app.get("/api/recipes/:recipeId/summary", async (req, res) => {
//   const recipeId = req.params.recipeId;
//   const results = await RecipeAPI.getRecipeSummary(recipeId);
//   return res.json(results);
// });

// app.post("/api/recipes/favourite", async (req, res) => {
//   const recipeId = req.body.recipeId;

//   try {
//   const favouriteRecipe = await prismaClient.favouriteRecipes.create({
//     data: {
//       recipeId: recipeId,
//     },
//   });

//     return res.status(201).json(favouriteRecipe);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Oops, something went wrong" });
//   }
// });

// app.get("/api/recipes/favourite", async (req, res) => {
//   try {
//     const recipes = await prismaClient.favouriteRecipes.findMany();
//     const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

//     const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipeIds);

//     return res.json(favourites);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Oops, something went wrong" });
//   }
// });

// app.delete("/api/recipes/favourite", async (req, res) => {
//   const recipeId = req.body.recipeId;

//   try {
//     await prismaClient.favouriteRecipes.delete({
//       where: {
//         recipeId: recipeId,
//       },
//     });
//     return res.status(204).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Oops, something went wrong" });
//   }
// });// Example API endpoint for creating a favorite recipe
// app.post("/api/recipes/favourite", async (req, res) => {
//   const recipeId = req.body.recipeId;

//   try {
//     const favouriteRecipe = await prismaClient.favouriteRecipes.create({
//       data: {
//         recipeId: recipeId,
//       },
//     });

//     return res.status(201).json(favouriteRecipe);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Oops, something went wrong" });
//   }
// });

// Example API endpoint for deleting a favorite recipe
// app.delete("/api/recipes/favourite", async (req, res) => {
//   const recipeId = req.body.recipeId;

//   try {
//     await prismaClient.favouriteRecipes.delete({
//       where: {
//         recipeId: recipeId,
//       },
//     });

//     return res.status(204).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Oops, something went wrong" });
//   }
// });

// app.listen(5100, () => {
//   console.log("server running on localhost:5000");
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

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
app.get("/api/recipes/favourite", async (req, res) => {
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
  const recipeId = req.body.recipeId;

  try {
    const favouriteRecipe = await prismaClient.favouriteRecipe.create({
      data: {
        recipeId: recipeId,
      },
    });

    return res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});

// Endpoint to delete a recipe from favorites
app.delete("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await prismaClient.favouriteRecipe.delete({
      where: {
        recipeId: recipeId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
});
app.listen(5100, () => {
  console.log("server running on localhost:5100");
});
