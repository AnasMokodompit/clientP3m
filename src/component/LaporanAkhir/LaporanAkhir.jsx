import Sidebar from '../sidebar/Sidenar'
import style from './LaporanAkhir.module.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import dateFormat from "dateformat"
import jwt from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar'



function  LaporanAkhir() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    // const {optionsPdf} = useSelector(tes => tes.dataPdf)
    const [dataLaporanAkhir, setDataLaporanAkhir] = useState([])
    const [roleId, setRoleId] = useState()
    const [opsiMenu, setOpsiMenu] = useState("0")
    const {pathname} = useLocation()
    const [popupAddLaporanAkhir, setPopupAddLaporanAkhir] = useState('')
    const [nameDocPdf, setNameDocPdf] = useState('')
    const [judul, setJudul] = useState('')
    const [pdf, setPdf] = useState({})
    const [popupLaporanAkhir, setPopupLaporanAkhir] = useState('0')
    const [poupKomentarRevisi, setPoupKomentarRevisi] = useState("")
    const [revisi, setRevisi] = useState('')
    const [dataPenelitianDisetujuiUsulan, setDataPenelitianDisetujuiUsulan] = useState([])
    const [dataPengabdianDisetujuiUsulan, setDataPengabdianDisetujuiUsulan] = useState([])
    const [id, setId] = useState()
    const [idUser, setIdUser] = useState('')
    const [popupReadLaporanAkhir, setPopupReadLaporanAkhir] = useState('')
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)


    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setIdUser(decode.id) 
        setRoleId(decode.roleId) 
    }


    const getAllDataLaporanAkhir = () => {
        axios.get(`http://localhost:3005/api/laporan/akhir?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahData(res.data.data.length)
            setDataLaporanAkhir(res.data.data)
            // console.log(res.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleReadLaporanAkhir = (id) => {
        axios.get(`http://localhost:3005/api/laporan/akhir/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            // setTahun(res.data.data?.tahun)
            if (res.data.data?.judulPenelitian) {
                setJudul(res.data.data?.judulPenelitian)
            }else{
                setJudul(res.data.data?.judulPengabdian)
            }
            setNameDocPdf(res.data.data?.Dokumen?.namePdf)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllPenelitianByStatusPenelian = () => {
        axios.get(`http://localhost:3005/api/penelitian/laporan?statusPenelitian=5`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            // console.log(res.data.data)
            setDataPenelitianDisetujuiUsulan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllPengabdianByStatusPengabdian = () => {
        axios.get(`http://localhost:3005/api/pengabdian/laporan?statusPengabdian=5`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            // console.log(res.data.data)
            setDataPengabdianDisetujuiUsulan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleMenuOpsi = (e) => {
        e.preventDefault()

        if (e.target.id !== "0") {
            opsiMenu === e.target.id ? setOpsiMenu("0") : setOpsiMenu(e.target.id)
        }else{
            setOpsiMenu("0")
        }
    }

    const hendleCloseLaporanAkhir = () => {
        setJudul('')
        setNameDocPdf('')
    }

    const uploadPdf = (e) => {
        setNameDocPdf(e?.target.files[0]?.name)

        setPdf({
            pdfPreview: URL.createObjectURL(e.target.files[0]),
            pdfAsFile: e.target.files[0]
        })

    }

    const hendleSubmitLaporanAkhir = () => {

        if (popupLaporanAkhir === "TambahLaporanAkhir") {

            
            const formData = new FormData()
            
            formData.append('judul', judul)
            formData.append('laporan_akhir_pdf', pdf.pdfAsFile)

            formData.forEach((value,key) => {
                console.log(key+" "+value)
              });

            axios.post(`http://localhost:3005/api/laporan/akhir`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                getAllDataLaporanAkhir()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
            })
        }else{

            const formData = new FormData()
            
            formData.append('judul', judul)
            formData.append('laporan_akhir_pdf', pdf.pdfAsFile)
   
            axios.patch(`http://localhost:3005/api/laporan/akhir/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}} )
            .then(() => {
                getAllDataLaporanAkhir()
            }).catch((err) => {
                console.log(err)
            })
        }

        setJudul('')
        setPdf({})
        setNameDocPdf('')
    }

    const hendleEditLaporanAkhir = (id) => {

        setId(id)
        axios.get(`http://localhost:3005/api/laporan/akhir/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            if (res.data.data.judulPenelitian) {
                setJudul(res.data.data.judulPenelitian)
            }else{
                setJudul(res.data.data.judulPengabdian)
            }
            setNameDocPdf(res.data.data?.Dokumen?.namePdf)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleDeleteLaporanAkhir = (id) => {
        axios.delete(`http://localhost:3005/api/laporan/akhir/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            getAllDataLaporanAkhir()
        }).catch((err) => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        hendleAccesRoleUser()
        getAllPenelitianByStatusPenelian()
        getAllPengabdianByStatusPengabdian()
        getAllDataLaporanAkhir()

    }, [row, page, searchName])
    return (
        <div className={style.container}>
            <Sidebar/>
                <div className={style.kanan}>
                    <Navbar/>
                    <div className={`${(popupAddLaporanAkhir === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
                    </div>
                    <div className={style.content}>
                        <ToastContainer/>
                        {/* <input type="file" id="file" multiple hidden  onChange={uploadPicture}/>
                        <label htmlFor="file">Tes</label> */}
                        {/* {pathname === "/data-penelitian/revisi" && ( */}
                            <div className={style.conTable} onClick={(e) => hendleMenuOpsi(e)}>
                                <div className={style.buttonCreate}>
                                    {(roleId !== 1  && roleId !== 4) && (
                                        <NavLink className={style.userAddButton} to="/laporan-akhir/add">Tambah Data</NavLink>
                                    )}
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
                                            <input type="text" value={searchName} placeholder='Search Name' onChange={(e) => setSearchName(e.target.value)}/>
                                            <span className="material-symbols-outlined">search</span>
                                        </div>
                                    </div>
                                </div>    
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Judul</th>
                                            <th>Skema</th>
                                            <th>Waktu</th>
                                            <th>File Laporan Akhir</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roleId !== 1 ?
                                            dataLaporanAkhir.length !== 0 && (
                                                dataLaporanAkhir.map((data, key) => {
                                                    console.log(data)
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key += 1}</td>
                                                            {data?.penelitian && (
                                                                <>
                                                                <td>{data?.penelitian?.judul}</td>
                                                                <td>{data?.penelitian?.skema}</td>
                                                                </>
                                                            )}
                                                            {data?.pengabdian && (
                                                                <>
                                                                <td>{data?.pengabdian?.judul}</td>
                                                                <td>{data?.pengabdian?.skema}</td>
                                                                </>
                                                            )}
                                                            <td>{dateFormat(data.updatedAt, "dd mmm yyyy")}</td>
                                                            <td className={style.stylePdf}>
                                                                {data?.penelitian && (
                                                                    <Link to={`/data-penelitian/revisi/reviewPdf/${data?.Dokumen?.id}`}>{data?.Dokumen?.namePdf}</Link>
                                                                )}
                                                                {data?.pengabdian && (
                                                                    <Link to={`/data-pengabdian/revisi/reviewPdf/${data?.Dokumen?.id}`}>{data?.Dokumen?.namePdf}</Link>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {roleId === 3 && (
                                                                    console.log(data),
                                                                    (data?.reviewLaporan !== null && data?.reviewLaporan.komentar !== null) && (
                                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPoupKomentarRevisi("1")} ${setRevisi(data?.reviewLaporan?.komentar)}`}>comment</span>
                                                                    )
                                                                )}
                                                                {roleId !== 4 && (
                                                                    (data?.partisipasiPenelitian?.user?.id === idUser || data?.partisipasiPengabdian?.user?.id === idUser) ? (
                                                                        
                                                                        <>     
                                                                            <NavLink className={style.userAddButton} to={`/laporan-akhir/${data.id}`}>
                                                                                <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                            </NavLink>
                                                                            {data.reviewLaporan?.status === 2 && (
                                                                                <NavLink className={style.userAddButton} to={`/laporan-akhir/Edit/${data.id}`}>
                                                                                    <span className={`${style.iconOptions} ${style.icon1} material-symbols-outlined`}>edit</span>
                                                                                </NavLink>
                                                                            )}
                                                                            {data?.penelitian?.statusPenelitian == 5 || data?.pengabdian?.statusPengabdian == 5 && (
                                                                                <>
                                                                                     <NavLink className={style.userAddButton} to={`/laporan-akhir/Edit/${data.id}`}>
                                                                                        <span className={`${style.iconOptions} ${style.icon1} material-symbols-outlined`}>edit</span>
                                                                                    </NavLink>
                                                                                    <span className={`${style.iconOptions} ${style.icon2} material-symbols-outlined`} onClick={() => hendleDeleteLaporanAkhir(data?.id)}>delete</span>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    ):
                                                                    <NavLink className={style.userAddButton} to={`/laporan-akhir/${data.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                    </NavLink>
                                                                )}
                                                                {roleId === 4 && (
                                                                    <NavLink className={style.userAddButton} to={`/laporan-akhir/${data.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                    </NavLink>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ): dataLaporanAkhir.length !== 0 && (
                                                dataLaporanAkhir.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key += 1}</td>
                                                            {data?.penelitian && (
                                                                <>
                                                                <td>{data?.penelitian?.judul}</td>
                                                                <td>{data?.penelitian?.skema}</td>
                                                                </>
                                                            )}
                                                            {data?.pengabdian && (
                                                                <>
                                                                <td>{data?.pengabdian?.judul}</td>
                                                                <td>{data?.pengabdian?.skema}</td>
                                                                </>
                                                            )}
                                                            <td>{dateFormat(data.updatedAt, "dd mmm yyyy")}</td>
                                                            <td className={style.stylePdf}>
                                                                {console.log(data?.dokumenPenelitian?.urlPdf)}
                                                                {data?.penelitian && (
                                                                    <Link to={`/data-penelitian/revisi/reviewPdf/${data?.Dokumen?.id}`}>{data?.Dokumen?.namePdf}</Link>
                                                                )}
                                                                {data?.pengabdian && (
                                                                    <Link to={`/data-pengabdian/revisi/reviewPdf/${data?.Dokumen?.id}`}>{data?.Dokumen?.namePdf}</Link>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <>   
                                                                    <NavLink className={style.userAddButton} to={`/laporan-akhir/${data.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                    </NavLink>
                                                                    <NavLink className={style.userAddButton} to={`/laporan-akhir/Edit/${data.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon1} material-symbols-outlined`}>edit</span>
                                                                    </NavLink>
                                                                    <span className={`${style.iconOptions} ${style.icon2} material-symbols-outlined`} onClick={() => hendleDeleteLaporanAkhir(data?.id)}>delete</span>
                                                                </>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
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
                        {/* )} */}
                        {poupKomentarRevisi === "1" && (
                             <div className={style.containerPopUpReviewer}>
                                <div className={style.contentPopUpReviewer}>
                                <div className={style.contentTitle}>
                                    <p>Komentar Laporan</p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPoupKomentarRevisi("0")}`}>close</span>
                                </div>
                                <div className={style.revisi}>
                                        <div>
                                            <p>{revisi}</p>
                                        </div>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </div>
    )   
}

export default LaporanAkhir