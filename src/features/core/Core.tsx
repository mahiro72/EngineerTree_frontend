import React,{useEffect} from 'react'
// import styles from './Core.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

import {
    // selectProfile,
    // selectIsLoadingAuth,

    setOpenSignIn,
    resetOpenSignIn,

    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
    
} from '../auth/authSlice';


import {
    fetchAsyncGetStudies,
    fetchAsyncGetGraph,
    fetchAsyncGetMostLang,

}from '../study/studySlice';

import NewStudy from './NewStudy';
import AuthMenu from '../auth/AuthMenu';
import Mypage from './Mypage';
import EditProfile from './EditProfile';
import Auth from '../auth/Auth';
// import Ranking from './Ranking';
import Tree from '../tree/Tree';
import Howto from '../howto/Howto';

const Core:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();

    useEffect(()=>{
        const fetchBootLoader = async()=>{
            // loginしているとき
            if (localStorage.localJWT){
                dispatch(resetOpenSignIn());

                const result = await dispatch(fetchAsyncGetMyProf());
                
                // 期限切れてないか,切れてたらSignIn
                if (fetchAsyncGetMyProf.rejected.match(result)){
                    dispatch(setOpenSignIn());
                    return null;
                }

                await dispatch(fetchAsyncGetStudies());
                await dispatch(fetchAsyncGetProfs());
                await dispatch(fetchAsyncGetGraph());
                await dispatch(fetchAsyncGetMostLang());

            }
        };
        fetchBootLoader();
    },[dispatch]);

    return (
        
        <div>
            <Auth />
            <EditProfile />
            <NewStudy /> 
            {/* <Ranking /> */}
            <Howto />
            
            <AuthMenu />
            <Tree />
            <Mypage />
        </div>
    );
}

export default Core;
