import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidenar"
import style from "./AprrovedUsulan.module.css"
import {Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import dateFormat from "dateformat"


function ApprovedUsulan() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [dataPenelitianApprov, setDataPenelitianApprov] = useState([])
    const [dataPengabdianApprov, setDataPengabdianApprov] = useState([])
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)
    const {pathname} = useLocation()


    // Penelitian
    const getAllDataPenelitianAprrov = () => {
        axios.get(`http://localhost:3005/api/penelitian/approv?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPenelitianApprov(res.data.data)
            console.log(res.data.data)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleUpdateStatusPenelitian = (id) => {

        // console.log(id, judul, statusPartisipasi)
        axios.patch(`http://localhost:3005/api/penelitian/${id}`, 
            {statusPenelitian: 2},
            { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((tes) => {
            getAllDataPenelitianAprrov()
        }).catch((err) => {
            console.log(err)
        })
    }


    // Pengabdian
    const getAllDataPengabdianAprrov = () => {
        axios.get(`http://localhost:3005/api/pengabdian/approv?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPengabdianApprov(res.data.data)
            console.log(res.data.data)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleUpdateStatusPengabdian = (id) => {

        // console.log(id, judul, statusPartisipasi)
        axios.patch(`http://localhost:3005/api/pengabdian/${id}`, 
            {statusPengabdian: 2},
            { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((tes) => {
            getAllDataPengabdianAprrov()
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleMenuOpsi = (e) => {
        e.preventDefault()
        console.log(e)

        if (e.target.id !== "0") {
            opsiMenu === e.target.id ? setOpsiMenu("0") : setOpsiMenu(e.target.id)
        }else{
            setOpsiMenu("0")
        }
    }

    useEffect(() => {
        if (pathname === "/data-penelitian/ApprovUsulan") {
            getAllDataPenelitianAprrov()    
        }else{
            getAllDataPengabdianAprrov()
        }
    },[row, page, searchName])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                {/* {console.log(pathname)} */}
                {pathname === "/data-penelitian/ApprovUsulan" && (
                    <span>Approv Penelitian</span>
                )}
                {pathname === "/data-pengabdian/ApprovUsulan" && (
                    <span>Approv Pengabdian</span>
                )}
                <div className={style.conTable} onClick={(e) => hendleMenuOpsi(e)} >
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
                                <input type="text" value={searchName} placeholder='Search Judul' onChange={(e) => setSearchName(e.target.value)}/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>    
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Judul</th>
                                {pathname === "/data-penelitian/ApprovUsulan" && (
                                    <>
                                        <th>Skema Penelitian</th>
                                        <th>Waktu Penelitian</th>
                                    </>
                                )}
                                {pathname === "/data-pengabdian/ApprovUsulan" && (
                                    <>
                                        <th>Skema Pengabdian</th>
                                        <th>Waktu Pengabdian</th>
                                    </>
                                )}
                                <th>Status</th>
                                <th>Approv</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pathname === "/data-penelitian/ApprovUsulan" && (
                                dataPenelitianApprov.length !== 0 && (
                                    dataPenelitianApprov.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.judul}</td>
                                                <td>{data?.skema}</td>
                                                <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                                <td>
                                                    <>
                                                        {data.statusPenelitian === 1 && 
                                                                <p className={style.diajukan}>Diajukan</p>
                                                        }
                                                    </>
                                                </td>
                                                <td>
                                                    <>
                                                        <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${hendleUpdateStatusPenelitian(data.id)}`} >done</span>
                                                    </>
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link to={`/data-penelitian/${data?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                                )}
                            {pathname === "/data-pengabdian/ApprovUsulan" && (
                                dataPengabdianApprov.length !== 0 && (
                                    dataPengabdianApprov.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.judul}</td>
                                                <td>{data?.skema}</td>
                                                <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                                <td>
                                                    <>
                                                        {data.statusPengabdian === 1 && 
                                                                <p className={style.diajukan}>Diajukan</p>
                                                        }
                                                    </>
                                                </td>
                                                <td>
                                                    <>
                                                        <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${hendleUpdateStatusPengabdian(data.id)}`} >done</span>
                                                    </>
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link to={`/data-pengabdian/${data?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            )}
                        </tbody>
                    </table>
                    <div className={style.pagenation}>
                        <span>Showing {jumlahData === 0 ? jumlahData : 1} to {jumlahData} of entries</span>
                        <div className={style.page}>
                            <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)} >chevron_left</span>
                            <span className={`${style.number}`}>{page}</span>
                            <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default ApprovedUsulan