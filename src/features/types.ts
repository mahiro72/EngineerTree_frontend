// folder
export interface File extends Blob{
    readonly lastModified:number;
    readonly name:string;
}


// authSlice.ts
export interface PROPS_AUTHEN {
    email:string;
    password:string;
}

export interface PROPS_PROFILE {
    id:number;
    nickName:string;
    img:File|null;
    point:number;
    twitter_name:string;
    github_name:string;
}

export interface PROPS_NICKNAME{
    nickName:string;
}




// study
export interface PROPS_NEWSTUDY {
    language:string;
    study_time:string;
    comment:string;
}


// export interface PROPS_STUDY{
//     studyId:number;
//     loginId:number;
//     userStudy:number;

//     language:string;
//     study_time:string;
//     comment:string;
// }

export interface PROPS_SUMSTUDY{
    study_time:number;
}