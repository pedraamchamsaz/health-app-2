"use client" 
import {useState, useEffect} from 'react'
import AddExercise from "./AddExercise"

const ExerciseTable = (props) => {

    const [exercise, setExercise] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(undefined);

    const refreshExercise = () => {
        props.client.getExercise().then((response) => {
            setExercise(response.data);
        })
    } 

    const removeExercise = (id) => {
        props.client.removeExercise(id).then(() => {
            refreshExercise()
        })
    }

    const updateExercise = (exercise) => {
        setCurrentExercise(exercise) 
    }
    


        useEffect(() => {
            refreshExercise();
          }, []); 

  return (
    <div className='w-full h-1/2'>
        <AddExercise client={props.client} refreshExercise={() => {
                refreshExercise();
                setCurrentExercise(undefined)
            }} currentExercise={currentExercise}/>
            <div className='w-auto h-auto grid grid-cols-4 gap-4'>
                
                {
                exercise.map((currentExercise) => {
                return (
    <div className='w-46 rounded overflow-hidden shadow-lg bg-blue-400 bg-opacity-50 text-white' key={currentExercise._id}>
    <p className='text-center text-xl mb-2 text-white font-bold'>
       {currentExercise.exercise}
    </p>
    <p className='text-base text-center text-white'>
      {currentExercise.date}
    </p>
    <p className='text-base text-center text-white'>
       {currentExercise.duration} minutes
    </p>
    <p className='text-base text-center text-white'>
      {currentExercise.calories} calories
    </p>

  <div className='px-6 py-4 flex justify-between'>
    <button
      className='bg-black hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded'
      onClick={() => updateExercise(exercise)}
    >
      Update
    </button>
    <button
      className='bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      onClick={() => removeExercise(exercise._id)}
    >
      Delete
    </button>
  </div>
</div>
                    
            )
            })
        }
                        
        </div>   
    </div>
  )
}

export default ExerciseTable