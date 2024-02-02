"use client"

import { useState, useEffect } from 'react'
import AddExercise from "@/components/AddExercise"
import AddFood from "@/components/AddFood"

const MainPage = (props) => {


    const [exercise, setExercise] = useState([]);
    const [food, setFood] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(undefined);
    const [currentFood, setCurrentFood] = useState(undefined);

    const refreshExercise = () => {
        props.client.getExercise().then((response) => {
            setExercise(response.data);
        })
    }
    const refreshFood = () => {
        props.client.getFood().then((response) => {
            setFood(response.data);
        })
    }


    const updateExercise = (exercise) => {
        setCurrentExercise(exercise)
    }

    const updateFood = (food) => {
        setCurrentFood(food)
    }




    const dropdownMenu = () => {
        document.querySelector('#dropdown').classList.remove('hidden')
    }

    const closeDropdown = () => {
        document.querySelector('#dropdown').classList.add('hidden');
      };

  return (
    <div>
        <nav>
        
        
            <ul className='flex justify-between p-7 bg-blue-200 font-semibold'>
                <div className='flex gap-20'>
                    <li className='text-xl' id='logo'>Logo</li>
                    <div>
                        <li className='text-xl' id='add' onMouseEnter={dropdownMenu} onMouseLeave={closeDropdown}>Add +</li>
                        <div id='dropdown' className='hidden flex flex-col text-lg bg-blue-400 absolute p-2 gap-2 rounded-xl' onMouseEnter={dropdownMenu} onMouseLeave={closeDropdown}>
                            <a className='hover:bg-yellow-400 rounded-xl p-1' href="">Exercise</a>
                            <a className='hover:bg-yellow-400 rounded-xl p-1' href="">Food</a>
                            <a className='hover:bg-yellow-400 rounded-xl p-1' href="">Sleep</a>
                        </div>
                    </div>
                </div>
                <li id='app-name' className='text-3xl font-bold'><span className='text-red-500 animate-pulse'>&#10084;</span>The Health App  
        <span className='text-red-500 animate-pulse'>&#10084;</span></li>
        
                <div className='flex gap-20 text-xl'>
                    <li id='username'>Username</li>
                    <li className='bg-blue-400 hover:bg-blue-800 rounded-md p-2' id='logout' onClick={() => props.loggedOut()}>Log Out</li>
                </div>
            </ul>
        </nav>
{/* navbar ends */}

           
            

    </div>
  )
}

export default MainPage