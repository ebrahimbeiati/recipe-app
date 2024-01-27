import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  // const addFavouriteRecipe = async (recipe: Recipe) => {
  //   const url = new URL("http://localhost:5100/api/recipes/favourite");
  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ recipeId: recipe.id }),
  //   }).then((response) => response.json());
  //   console.log(res);

  //   try {
  //     await api.addFavouriteRecipe(recipe);
  //     setFavouriteRecipes([...favouriteRecipes, recipe]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeFavouriteRecipe = async (recipe: Recipe) => {
  //   try {
  //     await api.removeFavouriteRecipe(recipe);
  //     const updatedRecipes = favouriteRecipes.filter(
  //       (favRecipe) => recipe.id !== favRecipe.id
  //     );
  //     setFavouriteRecipes(updatedRecipes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const removeFavouriteRecipe = async (recipeId: string) => {
  //   const url = new URL("http://localhost:5100/api/recipes/favourite");
  //   const res = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ recipeId }),
  //   });

  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch recipe: ${res.status}`);
  //   }

  //   return res.json();
  // };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/back.png"></img>
        <div className="title">My Recipe App</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}
        >
          Favourites
        </h1>
      </div>

      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
            <button type="submit">
              <AiOutlineSearch size={40} />
            </button>
          </form>

          <div className="recipe-grid">
            {recipes.map((recipe, index) => {
              const isFavourite = favouriteRecipes.some(
                (favRecipe) => recipe.id === favRecipe.id
              );

              return (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  // onFavouriteButtonClick={
                  //   isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                  // }
                  isFavourite={isFavourite}
                  favouriteRecipes={favouriteRecipes}
                  setFavouriteRecipes={setFavouriteRecipes}
                />
              );
            })}
          </div>

          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favourites" && (
        <div className="recipe-grid">
          {favouriteRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              // onFavouriteButtonClick={removeFavouriteRecipe}
              isFavourite={true}
              favouriteRecipes={favouriteRecipes}
              setFavouriteRecipes={setFavouriteRecipes}
            />
          ))}
        </div>
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
