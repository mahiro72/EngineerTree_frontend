import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "./Core.module.css";

import { File, PROPS_NEWSTUDY } from "../types";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


import {
  selectOpenNewStudy,
  resetOpenNewStudy,
  fetchStudyStart,
  fetchStudyEnd,
  fetchAsyncNewStudy,
} from "../study/studySlice";

import { Button, TextField, IconButton } from "@material-ui/core";


const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 220,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const NewStudy: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const openNewStudy = useSelector(selectOpenNewStudy);

    const [study_time,setStudy_time] = useState('0');

    const [comment, setComment] = useState("");

    const [language, setLanguage] = useState("");

    const languages = [
      'Python','HTML','CSS','JavaScript','Ruby','Java','Swift','TypeScript',
      'PHP','Kotlin','C#','Go','その他'
    ]
    
    const newStudy = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet:PROPS_NEWSTUDY = { 
            study_time: study_time,
            comment: comment,
            language:language,
        };

        await dispatch(fetchStudyStart());
        await dispatch(fetchAsyncNewStudy(packet));
        await dispatch(fetchStudyEnd());
        setStudy_time('0');
        setComment('');
        setLanguage('');
        dispatch(resetOpenNewStudy());
  };

  return (
    <>
      <Modal
        isOpen={openNewStudy}
        onRequestClose={async () => {
          await dispatch(resetOpenNewStudy());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>Engineer Tree</h1>

          <br />
          <TextField
            placeholder="勉強時間"
            type="text"
            onChange={(e:any) => setStudy_time(e.target.value)}
          />

          <FormControl>
            {/* <InputLabel>{inputLabel}</InputLabel> */}
            <Select
                // defaultValue={defaultValue}
                // value={value}
                onChange={(e:any)=>{
                  setLanguage(e.target.value);
                }}
            >
                {languages.map((language,index) => (
                <MenuItem value={language} key={index}>
                    {language}
                </MenuItem>
                ))}
            </Select>
          </FormControl>


          <TextField
            placeholder="コメント"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            disabled={!study_time || !language || !comment}
            variant="contained"
            color="primary"
            onClick={newStudy}
          >
            New Study
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewStudy;