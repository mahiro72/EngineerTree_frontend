import React from 'react';
import styles from '../core/Core.module.css';
import { useSelector,useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';

import {
    selectProfile,
    setOpenProfile,
    resetOpenProfile,
    // setOpenRanking,
    resetOpenRanking,
    setOpenHowto,
    resetOpenHowto,

} from '../auth/authSlice';


import {
    selectStudies,
    setOpenNewStudy,
    resetOpenNewStudy,
    selectSumStudies,
    fetchAsyncGetTweet,
    fetchAsyncGetStudies,
    selectGraph,
    selectLang,
}from '../study/studySlice';


import {Avatar,Badge,} from '@material-ui/core';

import { AppDispatch } from '../../app/store';

import { withStyles } from '@material-ui/core/styles';

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

  
const buttonStyle = {
    color: '#A5CDE8'
  };


const Mypage = () => {
    const dispatch:AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);

    const studies = useSelector(selectStudies);
    const sumStudies = useSelector(selectSumStudies);

    const graph = useSelector(selectGraph);
    const mostlang = useSelector(selectLang);

    return (
        <>
            {profile?.nickName && (
            <>
            
                <div className={styles.core_ranking}>
                    <div>
                        <p>EngineerTree(????????????????????????)???????????????</p>
                        <p>??????????????????????????????????????????</p>
                    </div>

                    {/* <img src={`${process.env.PUBLIC_URL}/crown-solid.svg`} alt="Logo" width={30} height={15} /> */}
                    {/* <Button 
                        style={{
                            color: '#4b883c'
                        }}

                        onClick={()=>{
                                    dispatch(setOpenRanking());
                                    dispatch(resetOpenNewStudy());
                                    dispatch(resetOpenProfile());
                        }}
                        >
                            Ranking?????????
                    </Button> */}
                </div>


                
                <div className={styles.mypage_prof}>
                    
                    <div>
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
                                // variant="dot"
                                >
                                <Avatar 
                                alt="who?" 
                                src={profile.img} 
                                //   sx={{ width: 156, height: 156 }}
                                style={{ height: '70px', width: '70px' }}
                                />
                                </StyledBadge>
                        </button>
                        <p>{profile.nickName}</p>
                    </div>

                    <div className={styles.mypage_prof_child_s}>
                        <p>??????????????????</p>
                        
                        <p className={styles.core_myprof_log}>{sumStudies}</p>
                        <Button 

                        style={{
                            color: '#e087ee'
                        }}

                        onClick={()=>{
                            dispatch(setOpenNewStudy());
                            dispatch(resetOpenProfile());
                            dispatch(resetOpenRanking());
                            dispatch(resetOpenHowto());
                        }}
                        >
                            ?????????????????????
                        </Button>
                    
                    </div>

                    <div className={styles.mypage_prof_child_l}>
                        <p>????????????????????????</p>
                        <p className={styles.core_myprof_log}>{mostlang}</p>
                    </div>

                </div>




                <div className={styles.core_div}>
                    <p className={styles.core_subtitle}>{profile.nickName}?????????????????????????????????</p>
                    
                    <Button 
                        style={{
                            color: '#00acee'
                        }}
                        // color='primary'

                        onClick={()=>{
                                    dispatch(fetchAsyncGetTweet());
                                    dispatch(fetchAsyncGetStudies());
                                    
                        }}
                        >
                            tweet????????????????????????
                        </Button>
                        <p></p>
                    
                    <Button 

                        style={{
                            color: 'rgb(48, 75, 126)'
                        }}

                        onClick={()=>{
                            dispatch(setOpenHowto());
                            dispatch(resetOpenProfile());
                            dispatch(resetOpenRanking());
                            dispatch(resetOpenNewStudy());
                        }}
                        >
                            <img  src={`${process.env.PUBLIC_URL}/question.svg`} alt="Logo" width={30} height={15} />
                            twitter???????????????????????????
                    </Button>
                    <p className={styles.core_posts}></p>


                    
                    <div  dangerouslySetInnerHTML={{ __html: graph }} />

                    <div className={styles.core_shrot_mes}>
                        <p>??????????????????????????????????????????????????????????????????</p>
                        <p>???????????????????????????????????????????????????</p>
                    </div>
                    
                </div>


                <div className={styles.core_div}>
                    {profile.github_name? (
                        <>
                            <p className={styles.core_subtitle}>{profile.github_name}?????????GitHub?????????</p>
                            <div className={styles.core_github_data}>
                                <div className={styles.core_github_child}>
                                    <img src={`https://github-readme-stats.vercel.app/api?username=${profile.github_name}`} />
                                </div>

                                <div className={styles.core_github_child}>
                                    <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.github_name}&layout=compact`} />
                                </div>

                            </div>
                        </>
                        
                    ):
                    <>
                        <p>GitHub??????????????????????????????????????????????????????</p>
                        <p>???????????????????????????????????????GitHub????????????????????????????????????</p>
                    </>
                    }
                </div>



                <div className={styles.core_div}>
                    <p className={styles.core_subtitle}>{profile.nickName}?????????????????????</p>
                    <div className={styles.core_posts}>
                        {studies[0]?.language ?
                            <ul>
                                {studies
                                .slice(0) //copy
                                .reverse() //??????
                                .map((study,index)=>
                                    <div key={index}>
                                        <li className={styles.study_li}>             
                                            <p className={styles.study_comment} >{study.comment}</p>
                                            <p>{study.language} / {study.study_time}hour</p>
                                            <p>{study.created_on}</p>               
                                        </li>
                                        <br/>
                                    </div>
                                )}
                            </ul>
                            
                        :<>

                            <p>????????????????????????????????????????????????</p>
                            <p>?????????????????????????????????????????????</p>
                            <p>Twitter????????????????????????????????????????????????</p>

                        </>
                        }



                    </div>
                </div>


            
            </>
            )}
        </>
    )
}

export default Mypage
