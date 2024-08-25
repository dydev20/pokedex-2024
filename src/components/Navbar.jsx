function Navbar({handleSearchValue}){
    return(

        
        <nav className="navbar">
            <div className="content-container">
                <h1>Pokedex</h1>
                <input type="text" placeholder="Search pokemon by name..." className="pokedex-search" onChange={(e)=>handleSearchValue(e)}/>
            </div>
        </nav> 
        
    )
}

export default Navbar