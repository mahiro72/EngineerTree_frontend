import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./Core.module.css";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { File } from "../types";

import {
  editNickname,
  editGithubname,
  editTwittername,
  selectProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncUpdateProf,
} from "../auth/authSlice";

import { Button, TextField, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 330,
    height: 300,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};


const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [image, setImage] = useState<File | null>(null);

  const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { 
        id: profile.id, 
        nickName: profile.nickName, 
        img: image,
        twitter_name:profile.twitter_name,
        github_name:profile.github_name,
        point:profile.point,
    };

    await dispatch(fetchCredStart());
    await dispatch(fetchAsyncUpdateProf(packet));
    await dispatch(fetchCredEnd());
    await dispatch(resetOpenProfile());
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };


  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={async () => {
          await dispatch(resetOpenProfile());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>Engineer Tree</h1>

          <br />
          <TextField
            placeholder="nickname"
            type="text"
            value={profile?.nickName}
            onChange={(e) => dispatch(editNickname(e.target.value))}
          />
          <TextField
            placeholder="twitter_name"
            type="text"
            value={profile && profile.twitter_name!='null'? profile.twitter_name:''}
            onChange={(e) => dispatch(editTwittername(e.target.value))}
          />
          <TextField
            placeholder="github_name"
            type="text"
            value={profile && profile.github_name!='null'? profile.github_name:''}
            onChange={(e) => dispatch(editGithubname(e.target.value))}
          />

          <input
            type="file"
            id="imageInput"
            hidden={true} //見えない
            onChange={(e) => setImage(e.target.files![0])}
          />


          <br />
          <IconButton onClick={handlerEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />

          <Button
            disabled={!profile?.nickName}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;