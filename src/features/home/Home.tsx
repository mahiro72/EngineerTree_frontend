import React from 'react'
import { Link } from 'react-router-dom'

import styles from "./Home.module.css"

import AuthMenu from '../auth/AuthMenu'

import { Button } from '@material-ui/core'
import { StylesContext } from '@material-ui/styles'


const Home = () => {
    return (
        <>
            <AuthMenu />
            <div className="mainbody">

                <div className={styles.title}>
                    <h1>今すぐ育てよう、君だけの木を</h1>
                    <p>EngineerTreeであなたの成長を</p>
                    <p>かたちにしよう</p>
                    
                </div>

                <div className={styles.start_button}>
                    <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    style={{ height: '50px', width: '140px' }}
                    to="/core"
                    >
                      start
                    </Button>
                </div>


                
                <div className={styles.tree_img}>
                    <img src={`${process.env.PUBLIC_URL}/tree_pic/tree_blu/tree_blu_6.png`} alt="Logo" />
                </div>


                <div className={styles.sub_title}>
                    <h1>
                        木の成長とともに...
                    </h1>
                    <p>
                        あなたの勉強時間が
                    </p>
                    <p>
                        木を成長させる
                    </p>
                </div>
                <div className={styles.sub_copy}>
                    <h1>
                        Other features
                    </h1>
                    <p>EngineerTreeの他の機能を紹介します</p>
                </div>

                <div className={styles.tg_flex}>
                    <div className={styles.t_mes}>
                        <img src={`${process.env.PUBLIC_URL}/twitter.png`} alt="Logo" width={300} height={300} />
                        <p className={styles.t_title}>Twitter連携</p>
                        <p className={styles.t_size}>#エンジニアツリー</p>
                        <p className={styles.t_size}>とついたツイートから</p>
                        <p className={styles.t_size}>勉強時間と学んだ言語を抽出</p>
                    </div>

                    <div className={styles.g_mes}>
                        <img src={`${process.env.PUBLIC_URL}/github-logo_icon-icons.com_73546.png`} alt="Logo" width={300} height={300} />
                        <p className={styles.t_title}>Github連携</p>
                        <p className={styles.t_size}>GithubApiで</p>
                        <p className={styles.t_size}>あなたのアカウントと連携</p>
                        <p className={styles.t_size}>Githubのデータをまとめて見れる</p>
                    </div>
                </div>
                <div className={styles.title_endfirst}>
                    <h1>
                        新たな挑戦を応援します
                    </h1>
                    <p>
                        EngineerTreeはあなたのエンジニアとしての新たな挑戦を応援します
                    </p>
                    <p>
                        そして、皆さんが望むスキルを身に着け
                    </p>
                    <p>
                        成長し続けることを願っています
                    </p>
                </div>
                <div className={styles.title_endsecond}>
                    <h1>
                        今すぐ始めよう
                    </h1>
                </div>

                <div className={styles.start_button}>
                    <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    style={{ height: '50px', width: '140px' }}
                    to="/core"
                    >
                      start
                    </Button>
                </div>
                    

                <footer>
                    <div className={styles.end_flex}>
                        <div className={styles.logo}>
                            <img src={`${process.env.PUBLIC_URL}/logo_tate.png`} alt="Logo" width={150} height={100} />
                        </div>
                        <div className={styles.navigation}>
                            <div className={styles.nav_link}>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer exyernal">twitterの登録</a>
                            </div>
                            <div className={styles.nav_link}>
                                <a href="https://github.com" target="_blank" rel="noreferrer exyernal">githubの登録</a>                          
                            </div>
                            <p>使い方</p>
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        <small>&copy; 2021 EngineerTree</small>              
                    </div>
                </footer>
                





                

            </div>
        </>
        
        
    )
}

export default Home

