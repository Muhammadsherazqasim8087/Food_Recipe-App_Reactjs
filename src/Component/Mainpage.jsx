import React, { useState, useEffect } from 'react';
import Mealcards from './Mealcards';
import './Mainpage.css'; // Importing CSS

const Mainpage = () => {
  const [data, setData] = useState(null); // For search results
  const [homeData, setHomeData] = useState(null); // For default home API data
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Tracks if a search is performed

  // Fetch home data (initial load)
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
        const jsonData = await response.json();
        setHomeData(jsonData.meals);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setMsg('Failed to load popular recipes. Please try again later.');
      }
    };

    fetchHomeData();
  }, []);

  // Handle input change
  const handleInput = (event) => {
    setSearch(event.target.value);
    setMsg(''); // Clear any previous messages
  };

  // Search function
  const handleSearch = async () => {
    if (search.trim() === '') {
      setMsg('Please enter something to search');
      setData(null); // Clear previous results
    } else {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const jsonData = await response.json();
        setData(jsonData.meals);
        setIsSearching(true); // Set search status
        if (!jsonData.meals) {
          setMsg('No recipes found for the given search term.');
        } else {
          setMsg(''); // Clear message on successful search
        }
      } catch (error) {
        console.error('Error fetching search data:', error);
        setMsg('Failed to fetch search results. Please try again later.');
      }
    }
  };

  // Handle "Enter" key press for search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <h1 className="head">FOOD RECIPE APP</h1>
      <div className="container">
        {/* Search Bar */}
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter Dish Name"
            value={search}
            onChange={handleInput}
            onKeyPress={handleKeyPress} // Trigger search on Enter key press
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <h4 className="error">{msg}</h4>
        </div>

        {/* Home Section - Only show when no search is performed */}
        {!isSearching && (
          <>
            <h2 className="section-title">Popular Recipes</h2>
            <div className="home-cards">
              {homeData ? (
                homeData.map((meal) => (
                  <div key={meal.idMeal} className="card">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="card-image" />
                    <h3 className="card-title">{meal.strMeal}</h3>
                  </div>
                ))
              ) : (
                <p>Loading popular recipes...</p>
              )}
            </div>
          </>
        )}

        {/* Search Results */}
        {isSearching && (
          <div>
            {data ? (
              <Mealcards detail={data} />
            ) : (
              <p className="no-data-message"></p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Mainpage;

