import style from'./Navbar.module.css'
import moon from '../../img/moon.png'
import sun from '../../img/sun.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import { useSelector } from 'react-redux'
import axios from 'axios'
import dateFormat from "dateformat"



function Navbar() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const navigate = useNavigate()
    const [picture,setPicture] = useState('')
    const [dataNotification, setDataNotification] = useState('')
    const [jumlahNotification, setJumlahNotification] = useState()
    const [isActiveReadNotif, setIsActiveReadNotif] = useState(0)
    const [imgDarkMode, setImgDarkMode] = useState("light")

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
        setImgDarkMode('dark')
    }
    
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        setImgDarkMode('light')
    }

    const toggleTheme = (e) => {

        // console.log(e.target.className)
        if (e.target.className === "light") {
            setDarkMode()
        }else{
            setLightMode()
        }
    }


    const hendleCekUser = () => {
        if (dataLogin !== null) {
            const decode = jwt(dataLogin.dataLogin.token)
            
            axios.get(`http://localhost:3005/api/users/${decode.id}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPicture(res.data.data?.profile_picture)
    
            }).catch((err) => {
                console.log(err)
            })
        }
    }


    const henndleGetNotificationByUser = () => {
        axios.get(`http://localhost:3005/api/notification`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setJumlahNotification(res.data.data.filter(data => data.statusReadNotification !== true).length)
            setDataNotification(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleUpdateStatusReadNotif = (id) => {
        console.log(id)

        const data = {
            statusReadNotification: true
        }

        axios.patch(`http://localhost:3005/api/notification/${id}`, data, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            henndleGetNotificationByUser()
        }).catch((err) => {
            console.log(err)
        })

    }


    const hendleReadNotif = () => {
        henndleGetNotificationByUser()
        isActiveReadNotif === 0 ? setIsActiveReadNotif(1) : setIsActiveReadNotif(0)
    }


    const hendleLogout = () => {
        localStorage.clear()
        setTimeout(() => {
            navigate('/login')
        }, 300);
    }

    useEffect(() => {
        hendleCekUser()
        henndleGetNotificationByUser()
    },[])

    return (
        <div className={style.navbar}>
            <div className={style.navbarHome}>
                {/* <div className={`${style.item} ${style.search}`}>
                    <input type="text" placeholder='Search'/>
                    <span className="material-symbols-outlined">search</span>
                </div> */}
            </div>
            <div className={style.navbarSettings}>
                <div className={style.item} >
                    <img src={imgDarkMode === "light" ? moon : sun} id={style.icon} className={`${imgDarkMode === "light" ? "light" : "dark"}`} alt="" onClick={(e) => toggleTheme(e)}  />
                    <span className={`material-symbols-outlined ${style.notifIcon}`} onClick={hendleReadNotif}>notifications</span>
                    {jumlahNotification !== 0 ? 
                        <span className={style.budge}>{jumlahNotification}</span>
                        : 
                        ""
                    }
                        {/* {console.log(dataNotification.length)} */}
                        {(isActiveReadNotif === 1 && dataNotification.length !== 0) && (
                            <div className={style.notications}>
                                <span className={style.tes}></span>
                                {dataNotification.map((data, key) => {
                                    console.log(data)
                                    return (
                                        <div key={key} className={`${style.notifItem}`} onClick={() => hendleUpdateStatusReadNotif(data.id)}>
                                            <div className={style.topContent} >
                                                <span>{data.pesan}</span>
                                                <span>{dateFormat(data.createdAt, "dd mmm yyyy, HH:MM")}</span>
                                                {console.log(data.statusReadNotification)}
                                                {data.statusReadNotification !== true && (
                                                    <span className={style.notRead}></span>
                                                )}
                                            </div> 
                                            {console.log(data)}
                                            {data.penelitian ? (
                                                <>
                                                    <p>
                                                        {/* {console.log(data.status)} */}
                                                        <span>Judul</span> : {data.judulPenelitian}
                                                        {/* <span>Judul</span> : Sistem Absensi Pada Sekolah Pada SMP Negeri 2 KOTAMOBAGU */}
                                                    </p>
                                                    <p>
                                                        <span>Ketua</span> : {data.penelitian.partisipasiPenelitian[0].nameUser}
                                                    </p>
                                                </>
                                                ): 
                                                <>
                                                    <p>
                                                        {/* {console.log(data.status)} */}
                                                        <span>Judul</span> : {data.judulPengabdian}
                                                        {/* <span>Judul</span> : Sistem Absensi Pada Sekolah Pada SMP Negeri 2 KOTAMOBAGU */}
                                                    </p>
                                                    <p>
                                                        <span>Ketua</span> : {data.pengabdian.partisipasiPengabdian[0].nameUser}
                                                    </p>
                                                </>
                                            }
                                            
                                        </div>

                                    )
                                })}                        
                            </div>
                        )}
                        {/* <div className={style.notifItem}>
                            <div className={style.topContent} >
                                <span>Permintaan Kenggotaan Penelitian</span>
                                <span>20 Apr 2022, 14:03</span>
                            </div> 
                            <p>
                                Sistem Absensi Pada Sekolah Pada SMP Negeri 2 KOTAMOBAGU
                            </p>
                            <p>
                                Yanti Mokoginta
                            </p>
                        </div> */}
                </div>
                {/* <div className={style.item}>
                    <span className="material-symbols-outlined">chat</span>
                    <span className={style.budge}>2</span>
                </div> */}
                <div className={`${style.item} ${style.navbarContent}`}>
                    {picture !== null ?
                        <img className={style.img} src={picture} alt="" />  
                        : 
                        <span className={`material-symbols-outlined ${style.img}`}>account_box</span>
                    }
                    <ul className={style.profile_link}>
                        <span></span>
                        <li>
                            <Link to="/user-profile">Akun Saya</Link>
                        </li>
                        {/* <li>Settings</li> */}
                        <li onClick={hendleLogout}>Log Out</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Navbar