
import { createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';
import axios from 'axios';
import { PROPS_NEWSTUDY, PROPS_PROFILE, PROPS_SUMSTUDY } from '../types';


const apiUrlStudy = `${process.env.REACT_APP_DEV_API_URL}api/study/`;

const apiUrlGetTweet = `${process.env.REACT_APP_DEV_API_URL}api/get_tweet/`;

const apiUrlGetGraph = `${process.env.REACT_APP_DEV_API_URL}api/create_graph/`;

const apiUrlGetMostLang = `${process.env.REACT_APP_DEV_API_URL}api/most_lang/`;


// 自分の勉強記録の取得
export const fetchAsyncGetStudies = createAsyncThunk(
    'study/get',
    async ()=>{
        const res = await axios.get(apiUrlStudy,{
            headers:{
                Authorization:`JWT ${localStorage.localJWT}`,
            },
        });
  
        return res.data;
    }
);


// 勉強記録の追加
export const fetchAsyncNewStudy = createAsyncThunk(
    'study/post',
    async (newStudy:PROPS_NEWSTUDY)=>{
        const uploadData = new FormData();

        uploadData.append('language',newStudy.language);
        uploadData.append('study_time',newStudy.study_time);
        uploadData.append('comment',newStudy.comment);

        const res = await axios.post(apiUrlStudy,uploadData,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);



// ツイートの勉強記録の取得
export const fetchAsyncGetTweet = createAsyncThunk(
    'tweet/get',
    async ()=>{
        const res = await axios.get(apiUrlGetTweet,{
            headers:{
                Authorization:`JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);



// 勉強時間のグラフ取得
export const fetchAsyncGetGraph = createAsyncThunk(
    'graph/get',
    async ()=>{
        const res = await axios.get(apiUrlGetGraph,{
            headers:{
                Authorization:`JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;

    }
);



// 最も勉強している言語
export const fetchAsyncGetMostLang = createAsyncThunk(
    'most_lang/get',
    async ()=>{
        const res = await axios.get(apiUrlGetMostLang,{
            headers:{
                Authorization:`JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;

    }
);



export const studySlice = createSlice({
  name: 'study',
  initialState:{
      isLoadingStudy:false, //投稿がフェッチング中かどうか
      openNewStudy:false,　// 勉強記録追加のmodal開くか
      sumStudies:0,
      mostlang:'',
      graph:'',
      studies:[
          {
              id:0,
              language:'',
              study_time:0,
              comment:'',
              created_on:'',
          }
      ],
  },

  reducers: {
      fetchStudyStart(state){
          state.isLoadingStudy = true;
      },
      fetchStudyEnd(state){
          state.isLoadingStudy=false;
      },
      setOpenNewStudy(state){
          state.openNewStudy = true
      },
      resetOpenNewStudy(state){
          state.openNewStudy = false;
      },
  },

  extraReducers:(builder)=>{
    builder.addCase(fetchAsyncGetStudies.fulfilled,(state,action)=>{
        let temp_sum = 0;
        action.payload.map((data:PROPS_SUMSTUDY)=>{
            temp_sum+=data.study_time
        });

        return {
            ...state,
            studies:action.payload,
            sumStudies:temp_sum,
        };
    });
    builder.addCase(fetchAsyncNewStudy.fulfilled,(state,action)=>{

        let temp_sum = state.sumStudies;
        temp_sum+=action.payload.study_time;

        return{
            ...state,
            studies:[...state.studies,action.payload],
            sumStudies:temp_sum,
        };
    });

    builder.addCase(fetchAsyncGetTweet.fulfilled,(state,action)=>{

        return{
            ...state,
            studies:[...state.studies,action.payload],
        };
    });

    // graphに格納
    builder.addCase(fetchAsyncGetGraph.fulfilled,(state,action)=>{
        return{
            ...state,
            graph:action.payload,
        };
    });

    // mostlangに格納
    builder.addCase(fetchAsyncGetMostLang.fulfilled,(state,action)=>{
        return{
            ...state,
            mostlang:action.payload,
        };
    });


  },
});



export const {
    fetchStudyStart,
    fetchStudyEnd,
    setOpenNewStudy,
    resetOpenNewStudy,

} = studySlice.actions;


export const selectIsLoadingStudy = (state:RootState)=>state.study.isLoadingStudy;
export const selectOpenNewStudy = (state:RootState)=>state.study.openNewStudy;
export const selectStudies = (state:RootState)=>state.study.studies;
export const selectSumStudies = (state:RootState)=>state.study.sumStudies;
export const selectGraph = (state:RootState)=>state.study.graph;
export const selectLang = (state:RootState)=>state.study.mostlang;

export default studySlice.reducer;
