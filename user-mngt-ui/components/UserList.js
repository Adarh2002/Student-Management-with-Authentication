import {React, useState, useEffect} from 'react';
import User from '../components/User';
import EditUser from '../components/EditUser'


const UserList = ({ user }) => {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setuserId] = useState(null);
    const [responseUSer, setresponseUSer] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(USER_API_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      };    
      fetchData();
    }, [user, responseUSer]); 

    const deleteUser = (e, id) => {
      e.preventDefault();
      fetch(USER_API_BASE_URL+"/"+ id, {
        method:"DELETE",
      }).then((res) => {
        if(users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        })}
      });
    };

    const editUser = (e, id) => {
      e.preventDefault();
      setuserId(id);
    };
    

  return (
    <>
    <div className='container mx-auto my-8'>
      <div className='flex shadow-md border-b'>
        <table className='min-w-full'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='text-left font-medium text-black uppercase tracking-wide py-3 px-6'>First Name</th>
                    <th className='text-left font-medium text-black uppercase tracking-wide py-3 px-6'>Last Name</th>
                    <th className='text-left font-medium text-black uppercase tracking-wide py-3 px-6'>Email ID</th>
                    <th className='text-right font-medium text-black uppercase tracking-wide py-3 px-6'>Actions</th>
                </tr>
            </thead>
            {!loading && (
                <tbody className="bg-white"> 
                    {users?.map((user) => (
                    <User 
                      user={user} 
                      key={user.id} 
                      deleteUser={deleteUser} 
                      editUser={editUser} 
                    />
                    ))}
                </tbody>
            )}
        </table>
      </div>
    </div>
    <EditUser userId={userId} setresponseUSer={setresponseUSer}/>
    </>
  )
}

export default UserList
