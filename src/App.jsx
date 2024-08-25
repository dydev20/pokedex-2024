import {useState} from 'react'
import Navbar from './components/Navbar'
import PokemonGrid from './components/PokemonGrid'


function App() {
  const [searchValue,setSearchValue] = useState("");
  
  function handleSearchValue(e){
    setSearchValue(e.target.value.toLowerCase())
  }

  return (
    <>
      <Navbar handleSearchValue={handleSearchValue}/>
      <PokemonGrid searchValue={searchValue}/>
    </>
  )
}

export default App
