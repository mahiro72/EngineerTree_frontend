import React from 'react'
import styles from './Tree.module.css';


import {
    selectProfile,

} from '../auth/authSlice';

import { AppDispatch } from '../../app/store';

import { useSelector,useDispatch } from 'react-redux';

import {
    selectSumStudies,
    selectLang,
}from '../study/studySlice';


const Tree = () => {
    const sumStudies = useSelector(selectSumStudies);
    const lang = useSelector(selectLang);

    const blue_list = ['Python','Ruby','PHP','Go'];
    const red_list = ['HTML','CSS','JavaScript','TypeScript'];
    const green_list = ['Java','Swift','C#','Kotlin','その他'];

    let color ='';
    if (lang!=''){
        if(blue_list.indexOf(lang)!=-1){
            color='blu';
        }else if (red_list.indexOf(lang)!=-1){
            color='red';
        }else{
            color='gre';
        }
    }
    
    const profile = useSelector(selectProfile);
    
    return (
        <>
            {profile?.nickName && (
            <>
              {sumStudies!=0 ?(
                <div className={styles.tree_bg}>
                {color!=''&&(
                    <img src={`${process.env.PUBLIC_URL}/tree_pic/tree_${color}/tree_${color}_${Math.min(Math.floor(sumStudies / 10)+1,8)}.png`} alt="Logo"  />
                )}
                </div>
              ):
              <>
                <div className={styles.tree_short_mes}>
                    <p>おや、勉強時間がまだ記録されていませんね</p>
                    <p>あなたの今日の頑張りを記録しましょう</p>
                    <p>ちいさな木が顔を出します</p>
                </div>
              </>
              }


            </>)}
        </>

        
    )
}

export default Tree
