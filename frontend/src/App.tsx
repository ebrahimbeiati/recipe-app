import { FormEvent, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (error) {
      console.error(error);
    }
  };

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
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
};

export default App;
