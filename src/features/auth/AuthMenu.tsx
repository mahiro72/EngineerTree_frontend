import React from 'react';
import styles from '../core/Core.module.css';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import {
    editNickname,

    selectProfile,
    selectIsLoadingAuth,

    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,

    setOpenProfile,
    resetOpenProfile,

    setOpenRanking,
    resetOpenRanking,
    resetOpenHowto,

} from '../auth/authSlice';




import {
    selectStudies,
    selectIsLoadingStudy,
    setOpenNewStudy,
    resetOpenNewStudy,
    

}from '../study/studySlice';


import {
    Button,
    CircularProgress,
    colors,
} from '@material-ui/core';

import { AppDispatch } from '../../app/store';
import { withStyles } from '@material-ui/core/styles';
import {Avatar,Badge,} from '@material-ui/core';


const linkStyle = {
    textDecoration: "none",
    color: 'black'
  };


const buttonStyle = {
    color: 'black'
  };



  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))(Badge);



const AuthMenu = () => {
    const dispatch:AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);

    // fetch loading状況
    const isLoadingStudy = useSelector(selectIsLoadingStudy);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);

    return (
    <div className={styles.core_header}>
        <h1 className={styles.core_title}>
            <Link style={linkStyle} to='/'>Engineer Tree</Link>
        </h1>
        {profile?.nickName ?(
        <>

        
        

        <div className={styles.core_logout}>
            {(isLoadingStudy||isLoadingAuth)&&<CircularProgress />}
            <button
                className={styles.core_btnModal}
                onClick={() => {
                dispatch(setOpenProfile());
                dispatch(resetOpenNewStudy());
                dispatch(resetOpenRanking());
                dispatch(resetOpenHowto());
                }}
            >
                <StyledBadge
                overlap="circular"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot"
                >
                <Avatar 
                    alt="who?" 
                    src={profile.img} 

                />{" "}
                </StyledBadge>
            </button>
            <Button
                onClick={()=>{
                    localStorage.removeItem('localJWT');
                    dispatch(editNickname(''));
                    dispatch(resetOpenProfile());
                    dispatch(resetOpenNewStudy());
                    dispatch(resetOpenHowto());
                    dispatch(resetOpenRanking());
                    dispatch(setOpenSignIn());
                }}
                style={buttonStyle}
            >
                    Logout
            </Button>

            


        </div>
        </>
        
        ) : (<div>
            <Button
            onClick={()=>{
                dispatch(setOpenSignIn());
                dispatch(resetOpenSignUp());
                dispatch(resetOpenHowto());
                dispatch(resetOpenRanking());
            }}
            >
                LogIn
            </Button>

            <Button
            onClick={()=>{
                dispatch(setOpenSignUp());
                dispatch(resetOpenSignIn());
                dispatch(resetOpenHowto());
                dispatch(resetOpenRanking());
            }}>
                SignUp
            </Button>
        </div>
        )}


    </div>
    )
}

export default AuthMenu;
