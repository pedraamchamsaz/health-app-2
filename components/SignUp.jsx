"use client"

import React, { useState } from 'react';

const SignUpSheet = () => {
    const [formData, setFormData] = useState({
      name: '',
    age: 1,
    weight: 0,
    weightUnit: 'kg',
    height: 0,
    heightUnit: 'cm',
    gender: 'male',
    username: '',
    password: '',
    goal: 'lose',
    weightIncrement: '1',
    });
    const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your backend API
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User registration successful
        setSubmitted(true);
      } else {
        // Handle errors, show an alert, etc.
        console.error('User registration failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (submitted) {
    return null; // Hide the component if the form is submitted
  }

  return (
    <div className='container mx-auto mt-10 bg-blue-400 bg-opacity-50 rounded-md p-4 text-white font-bold w-3/4 mb-10'>

      <div className='mb-4 text-center text-xl font-bold'>
      <h3>Sign Up</h3>
      </div>
      <div className='flex justify-center items-center'>
        <span className='text-red-500 animate-pulse'>&#10084;</span>
        </div>

      <hr className='my-4 border-white' />

      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <div className='mb-4 text-center'>
          <label htmlFor='name' className='block text-sm font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='input-field bg-black p-2 rounded-md w-full'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
          />
        </div>

        <div className='mb-4 text-center'>
          <label htmlFor='age' className='text-sm font-bold mb-2'>
            Age
          </label>
          <select
            id='age'
            name='age'
            className='input-field bg-black p-2 rounded-md w-full'
            value={formData.age}
            onChange={handleChange}
            placeholder='Age'
          >
            {Array.from({ length: 125 }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4 text-center'>
          <label htmlFor='weight' className='text-sm font-bold mb-2'>
            Weight
          </label>
          <div className='flex items-center justify-center'>
            <input
              type='number'
              step='0.1'
              id='weight'
              name='weight'
              className='input-field bg-black p-2 rounded-md'
              value={formData.weight}
              onChange={handleChange}
              placeholder='Weight'
              min='0'
            />
            <select
              id='weightUnit'
              name='weightUnit'
              className='input-field bg-black p-2 rounded-md ml-2'
              value={formData.weightUnit}
              onChange={handleChange}
            >
              <option value='kg'>KG</option>
              <option value='lbs'>LBS</option>
            </select>
          </div>
        </div>

        <div className='mb-4 text-center'>
          <label htmlFor='height' className='text-sm font-bold mb-2'>
            Height
          </label>
          <div className='flex items-center justify-center'>
            <input
              type='number'
              id='height'
              name='height'
              className='input-field bg-black p-2 rounded-md'
              value={formData.height}
              onChange={handleChange}
              placeholder='Height'
              min='0'
            />
            <select
              id='heightUnit'
              name='heightUnit'
              className='input-field bg-black p-2 rounded-md ml-2'
              value={formData.heightUnit}
              onChange={handleChange}
            >
              <option value='inch'>INCH</option>
              <option value='cm'>CM</option>
            </select>
          </div>
        </div>

        <div className='mb-4 text-center'>
          <label htmlFor='gender' className='text-sm font-bold mb-2'>
            Gender
          </label>
          <select
            id='gender'
            name='gender'
            className='input-field bg-black p-2 rounded-md w-full'
            value={formData.gender}
            onChange={handleChange}
            placeholder='Gender'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>

        <div className='mb-4 text-center'>
          <label className='text-sm font-bold mb-2'>Weight Goal</label>
          <div className='flex items-center justify-center'>

          <input
              type='radio'
              id='loseWeight'
              name='weightGoal'
              value='lose'
              checked={formData.weightGoal === 'lose'}
              onChange={handleChange}
            />
            <label htmlFor='loseWeight' className='mr-4 text-white font-bold'>Lose Weight</label>
            
            <input
              type='radio'
              id='gainWeight'
              name='weightGoal'
              value='gain'
              checked={formData.weightGoal === 'gain'}
              onChange={handleChange}
              className='mr-2'
            />
            <label htmlFor='gainWeight' className='text-white font-bold'>Gain Weight</label>
          </div>
        </div>
        
        <hr className='my-4 border-white' />

        <div className='mb-4 text-center'>
          <label htmlFor='username' className='block text-sm font-bold mb-2'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            className='input-field bg-black p-2 rounded-md w-full'
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
          />
        </div>

        <div className='mb-4 text-center'>
          <label htmlFor='password' className='block text-sm font-bold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='input-field bg-black p-2 rounded-md w-full'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
        </div>

        <hr className='my-4 border-white' />

        <div className='mb-4 text-center'>
          <button
            type='submit'
            className='bg-white text-red-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpSheet;