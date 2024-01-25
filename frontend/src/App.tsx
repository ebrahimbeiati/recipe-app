import { FormEvent, useRef, useState, useEffect } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

//type tabs
type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>();
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);

  const pageNumber = useRef(1);
  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavouriteRecipes();
  }, []);

  //useeffect for fetching favourite recipes

const addFavouriteRecipe = async (recipe: Recipe) => {
  try {
    await api.addFavouriteRecipe(recipe);
    const updatedFavouriteRecipes = await api.getFavouriteRecipes();
    setFavouriteRecipes(updatedFavouriteRecipes.results);
  } catch (error) {
    console.error(error);
  }
};
  //remove favourite recipe
  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedFavouriteRecipes = favouriteRecipes.filter(
        (favRecipe) => favRecipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedFavouriteRecipes);
    } catch (error) {
      console.error(error);
    }
  };


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
      const newRecipes = await api.searchRecipes(
        searchTerm,
        pageNumber.current
      );
      setFavouriteRecipes([...favouriteRecipes, ...newRecipes.results]);
      pageNumber.current += 1;
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMore = () => {
    loadMoreRecipes();
  };

  return (
    <div>
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={() => setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearch(event)}>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {recipes &&
            recipes.map((recipe) => {
              const isFavourite = favouriteRecipes.some(
                (favRecipe) => recipe.id === favRecipe.id
              );
              return (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavouriteButtonClick={
                    isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                  }
                  isFavourite={isFavourite}
                />
              );
            })}
          <button className="view-more-btn" onClick={handleViewMore}>
            view more
          </button>
        </>
      )}

      {selectedTab === "favourites" && (
        <>
          {favouriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={removeFavouriteRecipe}
              isFavourite={true}
            />
          ))}
        </>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
