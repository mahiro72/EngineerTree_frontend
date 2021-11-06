import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME } from "../types";

// 環境変数(.env)読み込み
const apiUrl = process.env.REACT_APP_DEV_API_URL;


//成功　fulfill
//失敗　rejected

//login
export const fetchAsyncLogin = createAsyncThunk(
  "auth/post",
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
      headers: {
        "Content-Type": "application/json",//postの時書く
      },
    });
    return res.data;//JWTのアクセストークン
  }
);

//新規登録
export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);


//profile作成
export const fetchAsyncCreateProf = createAsyncThunk(
  "profile/post",
  async (nickName: PROPS_NICKNAME) => {
    const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);


//profile更新
export const fetchAsyncUpdateProf = createAsyncThunk(
  "profile/put",
  async (profile: PROPS_PROFILE) => {
    const uploadData = new FormData();
    uploadData.append("nickName", profile.nickName);
    // uploadData.append("twitter_name", profile.twitter_name);
    // uploadData.append("github_name", profile.github_name);
    profile.img && uploadData.append("img", profile.img, profile.img.name);

    profile.twitter_name && uploadData.append("twitter_name", profile.twitter_name);
    profile.github_name && uploadData.append("github_name", profile.github_name);

    const res = await axios.put(
      `${apiUrl}api/profile/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);


//myprofile
export const fetchAsyncGetMyProf = createAsyncThunk("profile/get", async () => {
  const res = await axios.get(`${apiUrl}api/myprofile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data[0];
});



//top10profiles 取得
export const fetchAsyncGetProfs = createAsyncThunk("profiles/get", async () => {
  const res = await axios.get(`${apiUrl}api/profile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});



// Sliceの作成
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openSignIn: true,　//login
    openSignUp: false,  //register
    openProfile: false,  //edit profile
    openRanking:false,
    openHowto:false,

    isLoadingAuth: false,  //REST API にアクセス中
    myprofile: {
      id: 0,
      nickName: "",
      userProfile: 0,
      created_on: "",
      img: "",
      point:0,
      twitter_name: "",
      github_name: "",
    },

    // top10profiles: [
    //   {
    //     id: 0,
    //     nickName: "",
    //     userProfile: 0,
    //     created_on: "",
    //     img: "",
    //     point:0,
    //     twitter_name: "",
    //     github_name: "",
    //   },
    // ],
  },

  reducers: {
    // REST APIにアクセス開始
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    // 処理が終了したとき
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },


    // SignIn modal表示
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    // SignIn modal非表示
    resetOpenSignIn(state) {
      state.openSignIn = false;
    },


    // SignUp(Register) modal表示
    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    // SignUp(Register) modal非表示
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },


    //Profile Edit modal 表示
    setOpenProfile(state) {
      state.openProfile = true;
    },
    //Profile Edit modal 非表示
    resetOpenProfile(state) {
      state.openProfile = false;
    },


    //Profile Edit modal 表示
    setOpenRanking(state) {
      state.openRanking = true;
    },
    //Profile Edit modal 非表示
    resetOpenRanking(state) {
      state.openRanking = false;
    },

    //Howto modal 表示
    setOpenHowto(state) {
      state.openHowto = true;
    },
    //Howto  modal 非表示
    resetOpenHowto(state) {
      state.openHowto = false;
    },


    //nickName Edit
    editNickname(state, action) {
      //action.payloadでアクセス
      state.myprofile.nickName = action.payload;
    },

     //twitter_name Edit
     editTwittername(state, action) {
      state.myprofile.twitter_name = action.payload;
    },
     //github_name Edit
     editGithubname(state, action) {
      state.myprofile.github_name = action.payload;
    },
  },



  //後処理
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
        localStorage.setItem("localJWT", action.payload.access);
    });

    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
        //新しいprofile
        //return で action.payloadに帰ってくる
        state.myprofile = action.payload;
    });

    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
        //loginしているユーザーをmyprofileに上書き
        state.myprofile = action.payload;
    });

    // builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
    //     //存在しているprofile
    //     state.top10profiles = action.payload;
    // });

    // builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
    //   state.myprofile = action.payload;
    //   state.top10profiles = state.top10profiles.map((prof) =>
    //     //更新をすぐに反映
    //     prof.id === action.payload.id ? action.payload : prof
    //   );
    // });



  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  setOpenRanking,
  resetOpenRanking,
  editNickname,
  editTwittername,
  editGithubname,
  setOpenHowto,
  resetOpenHowto,
} = authSlice.actions;



export const selectIsLoadingAuth = (state: RootState) =>state.auth.isLoadingAuth;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenProfile = (state: RootState) => state.auth.openProfile;
export const selectProfile = (state: RootState) => state.auth.myprofile;
// export const selectProfiles = (state: RootState) => state.auth.top10profiles;
export const selectOpenRanking = (state: RootState) => state.auth.openRanking;
export const selectOpenHowto = (state: RootState) => state.auth.openHowto;


export default authSlice.reducer;

