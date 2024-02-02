"use client";
import {useState} from "react"; 

const Login = (props) => {
    const [disabled, setDisabled] = useState(false); 

    const submitHandler = (e) => {
        e.preventDefault(); 
        setDisabled(true); 
        props.client.login(e.target.username.value, e.target.password.value).then((response) => {
            setDisabled(false); 
            props.loggedIn(response.data.token);
        }).catch((err) => {
            console.error("An error occurred:", err);
            alert("an error occured.") 
            setDisabled(false); 
        })
    }
    
  return (
    <div className='flex justify-center items-center mt-10 bg-opacity-50'>
    <div className='bg-blue-400 w-3/4 h-auto rounded-md bg-opacity-50'>
        <h2 className='text-2xl text-white text-center mt-5 font-bold'>Login</h2>
        <div className='flex justify-center items-center'>
        <span className='text-red-500 animate-pulse'>&#10084;</span>
        </div>
        <hr className='text-white border-white m-2.5'></hr>
        <form onSubmit={submitHandler} className='p-10 flex flex-col items-center'>
            <label for='username' className='text-center text-white font-bold mb-2.5'>Username</label>
           <input type="text" name="username" disabled={disabled} className='p-2.5 rounded-md bg-black text-white mb-2.5' placeholder='Username' /> 
           <label for='password' className='text-center text-white font-bold mb-2.5'>Password</label>
           <input type="password" name="password" disabled={disabled} className='p-2.5 rounded-md bg-black text-white' placeholder='Password' /> 
           <div className='flex justify-center items-center'>
            <button type="submit" disabled={disabled} className='p-2.5 bg-black text-white m-2.5 rounded-md mt-5 w-28'>Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login