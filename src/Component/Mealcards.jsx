import React from 'react'
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation between routes

const Mealcards = ({detail}) => {
  console.log(detail); // Logs the "detail" prop to check the data received
  return (
    <div className='meals'>
        { 
          // If "detail" is falsy (e.g., undefined or null), display an empty string
          !detail ? "" : 
          // If "detail" is available, map through each item in the "detail" array
          detail.map((curItem) => {
            return (
              <div className='mealImg' key={curItem.idMeal}> 
                {/* Display the meal's thumbnail image */}
                <img src={curItem.strMealThumb} alt={curItem.strMeal}/>
                
                {/* Display the meal's name */}
                <p>{curItem.strMeal}</p>

                {/* Link to a detailed recipe page using the meal's ID */}
                <NavLink to={`/${curItem.idMeal}`}>
                  <button>Recipe</button>
                </NavLink>
              </div>
            )
          })
        }
    </div>
  )
}

export default Mealcards;

