import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidenar'
import { ToastContainer, toast } from "react-toastify"
import style from './Skema.module.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'


function Skema() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [popupAddSkema, setPopupAddSkema] = useState('')
    const [popupSkema, setPopupSkema] = useState('')
    const [dataSkemaPenelitian, setDataSkemaPenelitian] = useState([])
    const [dataSkemaPengabdian, setDataSkemaPengabdian] = useState([])
    const [row, setRow] = useState(5)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahDataSkema, setJumlahDataSkema] = useState(0)
    const [id, setId] = useState('')
    const [skema, setSkema] = useState('')

    // Penelitian
    const hendlegetAllSkemaPenelitian = () => {
        axios.get(`http://localhost:3005/api/skemaPenelitian?page=${page}&row=${row}&searchName=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahDataSkema(res.data.data.length)
            setDataSkemaPenelitian(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendlegetAllSkemaPengabdian = () => {
        axios.get(`http://localhost:3005/api/skemaPengabdian?page=${page}&row=${row}&searchName=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setJumlahDataSkema(res.data.data.length)
                setDataSkemaPengabdian(res.data.data)
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const hendleEditSkema = (id) => {
        setId(id)

        if (pathname === '/data-penelitian/skema') {
            axios.get(`http://localhost:3005/api/skemaPenelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setSkema(res.data.data.name)
            }).catch((err)=> {
                console.log(err)
            })
        }else{
            axios.get(`http://localhost:3005/api/skemaPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setSkema(res.data.data.name)
            }).catch((err)=> {
                console.log(err)
            })
            
        }
    }

    const hendleDeleteSkema = (id) => {

        if (pathname === '/data-penelitian/skema') {
            axios.delete(`http://localhost:3005/api/skemaPenelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllSkemaPenelitian()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
            })
        }else{
            axios.delete(`http://localhost:3005/api/skemaPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllSkemaPengabdian()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
            })

        }
    }

    const hendleCloseSkema = () => {
        setId('')
        setSkema('')
    }

    const hendleSubmitSkema = () => {
        const data = {
            name: skema
        }

        if (pathname === '/data-penelitian/skema') {
            if (popupSkema === 'TambahSkema') {
                axios.post(`http://localhost:3005/api/skemaPenelitian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendlegetAllSkemaPenelitian()
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                axios.patch(`http://localhost:3005/api/skemaPenelitian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendlegetAllSkemaPenelitian()
                }).catch((err)=> {
                    console.log(err)
                })
            }
            
        }else{
            if (popupSkema === 'TambahSkema') {
                axios.post(`http://localhost:3005/api/skemaPengabdian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendlegetAllSkemaPengabdian()
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                axios.patch(`http://localhost:3005/api/skemaPengabdian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendlegetAllSkemaPengabdian()
                }).catch((err)=> {
                    console.log(err)
                })
            }
        }



        setId('')
        setSkema('')

    }

    useEffect(() => {
        hendlegetAllSkemaPenelitian()
        hendlegetAllSkemaPengabdian()

    },[row, page, searchName])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddSkema === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                    {pathname === '/data-penelitian/skema' && (
                        <span>Data Skema Penelitian</span>
                    )}
                    {pathname === '/data-pengabdian/skema' && (
                        <span>Data Skema Pengabdian</span>
                    )}
                    <div className={style.conTableJurusan} >
                        <div className={style.buttonCreate}>
                            <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddSkema("1")} ${setPopupSkema("TambahSkema")} `} value="Tambah Data" />
                        </div>
                        <div className={style.buttonSearchAndRow}>
                            <div className={style.entitas}>
                                <span>Show</span>
                                <select name="" id="" value={row} onChange={(e) => setRow(e.target.value)}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <span>Entitas</span>
                            </div>
                            <div className={style.navbarHome}>
                                <div className={`${style.item} ${style.search}`}>
                                    <input type="text" value={searchName} placeholder='Search nama Skema' onChange={(e) => setSearchName(e.target.value)}/>
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                            </div>
                        </div>    
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name Skema</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {console.log(pathname)} */}
                                {pathname === '/data-penelitian/skema' ?
                                    dataSkemaPenelitian !== 0 && (
                                        dataSkemaPenelitian.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddSkema("1")} ${hendleEditSkema(data.id)} ${setPopupSkema("EditSkema")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteSkema(data.id)}>delete</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                    :
                                    dataSkemaPengabdian !== 0 && (
                                        dataSkemaPengabdian.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddSkema("1")} ${hendleEditSkema(data.id)} ${setPopupSkema("EditSkema")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteSkema(data.id)}>delete</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                        <div className={style.pagenation}>
                            <span>Showing {jumlahDataSkema === 0 ? jumlahDataSkema : 1} to {jumlahDataSkema} of entries</span>
                            <div className={style.page}>
                                <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)}>chevron_left</span>
                                <span className={`${style.number}`}>{page}</span>
                                <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                            </div>
                        </div>
                    </div>
                    {popupAddSkema === "1" && (
                        <div className={style.containerPopUp}>
                            <div className={style.contentTitle}>
                                {pathname === '/data-penelitian/skema' && (
                                    <>
                                    {popupSkema === "TambahSkema" && (
                                        <p>Tambah Skema Penelitian</p>
                                        )}
                                    {popupSkema === "EditSkema" && (
                                        <p>Edit Skema Penelitian</p>
                                    )}
                                    </>
                                )}
                                {pathname === '/data-pengabdian/skema' && (
                                    <>
                                    {popupSkema === "TambahSkema" && (
                                        <p>Tambah Skema Pengabdian</p>
                                        )}
                                    {popupSkema === "EditSkema" && (
                                        <p>Edit Skema Pengabdian</p>
                                    )}
                                    </>
                                )}
                                <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddSkema("0")} ${hendleCloseSkema()}`}>close</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Nama Skema</label>
                                <input type="text" value={skema} onChange={(e) => setSkema(e.target.value)}/>
                            </div>
                            <div className={style.conSubmit}>
                                <input type="button" value="Submit" onClick={() => `${hendleSubmitSkema()} ${setPopupAddSkema("0")}`}/>
                            </div>
                        </div>
                    )}
            </div>
            </div>
        </div>
    )
}

export default Skema