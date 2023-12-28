import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import RootLayouts from '@/components/Layouts/RootLayouts'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '@/firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/features/user/userSlice'
import { useGetProductQuery } from '@/redux/api/baseApi'
import ProductCart from '@/components/Ui/ProductCart'


const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const dispatch = useDispatch();
  const {data:products,error,isLoading} = useGetProductQuery()
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
    console.log(products);
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
    
   <section className='grid grid-cols-7'>
    <div className='h-[100vh]  col-span-2'>
      
    </div>
    <div className='col-span-3 h-[100vh] overflow-y-auto main'>
      {
        products?.map((product)=><ProductCart product={product} key={product._id} />)
      }
    </div>
    <div className='h-[100vh]  col-span-2'></div>
   </section>
    </div>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayouts>{page}</RootLayouts>;
};

