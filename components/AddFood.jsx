"use client"
import { useState } from 'react'

const AddFood = (props) => {
  const [disabled, setDisabled] = useState(false)
    
    const submitHandler = (e) => {
        e.preventDefault(); 
        setDisabled(true)
        let result; 
    

  if (!e.target.food.value || !e.target.date.value || !e.target.calories.value || !typeof e.target.calories.value === "number") {
    alert("please fill in all fields");
    setDisabled(false);
    return 
  }

  if(props.currentFood) {
    result = props.client.updateFood(props.currentFood._id, e.target.food.value, e.target.date.value, e.target.calories.value);
  } else {
    result = props.client.addFood(e.target.food.value, e.target.date.value, e.target.calories.value);
  }

  result.then(() => {
    setDisabled(false);
    document.getElementById("foodForm").reset()
    props.refreshFood() 
  }).catch(() => {
    alert("There was an error")
    setDisabled(false)
  })
}

  return (
    <div className='container mx-auto bg-blue-200 flex flex-col mt-10 mb-20 justify-center items-center w-3/4 rounded-md bg-opacity-50'>
    <h2 className='text-white font-bold'>Add Food</h2>

    <form onSubmit={submitHandler} id="foodForm" className='flex flex-col'>

    <label for='date' className='text-white font-bold cursor-pointer'>Date:</label> 
    <input defaultValue={props.currentFood?.date} type="date" id='date' name='date' min='2024-01-01' max='2029-01-31' className='bg-black text-white rounded-md p-2 m-2'></input>

    <label for='food' className='text-white font-bold'>Food:</label> 
    <input defaultValue={props.currentFood?.food} type="text" name="food" placeholder="Fish and Chips" className='bg-black text-white rounded-md p-2 m-2'></input>

     <label for='calories' className='text-white font-bold'>Calories:</label> 
    <input defaultValue={props.currentFood?.calories} type="text" name="calories" className='bg-black text-white rounded-md p-2 m-2'></input>

    <button type="submit" className='bg-black text-white font-bold rounded-md p-2 m-2'>{props.currentFood ? "Update" : "Add"}</button>
    </form>
  
</div>
  )

}

export default AddFood
