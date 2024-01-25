import { Recipe } from '../types'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface Props {
  recipe: Recipe;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
  isFavourite: boolean;
}

const RecipeCard = ({recipe, onClick, onFavouriteButtonClick, isFavourite}:Props) => {
  return (
      <div className='recipe-card' onClick={onClick}>
     
          <img src={recipe.image} alt={recipe.title} />
      <div className='recipe-card-title'>
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}>
          {
            isFavourite ? <AiFillHeart size={25} color='red'/> : <AiOutlineHeart size={25}/>
          }

        </span>
              <h2>{recipe.title}</h2>
          </div>
       
    </div>
  )
}

export default RecipeCard
