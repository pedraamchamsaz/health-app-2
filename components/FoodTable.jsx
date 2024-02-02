"use client"
import {useState, useEffect} from 'react'
import AddFood from "./AddFood"

const FoodTable = (props) => {
  const [food, setFood] = useState([]);
  const [currentFood, setCurrentFood] = useState(undefined);


  const refreshFood = () => {
    props.client.getFood().then((response) => {
        setFood(response.data);
    })
} 

const removeFood = (id) => {
  props.client.removeFood(id).then(() => {
      refreshFood()
  })
}

const updateFood = (food) => {
  setCurrentFood(food)
}

useEffect(() => {
  refreshFood();
}, []); 


return (
  <div className='w-full h-1/2'>
      <AddFood client={props.client} refreshFood={() => {
              refreshFood();
              setCurrentFood(undefined)
          }} currentFood={currentFood} />
          <div className='w-auto h-auto grid grid-cols-4 gap-4'>
              
            {
            food.map((currentFood) => {
              return (
             <div className=' bg-blue-400 bg-opacity-50 rounded-md shadow-lg w-46 h-64 overflow-hidden px-6 py-4' key={currentFood._id}>
            <div className='px-6 py-4'>
            <p className='text-white text-center font-bold text-2xl py-1'>{currentFood.food}</p>
            <p className='text-white text-center text-base py-1'>{currentFood.date}</p>
            <p className='text-white text-center text-base py-1'>{currentFood.calories} calories</p>
             </div>
            <div className='flex justify-between px-6 py-10'>
            <button className='bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeFood(currentFood._id)}>Delete</button>
            <button className='bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => updateFood(currentFood)}>Update</button>

            </div>
            </div>
                  
              )
              })
            }
                      
                  
          </div>
  </div>
)
}

export default FoodTable