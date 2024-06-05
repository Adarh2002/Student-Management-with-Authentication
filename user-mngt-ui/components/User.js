import React from 'react'

const User = ({ user, deleteUser, editUser }) => {
  return (
        <tr key={user.id}>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className='text-sm text-gray-600'>{user.firstname}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
                <div className='text-sm text-gray-600'>{user.lastname}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap">
            <div className='text-sm text-gray-600'>{user.emailID}</div>
            </td>
            <td className="text-right px-6 py-4 whitespace-nowrap">
                <a 
                    onClick={(e, id) => editUser(e, user.id)} 
                    className='text-indigo-400 hover:text-indigo-800 hover:cursor-pointer px-4'>Edit</a>
                <a 
                    onClick={(e, id) => deleteUser(e, user.id)} 
                    className='text-indigo-400 hover:text-indigo-800 hover:cursor-pointer'>
                        Delete
                </a>
            </td>
        </tr>
  )
}

export default User
