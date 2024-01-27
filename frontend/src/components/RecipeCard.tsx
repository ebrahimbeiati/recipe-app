import { Recipe } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import * as api from "../api";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  // onFavouriteButtonClick: (recipe: Recipe) => void;
  isFavourite: boolean;
  favouriteRecipes: Recipe[];
  setFavouriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeCard = ({
  recipe,
  onClick,
  isFavourite,
  favouriteRecipes,
  setFavouriteRecipes,
}: // onFavouriteButtonClick,
Props) => {
  const addFavouriteRecipe = async (recipe: Recipe) => {
    console.log("adding to favourites");
    const url = new URL("http://localhost:5100/api/recipes/favourite");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId: recipe.id }),
    }).then((response) => response.json());
    console.log(res);

    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipeId: string) => {
    console.log("removing from favourites");
    const url = new URL("http://localhost:5100/api/recipes/favourite");
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status}`);
    }

    return res.json();
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} onClick={onClick} />
      <div className="recipe-card-title">
        <span
          onClick={() =>
            isFavourite
              ? removeFavouriteRecipe(recipe.id.toString())
              : addFavouriteRecipe(recipe)
          }
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h2>{recipe.title}</h2>
      </div>
    </div>
  );
};

export default RecipeCard
