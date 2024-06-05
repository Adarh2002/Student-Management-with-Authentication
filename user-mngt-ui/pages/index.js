import Head from 'next/head';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';
import AddUser from '../components/AddUser';  
import { getSession } from 'next-auth/react';
import Login from '../components/Login';

export default function Home({ session }) {
  if(!session) {
    return <Login />
  }
  return (
    <>
      <Head><title>User management app</title></Head>
      <Navbar />
      <main>
        <AddUser />
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

