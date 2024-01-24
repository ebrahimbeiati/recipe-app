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

app.listen(4000, () => {
    console.log("Server running on port 5000")
})
