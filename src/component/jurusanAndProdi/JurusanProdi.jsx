import style from './JurusanProdi.module.css'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function JurusanProdi() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [popupAddJurusan, setPopupAddJurusan] = useState('')
    const [popupJurusan, setPopupJurusan] = useState('')
    const [jurusan, setJurusan] = useState('')
    const [prodi, setProdi] = useState('')
    const [dataJurusan, setDataJurusan] = useState([])
    const [dataProdi, setDataProdi] = useState([])
    const [id, setId] = useState('')
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahDataJurusan, setJumlahDataJurusan] = useState(0)
    const [jumlahDataProdi, setJumlahDataProdi] = useState(0)


    // Jurusan

    const hendlegetAllJurusan = () => {
        axios.get(`http://localhost:3005/api/jurusan?page=${page}&row=${row}&searchName=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahDataJurusan(res.data.data.length)
            setDataJurusan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitJurusan = () => {

        const data = {
            name: jurusan
        }

        if (popupJurusan === 'TambahJurusan') {
            axios.post(`http://localhost:3005/api/jurusan`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllJurusan()
            }).catch((err) => {
                console.log(err)
            })
        }else{
            axios.patch(`http://localhost:3005/api/jurusan/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllJurusan()
            }).catch((err)=> {
                console.log(err)
            })
        }

        setId('')
        setJurusan('')
    }

    const hendleEditJurusan = (id) => {
        setId(id)

        axios.get(`http://localhost:3005/api/jurusan/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJurusan(res.data.data.name)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleDeleteJurusan = (id) => {
        axios.delete(`http://localhost:3005/api/jurusan/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            hendlegetAllJurusan()
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else{
                toast(err.response.data.message)
            }
        })
    }

    const hendleCloseJurusan = () => {
        setId('')
        setJurusan('')
    }


    // Prodi

    const hendlegetAllProdi = () => {
        axios.get(`http://localhost:3005/api/prodi?page=${page}&row=${row}&searchName=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahDataProdi(res.data.data.length)
            setDataProdi(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitProdi = () => {

        const data = {
            name: prodi,
            nameJurusan: jurusan
        }

        if (popupJurusan === 'TambahJurusan') {
            axios.post(`http://localhost:3005/api/prodi`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllProdi()
            }).catch((err) => {
                console.log(err)
            })
        }else{
            axios.patch(`http://localhost:3005/api/prodi/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendlegetAllProdi()
            }).catch((err)=> {
                console.log(err)
            })
        }

        setId('')
        setProdi('')
        setJurusan('')
    }

    const hendleEditProdi = (id) => {
        setId(id)

        axios.get(`http://localhost:3005/api/prodi/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setProdi(res.data.data.name)
            setJurusan(res.data.data.nameJurusan)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleDeleteProdi = (id) => {
        axios.delete(`http://localhost:3005/api/prodi/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            hendlegetAllProdi()
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else{
                toast(err.response.data.message)
            }
        })
    }

    const hendleCloseProdi = () => {
        setId('')
        setProdi('')
        setJurusan('')
    }


    useEffect(() => {
        hendlegetAllJurusan()
        hendlegetAllProdi()

    },[row, page, searchName])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddJurusan === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                {pathname === '/masterData/jurusan' && (
                    <>
                        <span>Data Jurusan</span>
                        <div className={style.conTableJurusan} >
                            <div className={style.buttonCreate}>
                                <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddJurusan("1")} ${setPopupJurusan("TambahJurusan")} `} value="Tambah Data" />
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
                                        <input type="text" value={searchName} placeholder='Search nama Jurusan' onChange={(e) => setSearchName(e.target.value)}/>
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                </div>
                            </div>    
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name Jurusan</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJurusan !== 0 && (
                                        dataJurusan.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddJurusan("1")} ${hendleEditJurusan(data.id)} ${setPopupJurusan("EditJurusan")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteJurusan(data.id)}>delete</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                            <div className={style.pagenation}>
                                <span>Showing {jumlahDataJurusan === 0 ? jumlahDataJurusan : 1} to {jumlahDataJurusan} of entries</span>
                                <div className={style.page}>
                                    <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)}>chevron_left</span>
                                    <span className={`${style.number}`}>{page}</span>
                                    <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                                </div>
                            </div>
                        </div>
                        {popupAddJurusan === "1" && (
                            <div className={style.containerPopUp}>
                                <div className={style.contentTitle}>
                                    {popupJurusan === "TambahJurusan" && (
                                        <p>Tambah Jurusan</p>
                                        )}
                                    {popupJurusan === "EditJurusan" && (
                                        <p>Edit Jurusan</p>
                                    )}
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddJurusan("0")} ${hendleCloseJurusan()}`}>close</span>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Nama Jurusan</label>
                                    <input type="text" value={jurusan} onChange={(e) => setJurusan(e.target.value)}/>
                                </div>
                                <div className={style.conSubmit}>
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitJurusan()} ${setPopupAddJurusan("0")}`}/>
                                </div>
                            </div>
                        )}
                    </>    
                )}
                {pathname === '/masterData/prodi' && (
                    <>
                        <span>Data Program Studi</span>
                        <div className={style.conTableProdi} >
                            <div className={style.buttonCreate}>
                                <input type="button" className={style.userAddButton}  onClick={() => `${setPopupAddJurusan("1")} ${setPopupJurusan("TambahJurusan")} `} value="Tambah Data" />
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
                                        <input type="text" value={searchName} placeholder='Search nama Prodi' onChange={(e) => setSearchName(e.target.value)}/>
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                </div>
                            </div>    
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name Program Studi</th>
                                        <th>Name Jurusan</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProdi.length !== 0 && (
                                        dataProdi.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.nameJurusan}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddJurusan("1")} ${hendleEditProdi(data.id)} ${setPopupJurusan("EditJurusan")}`} >edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteProdi(data.id)}>delete</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                            <div className={style.pagenation}>
                                <span>Showing {jumlahDataProdi === 0 ? jumlahDataProdi : 1} to {jumlahDataProdi} of entries</span>
                                <div className={style.page}>
                                    <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)} >chevron_left</span>
                                    <span className={`${style.number}`}>{page}</span>
                                    <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                                </div>
                            </div>
                        </div>
                        {popupAddJurusan === "1" && (
                            <div className={style.containerPopUp}>
                                <div className={style.contentTitle}>
                                    {popupJurusan === "TambahJurusan" && (
                                        <p>Tambah Program Studi</p>    
                                    )}
                                    {popupJurusan === "EditJurusan" && (
                                        <p>Edit Program Studi</p>
                                    )}
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddJurusan("0")} ${hendleCloseProdi()}`}>close</span>
                                </div>
                                <div className={style.horizontal}>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Nama Jurusan</label>
                                        <select name="" id="" value={jurusan} onChange={(e) => setJurusan(e.target.value)} >
                                            <option>-- Pilih Jurusan --</option>
                                            {dataJurusan !== 0 && (
                                                dataJurusan.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data?.name}>{data?.name}</option>
                                                    )
                                                })
                                            )} 
                                        </select>
                                    </div>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Nama Program Studi</label>
                                        <input type="text" value={prodi} onChange={(e) => setProdi(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={style.conSubmit}>
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitProdi()} ${setPopupAddJurusan("0")}`}/>
                                </div>
                            </div>
                        )}
                    </>    
                )}
            </div>
            </div>
        </div>
    )
}

export default JurusanProdi