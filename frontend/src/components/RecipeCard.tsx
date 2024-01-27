import { Recipe } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import * as api from "../api";

interface Props {
  recipe: Recipe;
  onClick: () => void;
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
}: Props) => {
  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipeId: string) => {
    try {
      await api.removeFavouriteRecipe(recipeId);

      const recipesList = favouriteRecipes.filter(
        (recipe) => recipe.id.toString() !== recipeId
      );
      setFavouriteRecipes(recipesList);
    } catch (error) {
      console.log(error);
    }
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
