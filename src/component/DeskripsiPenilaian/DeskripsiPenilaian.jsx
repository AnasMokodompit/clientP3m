import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidenar'
import { ToastContainer, toast } from "react-toastify"
import style from './DeskripsiPenilaian.module.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'


function DeskripsiPenilaian() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [popupAddDeskripsiPenilaian, setPopupAddDeskripsiPenilaian] = useState('')
    const [popupDeskripsiPenilaian, setPopupDeskripsiPenilaian] = useState('')
    const [dataDeskripsiPenilaianPenelitian, setDataDeskripsiPenilaianPenelitian] = useState([])
    const [dataDeskripsiPenilaianPengabdian, setDataDeskripsiPenilaianPengabdian] = useState([])
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchSkema, setSearchSkema] = useState('')
    const [jumlahDataDeskripsiPenilaian, setJumlahDataDeskripsiPenilaian] = useState(0)
    const [id, setId] = useState('')
    const [deskripsiPenilaian, setDeskripsiPenilaian] = useState('')
    const [skema, setSkema] = useState('')
    const [dataskemaPenelitian, setDataSkemaPenelitian] = useState('')
    const [dataskemaPengabdian, setDataSkemaPengabdian] = useState('')


    const hendlegetAllSkemaPenelitian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/skemaPenelitian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataSkemaPenelitian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendlegetAllSkemaPengabdian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/skemaPengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataSkemaPengabdian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }    

    const hendleGetAllDeskripsiPenilaianPenelitian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPenelitian?page=${page}&row=${row}&searchSkema=${searchSkema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahDataDeskripsiPenilaian(res.data.data.length)
            setDataDeskripsiPenilaianPenelitian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleGetAllDeskripsiPenilaianPengabdian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPengabdian?page=${page}&row=${row}&searchSkema=${searchSkema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setJumlahDataDeskripsiPenilaian(res.data.data.length)
                setDataDeskripsiPenilaianPengabdian(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const hendleEditDeskripsiPenilaian = (id) => {
        setId(id)

        if (pathname === '/data-penelitian/deskripsiPenilaian') {
            axios.get(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPenelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDeskripsiPenilaian(res.data.data.name)
                setSkema(res.data.data.skema)
            }).catch((err)=> {
                console.log(err)
            })
        }else{
            axios.get(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                // console.log(res.data.data)
                setDeskripsiPenilaian(res.data.data.name)
                setSkema(res.data.data.skema)
            }).catch((err)=> {
                console.log(err)
            })
            
        }
    }

    const hendleDeleteDeskripsiPenilaian = (id) => {

        if (pathname === '/data-penelitian/deskripsiPenilaian') {
            axios.delete(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPenelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleGetAllDeskripsiPenilaianPenelitian()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
            })
        }else{
            axios.delete(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleGetAllDeskripsiPenilaianPengabdian()
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

    const hendleCloseDeskripsiPenilaian = () => {
        setId('')
        setDeskripsiPenilaian('')
        setSkema('')
    }

    const hendleSubmitDeskripsiPenilaian = () => {
        const data = {
            name: deskripsiPenilaian,
            skema: skema
        }

        if (pathname === '/data-penelitian/deskripsiPenilaian') {
            if (popupDeskripsiPenilaian === 'TambahDeskripsiPenilaian') {
                axios.post(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPenelitian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendleGetAllDeskripsiPenilaianPenelitian()
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                axios.patch(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPenelitian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendleGetAllDeskripsiPenilaianPenelitian()
                }).catch((err)=> {
                    console.log(err)
                })
            }
        }else{
            if (popupDeskripsiPenilaian === 'TambahDeskripsiPenilaian') {
                axios.post(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPengabdian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendleGetAllDeskripsiPenilaianPengabdian()
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                axios.patch(`${process.env.REACT_APP_BASE_API}/deskripsiPenilaianPengabdian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then(() => {
                    hendleGetAllDeskripsiPenilaianPengabdian()
                }).catch((err)=> {
                    console.log(err)
                })
            }
        }



        setId('')
        setDeskripsiPenilaian('')

    }

    useEffect(() => {
        hendleGetAllDeskripsiPenilaianPenelitian()
        hendleGetAllDeskripsiPenilaianPengabdian()
        hendlegetAllSkemaPenelitian()
        hendlegetAllSkemaPengabdian()

    },[row, page, searchSkema])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddDeskripsiPenilaian === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                    {pathname === '/data-penelitian/deskripsiPenilaian' && (
                        <span>Data Deskripsi Penilaian</span>
                    )}
                    {pathname === '/data-pengabdian/deskripsiPenilaian' && (
                        <span>Data Deskripsi Pengabdian</span>
                    )}
                    <div className={style.conTableProdi} >
                        <div className={style.buttonCreate}>
                            <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddDeskripsiPenilaian("1")} ${setPopupDeskripsiPenilaian("TambahDeskripsiPenilaian")} `} value="Tambah Data" />
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
                                    <th>Deskripsi Penilaian</th>
                                    <th>Skema</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pathname === '/data-penelitian/deskripsiPenilaian' ?
                                    dataDeskripsiPenilaianPenelitian !== 0 && (
                                        dataDeskripsiPenilaianPenelitian.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    {console.log(data)}
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.skema}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddDeskripsiPenilaian("1")} ${hendleEditDeskripsiPenilaian(data.id)} ${setPopupDeskripsiPenilaian("EditDeskripsiPenilaian")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteDeskripsiPenilaian(data.id)}>delete</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                    :
                                    dataDeskripsiPenilaianPengabdian !== 0 && (
                                        dataDeskripsiPenilaianPengabdian.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    {console.log(data)}
                                                    <td>{key += 1}</td>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.skema}</td>
                                                    <td>
                                                        <p>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddDeskripsiPenilaian("1")} ${hendleEditDeskripsiPenilaian(data.id)} ${setPopupDeskripsiPenilaian("EditDeskripsiPenilaian")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteDeskripsiPenilaian(data.id)}>delete</span>
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
                            <span>Showing {jumlahDataDeskripsiPenilaian === 0 ? jumlahDataDeskripsiPenilaian : 1} to {jumlahDataDeskripsiPenilaian} of entries</span>
                            <div className={style.page}>
                                <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)}>chevron_left</span>
                                <span className={`${style.number}`}>{page}</span>
                                <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                            </div>
                        </div>
                    </div>
                    {popupAddDeskripsiPenilaian === "1" && (
                        <div className={style.containerPopUp}>
                            <div className={style.contentTitle}>
                                {pathname === '/data-penelitian/deskripsiPenilaian' && (
                                    <>
                                    {popupDeskripsiPenilaian === "TambahDeskripsiPenilaian" && (
                                        <p>Tambah Deskripsi Penelitian</p>
                                        )}
                                    {popupDeskripsiPenilaian === "EditDeskripsiPenilaian" && (
                                        <p>Edit Deskripsi Penelitian</p>
                                    )}
                                    </>
                                )}
                                {pathname === '/data-pengabdian/deskripsiPenilaian' && (
                                    <>
                                    {popupDeskripsiPenilaian === "TambahDeskripsiPenilaian" && (
                                        <p>Tambah Deskripsi Pengabdian</p>
                                        )}
                                    {popupDeskripsiPenilaian === "EditDeskripsiPenilaian" && (
                                        <p>Edit Deskripsi Pengabdian</p>
                                    )}
                                    </>
                                )}
                                <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddDeskripsiPenilaian("0")} ${hendleCloseDeskripsiPenilaian()}`}>close</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Deskripsi Penilaian</label>
                                <input type="text" value={deskripsiPenilaian} onChange={(e) => setDeskripsiPenilaian(e.target.value)}/>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Skema</label>
                                <select name="" id="" value={skema} onChange={(e) => setSkema(e.target.value)} >
                                    <option>-- Pilih Skema --</option>
                                    {pathname === '/data-penelitian/deskripsiPenilaian' ?
                                        dataskemaPenelitian !== 0 && (
                                            dataskemaPenelitian.map((data, key) => {
                                                return (
                                                    <option key={key} value={data?.name}>{data?.name}</option>
                                                )
                                            })
                                        )
                                        :
                                        dataskemaPengabdian !== 0 && (
                                            dataskemaPengabdian.map((data, key) => {
                                                return (
                                                    <option key={key} value={data?.name}>{data?.name}</option>
                                                )
                                            })
                                        )
                                    }
                                </select>
                            </div>
                            <div className={style.conSubmit}>
                                <input type="button" value="Submit" onClick={() => `${hendleSubmitDeskripsiPenilaian()} ${setPopupAddDeskripsiPenilaian("0")}`}/>
                            </div>
                        </div>
                    )}
            </div>
            </div>
        </div>
    )
}

export default DeskripsiPenilaian