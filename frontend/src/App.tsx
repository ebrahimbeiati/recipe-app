import { FormEvent, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe]= useState<Recipe | undefined >(undefined);

  const pageNumber = useRef(1);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (error) {
      console.error(error);
    }
  };
  const loadMoreRecipes = async () => {
    try {
      const newRecipes = await api.searchRecipes(searchTerm, pageNumber.current);
      setRecipes([...recipes, ...newRecipes.results]);
      pageNumber.current += 1;
    } catch (error) {
      console.error(error);
    }
  }
  const handleViewMore = () => {
    loadMoreRecipes();
  }
  


  return (
    <div>
      <h1>Recipe App</h1>
      <form onSubmit={(event) => handleSearch(event)}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} onClick={ ()=>setSelectedRecipe(recipe)} />  
      ))}
      <button className="view-more-btn" onClick={handleViewMore}>
        view more

      </button>
      {selectedRecipe?<RecipeModal recipeId={selectedRecipe.id.toString()} onClose={()=>setSelectedRecipe(undefined)} /> :null}


    </div>
  );
};

export default App;
