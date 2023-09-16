import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidenar'
import { ToastContainer, toast } from "react-toastify"
import style from './RuangLingkupSkema.module.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'


function RuangLingkupSkema() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [popupAddruangLingkupSkemaPengabdian, setPopupAddruangLingkupSkemaPengabdian] = useState('')
    const [popupruangLingkupSkemaPengabdian, setPopupruangLingkupSkemaPengabdian] = useState('')
    const [dataRuangLingkupSkemaPengabdian, setDataRuangLingkupSkemaPengabdian] = useState([])
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchSkema, setSearchSkema] = useState('')
    const [jumlahruangLingkupSkemaPengabdian, setJumlahruangLingkupSkemaPengabdian] = useState(0)
    const [id, setId] = useState('')
    const [ruangLingkupSkemaPengabdian, setRuangLingkupSkemaPengabdian] = useState('')
    const [skema, setSkema] = useState('')
    const [dataskema, setDataSkema] = useState([])


    const hendlegetAllSkema = () => {

        axios.get(`http://localhost:3005/api/skemaPengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataSkema(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendlegetAllruangLingkupSkemaPengabdian = () => {
        axios.get(`http://localhost:3005/api/ruangLingkupSkemaPengabdian?page=${page}&row=${row}&searchSkema=${searchSkema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahruangLingkupSkemaPengabdian(res.data.data.length)
            setDataRuangLingkupSkemaPengabdian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditruangLingkupSkemaPengabdian = (id) => {
        setId(id)

        axios.get(`http://localhost:3005/api/ruangLingkupSkemaPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setRuangLingkupSkemaPengabdian(res.data.data.name)
            setSkema(res.data.data.skema)
        }).catch((err)=> {
            console.log(err)
        })
       
    }

    const hendleDeleteruangLingkupSkemaPengabdian = (id) => {

        axios.delete(`http://localhost:3005/api/ruangLingkupSkemaPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            hendlegetAllruangLingkupSkemaPengabdian()
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else{
                toast(err.response.data.message)
            }
        })
    }

    const hendleCloseruangLingkupSkemaPengabdian = () => {
        setId('')
        setRuangLingkupSkemaPengabdian('')
        setSkema('')
    }

    const hendleSubmitruangLingkupSkemaPengabdian = () => {
        const data = {
            name: ruangLingkupSkemaPengabdian,
            skema: skema
        }

        if (popupruangLingkupSkemaPengabdian === 'TambahruangLingkupSkemaPengabdian') {
            axios.post(`http://localhost:3005/api/ruangLingkupSkemaPengabdian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllruangLingkupSkemaPengabdian()
            }).catch((err) => {
                console.log(err)
            })
        }else{
            axios.patch(`http://localhost:3005/api/ruangLingkupSkemaPengabdian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllruangLingkupSkemaPengabdian()
            }).catch((err)=> {
                console.log(err)
            })
        }

        setId('')
        setRuangLingkupSkemaPengabdian('')
        setSkema('')

    }

    useEffect(() => {
        hendlegetAllruangLingkupSkemaPengabdian()
        hendlegetAllSkema()

    },[row, page, searchSkema])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddruangLingkupSkemaPengabdian === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                    {pathname === '/data-pengabdian/ruangLingkupSkema' && (
                        <span>Data Ruang Lingkup Pengabdian</span>
                    )}
                    <div className={style.conTableProdi} >
                        <div className={style.buttonCreate}>
                            <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddruangLingkupSkemaPengabdian("1")} ${setPopupruangLingkupSkemaPengabdian("TambahruangLingkupSkemaPengabdian")} `} value="Tambah Data" />
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
                                    <input type="text" value={searchSkema} placeholder='Search nama Skema' onChange={(e) => setSearchSkema(e.target.value)}/>
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                            </div>
                        </div>    
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Ruang Lingkup</th>
                                    <th>Skema</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataRuangLingkupSkemaPengabdian !== 0 && (
                                    dataRuangLingkupSkemaPengabdian.map((data,key) => {
                                        return (
                                            <tr key={key} className={style.forAdmin}>
                                                {console.log(data)}
                                                <td>{key += 1}</td>
                                                <td>{data?.name}</td>
                                                <td>{data?.skema}</td>
                                                <td>
                                                    <p>
                                                    <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddruangLingkupSkemaPengabdian("1")} ${hendleEditruangLingkupSkemaPengabdian(data.id)} ${setPopupruangLingkupSkemaPengabdian("EditruangLingkupSkemaPengabdian")}`}>edit</span> 
                                                    <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteruangLingkupSkemaPengabdian(data.id)}>delete</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                        <div className={style.pagenation}>
                            <span>Showing {jumlahruangLingkupSkemaPengabdian === 0 ? jumlahruangLingkupSkemaPengabdian : 1} to {jumlahruangLingkupSkemaPengabdian} of entries</span>
                            <div className={style.page}>
                                <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)}>chevron_left</span>
                                <span className={`${style.number}`}>{page}</span>
                                <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                            </div>
                        </div>
                    </div>
                    {popupAddruangLingkupSkemaPengabdian === "1" && (
                        <div className={style.containerPopUp}>
                            <div className={style.contentTitle}>
                                {pathname === '/data-pengabdian/ruangLingkupSkema' && (
                                    <>
                                    {popupruangLingkupSkemaPengabdian === "TambahruangLingkupSkemaPengabdian" && (
                                        <p>Tambah Ruang Lingkup Skema</p>
                                        )}
                                    {popupruangLingkupSkemaPengabdian === "EditruangLingkupSkemaPengabdian" && (
                                        <p>Edit Ruang Lingkup Skema</p>
                                    )}
                                    </>
                                )}
                                <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddruangLingkupSkemaPengabdian("0")} ${hendleCloseruangLingkupSkemaPengabdian()}`}>close</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Ruang Lingkup Skema</label>
                                <input type="text" value={ruangLingkupSkemaPengabdian} onChange={(e) => setRuangLingkupSkemaPengabdian(e.target.value)}/>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Skema</label>
                                <select name="" id="" value={skema} onChange={(e) => setSkema(e.target.value)} >
                                    <option>-- Pilih Skema --</option>
                                    {dataskema !== 0 && (
                                        dataskema.map((data, key) => {
                                            return (
                                                <option key={key} value={data?.name}>{data?.name}</option>
                                            )
                                        })
                                    )} 
                                </select>
                            </div>
                            <div className={style.conSubmit}>
                                <input type="button" value="Submit" onClick={() => `${hendleSubmitruangLingkupSkemaPengabdian()} ${setPopupAddruangLingkupSkemaPengabdian("0")}`}/>
                            </div>
                        </div>
                    )}
            </div>
            </div>
        </div>
    )
}

export default RuangLingkupSkema