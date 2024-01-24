import {useState} from 'react'
import './App.css'
import * as api from './api'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState([]);


  const handleSearch = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes);

    } catch (error) {
      console.error(error);
    }

    
  }

  return (
    <div>
      hgghghg
    </div>
  )
}

export default App
