import { getSession } from 'next-auth/react'
import Head from 'next/head';
import Image from 'next/image';
// import Dish from '../components/Dish';
import Header from '../components/Header';
import NorthFood from '../public/North-food.jpg'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Annapurna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Header/>
     <h1 className='text-center text-3xl font-serif pt-8'>North Indian Dishes</h1>
      <div>
        {/* <Dish/> */}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props : {
      session,
    },
  };
}