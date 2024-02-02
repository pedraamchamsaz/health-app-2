import React, { useState, useEffect } from 'react';

const UserTable = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
         console.log('props.currentUser', props.currentUser);
        setCurrentUser(props.currentUser);
    }, [props.currentUser]);

    const refreshUser = () => {
        // Assuming you have a user ID available in props or state
        const userId = props.currentUser; // Replace with your actual user ID retrieval logic

        if (userId) {
            props.client.getUser(currentUser._id).then((response) => {
                setCurrentUser(response.data);
            });
        }
    };


  
    useEffect(() => {
        refreshUser()
    }, []); 

    if (!currentUser) {
        return <div>NO CURRENT USER</div>;
    }

    return (
        <div className='w-full items-center justify-center bg-blue-800 bg-opacity-80 p-5'>
            <h2 className='flex justify-center items-center text-white font-bold text-xl'>User Details</h2>
            <table className='flex justify-center items-center'>
                <thead>
                    <tr>
                        <th className='text-white p-2.5'>Name</th>
                        <th className='text-white p-2.5'>Age</th>
                        <th className='text-white p-2.5'>Weight</th>
                        <th className='text-white p-2.5'>Weight Unit</th>
                        <th className='text-white p-2.5'>Height</th>
                        <th className='text-white p-2.5'>Height Unit</th>
                        <th className='text-white p-2.5'>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={currentUser._id}>
                        <td className=''>{currentUser.name}</td>
                        <td className=''>{currentUser.age}</td>
                        <td className=''>{currentUser.weight}</td>
                        <td className=''>{currentUser.weightUnit}</td>
                        <td className=''>{currentUser.height}</td>
                        <td className=''>{currentUser.heightUnit}</td>
                        <td className=''>{currentUser.gender}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
