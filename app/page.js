"use client"
import {useEffect, useState} from 'react';
import {ApiClient} from "@/apiClient"
import MainPage from '@/components/MainPage'
import SignUp from '@/components/SignUp';
import AddExercise from '@/components/AddExercise'; 
import AddFood from '@/components/AddFood';
import Login from '@/components/Login'
import UserTable from '@/components/UserTable';
import FoodTable from '@/components/FoodTable';
import ExerciseTable from '@/components/ExerciseTable';

export default function Home() {
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const client = new ApiClient(() => token, () => logout())
  // const currentUserId = getUser(); 

useEffect(() => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token){
    setToken(token);
      // Fetch current user details based on the token and set it in state
      client.getUser(
        // get the current user Id from the token potentially ?? 
      ).then((user) => {
        console.log(user)
        setCurrentUser(user);
      });
    }
  }, []);

const login = (token) => {
  localStorage.setItem("token", token);
  setToken(token)
 // Fetch current user details based on the token and set it in state
 client.getUser(token).then((user) => {
  setCurrentUser(user);
});
};

const logout = () => {
  localStorage.removeItem("token")
  setToken(null)
  console.log("Function called")
  setCurrentUser(null);
}

  return (
    <main className="bg-cover bg-center min-h-screen flex justify-center items-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/08/06/00/27/yoga-2587066_1280.jpg')" }}>

      {
        token ? (
          <div className='w-full h-auto'>
            <MainPage client={client} loggedOut={() => logout()}/> 
            <UserTable client={client} currentUser={currentUser} />

      <ExerciseTable client={client} token={token} currentUser={currentUser}/>

      <FoodTable client={client} />
      
      
          </div>
        ) : (
          <div className='w-full h-auto'>
          <Login loggedIn={(token) => login(token)} client={client}/>

          <SignUp client={client}/>
          </div>
        
        )
      }

      

      
    </main>
  );
}
