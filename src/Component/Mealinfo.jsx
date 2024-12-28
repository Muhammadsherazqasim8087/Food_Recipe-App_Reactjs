import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Mealinfo = () => {
  // Extracting the meal ID from the route parameters
  const { mealid } = useParams();

  // State to store the meal information
  const [info, setInfo] = useState(null);
  
  // State to store error or informational messages
  const [msg, setMsg] = useState('');

  // Function to fetch meal information using the MealDB API
  const getInfo = async () => {
    try {
      console.log("Fetching data for mealid:", mealid); // Debug log to check the meal ID being fetched
      
      // Fetching data from the API using the meal ID
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
      const jsonData = await response.json();

      console.log("API Response:", jsonData); // Debug log to inspect API response

      // Checking if valid meal data exists
      if (jsonData.meals && jsonData.meals.length > 0) {
        setInfo(jsonData.meals[0]); // Updating state with the meal data
        setMsg(''); // Clearing any previous error messages
      } else {
        setInfo(null); // Resetting the meal information
        setMsg('Data not available or incorrect. Please try again.'); // Setting an error message
      }
    } catch (err) {
      console.error("Error fetching data:", err); // Logging any errors
      setInfo(null); // Resetting the meal information
      setMsg('Data not available or incorrect. Please try again.'); // Setting an error message
    }
  };

  // Effect hook to fetch meal data when the meal ID changes
  useEffect(() => {
    if (mealid) {
      getInfo(); // Calling the API fetch function
    }
  }, [mealid]); // Dependency array ensures the effect runs when mealid changes

  return (
    <div>
      {/* Display Error Message if there is any */}
      {msg && (
        <div className="search-error-msg">
          <h4 className="error">{msg}</h4>
        </div>
      )}

      {/* Display the meal information if it exists */}
      {info ? (
        <div className="msg">
          {/* Display the meal image */}
          <img src={info.strMealThumb} alt={info.strMeal} />
          
          {/* Display the meal details */}
          <div className="info">
            <h1>Recipe Detail</h1>
            <button>{info.strMeal}</button>
            <h3>Instructions</h3>
            <p>{info.strInstructions}</p>
          </div>
        </div>
      ) : !msg ? ( // Show loading message if no data or error
        <h2>Loading...</h2>
      ) : null}
    </div>
  );
};

export default Mealinfo;
