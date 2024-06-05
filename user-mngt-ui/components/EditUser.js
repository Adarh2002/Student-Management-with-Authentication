import { React, useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const editUser = ({ userId, setresponseUSer }) => {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

    const [isOpen, setisOpen] = useState(false);
    const [user, setUser ] = useState({
        id:"",
        firstName:"",
        lastName:"",
        emailID:""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response  = await fetch(USER_API_BASE_URL+"/"+ userId, {
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const _user = await response.json(); 
                setUser(_user);
                setisOpen(true);
            } catch (error) {
                console.log(error);
            }
        };
        if(userId) {
            fetchData();
        }   
        
    }, [userId])
    

    function closeModal() {
        setisOpen(false);
    }

    function openModal() {
        setisOpen(true);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setUser({...user, [event.target.name]: value})
    };

    const reset = (e) => {
        e.preventDefault();
        setisOpen(false);
    }

    const updateUser = async (e) => {
        e.preventDefault();
        const response = await fetch(USER_API_BASE_URL+"/"+userId, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(user),
        });
        if(!response.ok){
            throw new Error("Something went wrong");
        }
        const _user = await response.json();
        setresponseUSer(_user);
        reset(e);
    };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}>
            <div className='min-h-screen px-4 text-center'>
                <Transition.Child 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md'>
                            <Dialog.Title as="h3" className='text-lg font-medium leading-6 text-gray-900'>
                                Edit user
                            </Dialog.Title>
                            <div className='flex max-w-md max-auto'>
                                <div className='py-2'>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            First name</label>
                                            <input type="text" 
                                                    name='firstname' 
                                                    value={user.firstname} 
                                                    onChange={(e) => handleChange(e)}
                                                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            Last name</label>
                                            <input type="text" 
                                                    name='lastname' 
                                                    value={user.lastname} 
                                                    onChange={(e) => handleChange(e)}
                                                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            Email ID</label>
                                            <input type="text" 
                                                    name='emailID' 
                                                    value={user.emailID} 
                                                    onChange={(e) => handleChange(e)}
                                                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4 space-x-4 pt-4'>
                                        <button 
                                        onClick={updateUser}
                                        className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
                                            Update
                                        </button>
                                        <button 
                                        onClick={reset}
                                        className='rounded text-white font-semibold bg-gray-400 hover:bg-gray-700 py-2 px-6'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
            </div>
        </Dialog>
    </Transition>
    </>
  )
}

export default editUser
