import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api'


const app = express();
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


app.listen(5100, () => {
  console.log("Server running on port 5100");
});
