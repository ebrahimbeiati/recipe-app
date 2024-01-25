import { FormEvent, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef<number>(1);

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
        <RecipeCard recipe={recipe}/>  
      ))}
      <button className="view-more-btn" onClick={handleViewMore}>
        view more

      </button>
    </div>
  );
};

export default App;
