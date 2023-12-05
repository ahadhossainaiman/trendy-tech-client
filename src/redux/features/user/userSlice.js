import { useEffect } from "react";

const { default: auth } = require("@/firebase/firebase.config");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,onAuthStateChanged } = require("@firebase/auth");

const initialState = {
    name:'',
    email:'',
    photo_url:'',
    isLoading:true,
    isError:false,
    error:''

}

export const createUser = createAsyncThunk('userSlice/createUser',
async({email,name,password,photoURL})=>{
    console.log(email,name,photoURL);
    const data = await createUserWithEmailAndPassword(auth,email,password);
    console.log(data.user);
    await updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:photoURL

    })
    return {
        name:data.user.displayName,
        email:data.user.email,
        photoURL:data.user.photoURL
    }
})



export const signInUser = createAsyncThunk('userSlice/signInUser',async({email,password})=>{
    const data = await signInWithEmailAndPassword(auth,email,password); 
    return {
        email:data.user.email,
        name:data.user.displayName,
        photo_url:data.user.photoURL
    }
    
})
export const currentUser = createAsyncThunk('userSlice/currentUser',async({email,password},{ dispatch })=>{
    const data = await signInWithEmailAndPassword(auth,email,password); 
   
    return {
        email:data.user.email,
        name:data.user.displayName,
        photo_url:data.user.photoURL
    }
    
})



const userSlice = createSlice({
    name:'usersSlice',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.photo_url = action.payload.photoURL
        },
        logOut:(state)=>{
            state.name='',
            state.email=''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.name = '',
            state.email = '',
            state.photo_url = '',
            state.error = ''
        }).addCase(createUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.photo_url = action.payload.photoURL,
            state.error = ''
        }).addCase(createUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.name = '';
            state.email = '';
            state.photo_url = '',
            state.error=action.error.message;
        })

        builder.addCase(signInUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.name = '';
            state.email = ''
            state.error=''
        }).addCase(signInUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo_url = action.payload.photo_url,
            state.error=''
        }).addCase(signInUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.name = '';
            state.email = '';
            state.photo_url = '',
            state.error=action.error.message
        })

       
    },
    
});

export const {setUser,logOut} = userSlice.actions;

export default userSlice.reducer; 
