import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import RootLayouts from '@/components/Layouts/RootLayouts'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/features/user/userSlice'


const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const dispatch = useDispatch();
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        console.log(user);
        if(user){
          dispatch(setUser({
            name:user.displayName,
            email:user.email,
            photoURL:user.photoURL
          }))
        }
      })
    },[])
  return (
    <div >
    <Head>
        <title>Trendy-Tech</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1>Hello</h1>
   
    </div>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayouts>{page}</RootLayouts>;
};

