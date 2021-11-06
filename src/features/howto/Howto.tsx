import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "../core/Core.module.css";
import styles2 from "./Howto.module.css";

import {
    selectOpenHowto,
    setOpenHowto,
    resetOpenHowto,

}from '../auth/authSlice';


const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 700,
    height: 500,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const Howto: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const openHowto = useSelector(selectOpenHowto);

    return (
        <>
        <Modal
            isOpen={openHowto}
            onRequestClose={async () => {
            await dispatch(resetOpenHowto());
            }}
            style={customStyles}
        >
            <h1 className={styles2.core_title}>How To Use</h1>

            <br />
            <p className={styles2.mid_title}>連携方法</p>
            <div className={styles2.container}>
                <p>まず右上のProfileをクリックしましょう。</p>
                <p>現われる窓にTwitterの@から始まるUsername、
                    GitHubのアカウント名を入れてください。
                    UPDATE を押せば連携は完了です。</p>
            </div>
            <p className={styles2.mid_title}>Twitter上のつぶやきが反映される条件</p>
            <div className={styles2.container}>
                <p>1:Twitter連携が済んでいること</p>
                <p>2:ツイートに、＃エンジニアツリーとつけること</p>
                <p>3:ツイートに、ある文字列を含めること</p>
                <p>どんなツイートでも探知されるというわけではありません</p>
            </div>
            <p className={styles2.mid_title}>ツイートに含めなればいけない文字列3つ</p>
            <div className={styles2.container}>
                <p>「＃エンジニアツリー」・「◯時間（数字で）」・「勉強した言語の名前」</p>
                <p>例: 今日はPythonを3時間勉強した！　
                    ＃エンジニアツリー　</p>
            </div>
            <p className={styles2.mid_title}>以下のようなツイートには注意しましょう</p>
            <div className={styles2.container}>
                <p>時間が余ったからGolangやってみた。三時間も頑張った。</p>
            </div>
            
            



        
        </Modal>
        </>
    );
};

export default Howto;