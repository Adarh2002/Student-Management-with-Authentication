import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
  return ( <div className="bg-gray-800">
      <div className="h-10 px-8 flex items-center">
        <p className="text-white font-bold flex-auto">User Management System</p>
        {session && (
          <div className='flex items-center sm:space-x-2 justify-end'>
            <image src={session.user.image}
            height="30"
            width="30"
            layout="fixed"
            title="Click to logout"
            ></image>
            <p className="text-white font-bold">{session?.user.name}</p>
            <button 
            onClick={signOut}
            className="rounded-full cursor-pointer text-blue-200"
            >SignOut</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
