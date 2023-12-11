import auth from '@/firebase/firebase.config';
import { setUser } from '@/redux/features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardLayouts = ({children}) => {
  const {name,email,photo_url} = useSelector((state)=>state.userSlice);
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
        <div data-theme="light" className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
         {children}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
          
          </label> 
          <div className='flex gap-5 items-center py-5 px-3 bg-slate-200'>
            <img className='w-20 border-yellow-500 border-4 rounded-full' src={photo_url} alt="" />
            <p className='text-xl'>{name}</p>
            </div>
          <ul className="menu p-4 w-80 min-h-[87vh] bg-base-200 text-base-content">
            {/* Sidebar content here */}
            
           
            <li><a>My Profile</a></li>
            <li><Link href='/addproduct'>Add Product</Link></li>
            <li><a>My Product</a></li>
            
          </ul>
         
        </div>
      </div>
    );
};

export default DashboardLayouts;