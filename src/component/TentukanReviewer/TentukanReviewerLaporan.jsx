import style from './TentukanReviewerLaporan.module.css'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import dateFormat from "dateformat"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function TentukanReviwer() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [ id, setId] = useState()
    const [judul, setJudul] = useState('')
    const [reviewer, setReviewer] = useState({})
    const [listName, setListName] = useState([])
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [idDeleteReviewer, setIdDeleteReviewer] = useState("")
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)

    const [statusLaporan, setStatusLaporan] = useState("")

    const [laporanAkhirId, setLaporanAkhirId] = useState("")

    const [idReviewLaporan, setIdReviewLaporan] = useState('')


    const [popupAddTentuReviewer, setPopupAddTentuReviewer] = useState('')
    const [popupTentuReviewer, setPopupTentuReviewer] = useState('')


    const [AssesmentLaporan, setAssesmentLaporan] = useState([])

    // Edit Penelitian
    const [revisi, setRevisi] = useState('')

    const hendleMenuOpsi = (e) => {
        e.preventDefault()

        if (e.target.id !== "0") {
            opsiMenu === e.target.id ? setOpsiMenu("0") : setOpsiMenu(e.target.id)
        }else{
            setOpsiMenu("0")
        }
    }

    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setId(decode.roleId)
    }

    
    // Laporan
    const hendleGetAllAssesmentLaporan = () => {
        console.log('tes')
        axios.get(`http://localhost:3005/api/laporan/assesment?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setAssesmentLaporan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleAddTentuReviewer = (idLaporanAkhir) => {
        setLaporanAkhirId(idLaporanAkhir)
        setReviewer({})
    }

    const hendleEditTentuReviewer = (id) => {

        axios.get(`http://localhost:3005/api/laporan/reviewer/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setReviewer(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        setLaporanAkhirId(id)
    }

    const hendleCloseTentuReviewer = () => {
        setJudul('')
        setReviewer('')
        setListName([])
    }

    const hendleSubmitTentuReviewer = () => {

        
        if (popupTentuReviewer === 'TentukanReviewerLaporan') {

            const Data = {
                nameUser: reviewer.nameUser,
                laporanAkhirId: laporanAkhirId 
        
            }

            axios.post(`http://localhost:3005/api/laporan/review` , Data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllAssesmentLaporan()
            }).catch((err)=> {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllAssesmentLaporan()
            })
        }else{

            let Data = {}

            if (reviewer.id) {
                Data = {
                    id: reviewer.id,
                    nameUser: reviewer.nameUser,
                    laporanAkhirId: reviewer.laporanAkhirId
                }
            }else{
                Data = {
                    nameUser: reviewer.nameUser,
                    laporanAkhirId: laporanAkhirId
                }
            }


            const dataOVerAll = {
                Data,
                idDeleteReviewer
            }



            axios.patch(`http://localhost:3005/api/laporan/review`, dataOVerAll, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllAssesmentLaporan()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllAssesmentLaporan()
            })
        }
        

        setLaporanAkhirId('')
        setReviewer('')
        setIdDeleteReviewer("")
    }



    const hendleSearchName = e => {

        e.preventDefault();


        const index = e.target.id;

        axios.get(`http://localhost:3005/api/users?name=${e.target.value}&Role=2`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setListName(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })


        // return console.log(reviewer)
        setReviewer(s => {
            s.nameUser = e.target.value
            return s;
        });
    }

    const hendleSearchNidn = (e) => {

        setListName([])

        // console.log(e.target.innerHTML)

        // console.log(reviewer)


        setReviewer(s => {
            s.nameUser = e.target.innerHTML
            return s;
        });

    }

    const hendleAddInput = () => {
        setReviewer({nameUser: ""})
        // return console.log(reviewer)
    }

    const hendleRemoveInput = (idDelete) => {

        if (idDelete ) {
            setIdDeleteReviewer(idDelete)
            setReviewer({})
        }else{
            setReviewer({})
        }
    }

    const hendleEditReviewerByLaporan = (id) => {
        
        axios.get(`http://localhost:3005/api/laporan/reviewer/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setIdReviewLaporan(res.data.data.id)
            setStatusLaporan(res.data.data.status)
            setRevisi(res.data.data?.komentar)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleSubmitEditNilaiReviewer = () => {

        let data = {
            komentar: revisi,
            status: statusLaporan
        }


        axios.patch(`http://localhost:3005/api/laporan/reviewer/${idReviewLaporan}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            toast(`Berhasil Mengubah Nilai`)
            hendleGetAllAssesmentLaporan()
        }).catch((err) => {
            console.log(err)
        })

        setStatusLaporan()
        setIdReviewLaporan()
        setRevisi()

    } 

    const hendleCloseNilaiReviewer = () => {
        setStatusLaporan([])
        setRevisi()
    }
    // 

    useEffect(() => {
        hendleAccesRoleUser()
        hendleGetAllAssesmentLaporan()
    }, [row, page, searchName])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddTentuReviewer === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                {pathname === '/laporan/tentukan-reviewer' && (
                    <span>Reviewer Keluaran Hasil</span>
                )}
                {pathname === '/reviewer/laporan' && (
                    <span>Penilaian Laporan</span>
                )}
                <div className={style.conTable} >
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
                                {(pathname === '/laporan/tentukan-reviewer' || pathname === '/reviewer/laporan') && (
                                    <>
                                        <th>Skema</th>
                                        <th>Waktu Pelaksanaan</th>
                                    </>
                                )}
                                
                                {id === 1 && (
                                    <>
                                        <th>Pengusul</th>
                                        <th>Reviewer</th>
                                    </>
                                )}
                                {id === 2 && (
                                    <th>Sebagai</th>
                                )}
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pathname === '/reviewer/laporan' && (
                                <>
                                {id === 2 && (
                                    AssesmentLaporan.length !== 0 && (
                                        console.log(AssesmentLaporan),
                                        AssesmentLaporan.map((data,key) => {
                                            return (
                                                console.log(data),
                                                <tr key={key} className={style.forReviewer}>
                                                    <td>{key += 1}</td>
                                                    {data?.judulPenelitian ?
                                                        <td>{data?.judulPenelitian}</td>
                                                        :
                                                        <td>{data?.judulPengabdian}</td>
                                                    }
                                                    {data?.penelitian?.skema ?
                                                        <td>{data?.penelitian?.skema}</td>
                                                        :
                                                        <td>{data?.pengabdian?.skema}</td>
                                                    }
                                                    {data?.penelitian ?
                                                        <td>{`${dateFormat(data?.penelitian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.penelitian?.createdAt, "dd mmm")} ${new Date(data?.penelitian?.createdAt).getFullYear() + Number(data?.penelitian?.lamaKegiatan)}`}</td>
                                                        :
                                                        <td>{`${dateFormat(data?.pengabdian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.pengabdian?.createdAt, "dd mmm")} ${new Date(data?.pengabdian?.createdAt).getFullYear() + Number(data?.pengabdian?.lamaKegiatan)}`}</td>
                                                    }
                                                    <td>Reviewer</td>
                                                    <td>
                                                        {
                                                            <>
                                                                {data?.reviewLaporan.status === 1 && 
                                                                    <p className={style.nonAjukan}>Assesment</p>
                                                                }
                                                                {data?.reviewLaporan.status === 2 && 
                                                                    <p className={style.nonAjukan}>Tidak Memenuhi Luaran</p>
                                                                }
                                                                {data?.reviewLaporan.status === 3 && 
                                                                    <p className={style.nonAjukan}>Memenuhi Luaran</p>
                                                                }
                                                            </>
                                                        }
                                                    </td>
                                                    <td>
                                                        <p>
                                                            {/* {console.log(data)} */}
                                                            {data?.reviewLaporan?.status !== 3 && (
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${hendleEditReviewerByLaporan(data?.id)}}`}>edit</span>
                                                            )}
                                                            {data?.penelitian?.id ?
                                                                <>
                                                                    {console.log(data?.penelitian?.laporanAkhir)}
                                                                    <NavLink className={style.userAddButton} to={`/reviewer/laporan/${data?.penelitian?.laporanAkhir[0].id}`}>
                                                                        <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                                    </NavLink>
                                                                    <span id={data?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                                    {opsiMenu == data?.id && (
                                                                        <div className={style.buttonActionMenu}>
                                                                            <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                                Rreview
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                </>
                                                                :
                                                                <>
                                                                    <NavLink className={style.userAddButton} to={`/reviewer/laporan/${data?.pengabdian?.laporanAkhir[0].id}`}>
                                                                        <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                                    </NavLink>
                                                                    <span id={data?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                                    {opsiMenu == data?.id && (
                                                                        <div className={style.buttonActionMenu}>
                                                                            <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                                Rreview
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            }
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) 
                                
                                )}
                                </>
                            )}
                            {pathname === '/laporan/tentukan-reviewer' && (
                                <>
                                {id === 1 && (
                                    AssesmentLaporan.length !== 0  && (
                                        console.log(AssesmentLaporan),
                                        AssesmentLaporan.map((data,key) => {
                                            return (
                                                    (data.penelitian !== null || data.pengabdian) ?
                                                        <tr key={key} className={style.forAdmin}>
                                                            <td>{key +=1 }</td>
                                                            {data?.penelitian?.judul ?
                                                                <td>{data?.penelitian?.judul}</td>
                                                                :
                                                                <td>{data?.pengabdian?.judul}</td>
                                                            }
                                                            {data?.penelitian?.skema ?
                                                                <td>{data?.penelitian?.skema}</td>
                                                                :
                                                                <td>{data?.pengabdian?.skema}</td>
                                                            }
                                                            {data?.penelitian ? 
                                                                <td>{`${dateFormat(data?.penelitian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.penelitian?.createdAt, "dd mmm")} ${new Date(data?.penelitian?.createdAt).getFullYear() + Number(data?.penelitian?.lamaKegiatan)}`}</td>
                                                                :
                                                                <td>{`${dateFormat(data?.pengabdian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.pengabdian?.createdAt, "dd mmm")} ${new Date(data?.pengabdian?.createdAt).getFullYear() + Number(data?.pengabdian?.lamaKegiatan)}`}</td>
                                                            }
                                                            {data?.partisipasiPenelitian?.nameUser ?
                                                                <td>{data?.partisipasiPenelitian?.nameUser}</td>
                                                                :
                                                                <td>{data?.partisipasiPengabdian?.nameUser}</td>
                                                            }
                                                            <td>
                                                                {/* {console.log(data)} */}
                                                                {data?.reviewLaporan ?
                                                                    <span key={key}>
                                                                        Reviewer: {data?.reviewLaporan?.nameUser}
                                                                    </span>
                                                                    :
                                                                    <>
                                                                        <span>Reviewer: - </span>
                                                                        
                                                                    </>
                                                                }
                                                            </td>
                                                            <td>
                                                                {data.reviewLaporan ? 
                                                                    <p className={style.sedangDiNilai}>Assesment</p>
                                                                :
                                                                    <p className={style.diajukan}>Tentukan Assesment</p>
                                                                }
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    {data.statusLaporan === 0 && (
                                                                        !data.reviewLaporan ?
                                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")}  ${hendleAddTentuReviewer(data.id)} ${setPopupTentuReviewer('TentukanReviewerLaporan')}`}>add</span> 
                                                                            :
                                                                            <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${hendleEditTentuReviewer(data.id)} ${setPopupTentuReviewer('EditReviewerLaporan')}`}>edit</span> 
                                                                        
                                                                    )}
                                                                    <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                                    {/* {console.log(data)} */}
                                                                    {opsiMenu == data.id && (
                                                                        <div className={style.buttonActionMenu}>
                                                                            {/* {console.log(data)} */}
                                                                            {data?.penelitian ? 
                                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                                    Rreview
                                                                                </Link>
                                                                                :
                                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                                    Rreview
                                                                                </Link>
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    : ""
                                            )
                                        })
                                    )
                                )}
                                </>
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
                {id === 1 && (
                    popupAddTentuReviewer === "1" && (
                        <div className={style.containerPopUp}>
                            <div className={style.contentTitle}>
                                <p>Tentukan Reviewer</p>
                                <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("0")} ${hendleCloseTentuReviewer()}`}>close</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <span htmlFor="">Judul : {judul}</span>
                            </div>
                            <div className={`${style.itemPopUp}`}>
                                <p>
                                    <span className={style.addReviewer} onClick={hendleAddInput}>Add Reviewer</span>
                                </p>
                            </div>
                            {/* {console.log(popupTentuReviewer === "EditReviewerLaporan" && reviewer)} */}
                            {(popupTentuReviewer === "EditReviewerLaporan" && reviewer) && (
                                console.log(reviewer),
                                reviewer.nameUser !== undefined &&
                                    <div className={style.itemPopUp}>
                                        <div className={style.search}>
                                            <label htmlFor="">{`Reviewer`}</label>
                                            <div>
                                                <input type="text" id={reviewer.id} value={reviewer?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)}`}/>
                                                {console.log(reviewer.id)}
                                                <span id={reviewer.id} className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput(reviewer.id)}>delete</span>
                                            </div>
                                        </div>
                                        <ul className={style.listName}>
                                            {listName.length !== 0 && (
                                                listName.map((data, key) => {
                                                    return (
                                                        <li key={key} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                    )
                                                })
                                            )}
                                        </ul>
                                    </div>
                            )}
                            {popupTentuReviewer === "TentukanReviewerLaporan" && (
                                console.log(reviewer.nameUser),
                                reviewer.nameUser !== undefined &&
                                    <div className={style.itemPopUp}>
                                        <div className={style.search}>
                                            <label htmlFor="">{`Reviewer`}</label>
                                            <div>
                                                <input type="text" value={reviewer?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)}`}/>
                                                <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput()}>delete</span>
                                            </div>
                                        </div>
                                        <ul className={style.listName}>
                                            {listName.length !== 0 && (
                                                listName.map((data, key) => {
                                                    return (
                                                        <li key={key} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                    )
                                                })
                                            )}
                                        </ul>
                                    </div>
                            )}
                                    
                            <div className={style.conSubmit}>
                                <input type="button" value="Submit" onClick={() => `${hendleSubmitTentuReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                            </div>
                        </div>
                    )
                )}
                {id === 2 && (
                    popupAddTentuReviewer === "1" && (
                        <>
                        {pathname === '/reviewer/laporan' && (
                            <div className={style.containerPopUpReviewer}>
                                <div className={style.contentTitle}>
                                    <p>Tentukan Nilai </p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("0")} ${hendleCloseNilaiReviewer()}`}>close</span>
                                </div>
                                    <div className={style.itemPopUp}>
                                        <div>
                                            <label htmlFor="">Luaran Sesuai dengan target yang dijanjikan<span className={style.wajib}>*</span></label>
                                        </div>
                                        <div>
                                            <select name=""value={statusLaporan}  onChange={(e) => setStatusLaporan(e.target.value)}>
                                                <option>-- Pilih Nilai --</option>
                                                <option value={3}>Sesuai</option>
                                                <option value={2}>Tidak</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={style.revisi}>
                                            <div>
                                                <label htmlFor="">Komentar :</label>
                                            </div>
                                            <div>
                                                <textarea style={{padding: "3px"}} name="" id="" cols="30" rows="10" value={revisi !== null ? revisi : ""}  onChange={(e) => setRevisi(e.target.value)}></textarea>
                                            </div>
                                    </div>
                                    <div className={style.conSubmit}>
                                        <input type="button" value="Submit" onClick={() => `${hendleSubmitEditNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                                    </div>
                            </div>
                        )}
                        </>
                    )
                )}
            </div>
            </div>
        </div>
    )
}

export default TentukanReviwer