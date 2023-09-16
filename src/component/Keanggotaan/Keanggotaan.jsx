import { useState } from 'react'
import style from './Keanggotaan.module.css'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import jwt from 'jwt-decode';



function Keaggotaan() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [dataPenelitian, setDataPenelitian] = useState([])
    const [dataPengabdian, setDataPengabdian] = useState([])
    const [judul, setJudul] = useState('')
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)
    const {pathname} = useLocation()


    const hendleCekProfile = (id, opsi, judul) => {
        const decode = jwt(dataLogin.dataLogin.token)

        axios.get(`http://localhost:3005/api/users/${decode.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            if (!res.data.data?.username || !res.data.data?.name || !res.data.data?.nomor_tlp || !res.data.data?.jurusanId || !res.data.data?.prodiId || !res.data.data?.email || !res.data.data?.pendidikan_terakhir || !res.data.data?.jabatan_fungsional || !res.data.data?.sinta || !res.data.data?.jnsKelaminName || !res.data.data?.tempat_lahir || !res.data.data?.alamat || !res.data.data?.tanggalLahir || !res.data.data?.profile_picture || (!res.data.data?.nidn && !res.data.data?.nim)) {
                alert('Data User Belum Di Lengkapi')
            }else{
                if (pathname == "/data-pengabdian/Keangotaan") {
                    if (opsi == 1) {
                        hendleUpdateStatusPartisipasiPengabdian(id, opsi, judul)
                    }else{
                        hendleUpdateStatusPartisipasiPengabdian(id, opsi, judul)
                    } 
                }else{
                    if (opsi == 1) {
                        hendleUpdateStatusPartisipasiPenelitian(id, opsi, judul)
                    }else{
                        hendleUpdateStatusPartisipasiPenelitian(id, opsi, judul)
                    } 

                }
            }
        })
    }


    // Penelitian
    const getAllDataPenelitian = () => {
        axios.get(`http://localhost:3005/api/penelitian/keanggotaan?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPenelitian(res.data.data)
            console.log(res.data.data)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleUpdateStatusPartisipasiPenelitian = (id, statusPartisipasi, judul) => {

        // console.log(id, judul, statusPartisipasi)
        axios.patch(`http://localhost:3005/api/penelitian/statusPartisipasi/${id}`, 
            {statusPartisipasi:statusPartisipasi, judul:judul},
            { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((tes) => {
            getAllDataPenelitian()
        }).catch((err) => {
            console.log(err)
        })
    }


    // Pengabdian
    const getAllDataPengabdian = () => {
        axios.get(`http://localhost:3005/api/pengabdian/keanggotaan?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPengabdian(res.data.data)
            console.log(res.data.data)
        }).catch((err)=> {
            console.log(err)
        })
    }

    const hendleUpdateStatusPartisipasiPengabdian = (id, statusPartisipasi, judul) => {

        // console.log(id, judul, statusPartisipasi)
        axios.patch(`http://localhost:3005/api/pengabdian/statusPartisipasi/${id}`, 
            {statusPartisipasi:statusPartisipasi, judul:judul},
            { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((tes) => {
            getAllDataPengabdian()
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
        if (pathname === "/data-penelitian/Keangotaan") {
            getAllDataPenelitian()
        }else{
            getAllDataPengabdian()
        }
    },[row, page, searchName])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                {/* {console.log(pathname)} */}
                {pathname === "/data-penelitian/Keangotaan" && (
                    <span>Daftar Keanggotan Penelitian</span>
                )}
                {pathname === "/data-pengabdian/Keangotaan" && (
                    <span>Daftar Keanggotan Pengabdian</span>
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
                                {pathname === "/data-penelitian/Keangotaan" && (
                                    <th>Skema Penelitian</th>
                                    )}
                                {pathname === "/data-pengabdian/Keangotaan" && (
                                    <th>Skema Pengabdian</th>
                                )}
                                <th>Pengusul</th>
                                <th>Peran Anggota</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pathname === "/data-penelitian/Keangotaan" && (
                                dataPenelitian.length !== 0 && (
                                    dataPenelitian.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.penelitian?.judul}</td>
                                                <td>{data?.penelitian?.skema}</td>
                                                <td>{data?.DataKetuaPenelitian?.nameUser}</td>
                                                <td>{data?.jabatan}</td>
                                                <td>
                                                    {data?.statusPartisipasi === 0 && (
                                                        <p className={style.nonAjukan}>Menunggu Persetujuan</p>
                                                    )}
                                                    {data?.statusPartisipasi === 1 && (
                                                        <p className={style.diajukan}>Setuju</p>
                                                    )}
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link to={`/data-penelitian/${data?.penelitian?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        {data?.statusPartisipasi === 0 && (
                                                            <>
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${hendleCekProfile(data.id, 1, data.judulPenelitian)}`} >done</span>
                                                                <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`}  onClick={() => ` ${hendleCekProfile(data.id, 2, data.judulPenelitian)}`}>close</span>
                                                            </>
                                                        )}
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {console.log(data)}
                                                                {data?.penelitian?.nilaiPenelitian.length !== 0 && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-penelitian/nilaiPenelitian/${data?.penelitian?.id}`}>
                                                                        Nilai 
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                                )}
                            {pathname === "/data-pengabdian/Keangotaan" && (
                                dataPengabdian.length !== 0 && (
                                    dataPengabdian.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.pengabdian?.judul}</td>
                                                <td>{data?.pengabdian?.skema}</td>
                                                <td>{data?.DataKetuaPengabdian?.nameUser}</td>
                                                <td>{data?.jabatan}</td>
                                                <td>
                                                    {data?.statusPartisipasi === 0 && (
                                                        <p className={style.nonAjukan}>Menunggu Persetujuan</p>
                                                    )}
                                                    {data?.statusPartisipasi === 1 && (
                                                        <p className={style.diajukan}>Setuju</p>
                                                    )}
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link to={`/data-pengabdian/${data?.pengabdian?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        {data?.statusPartisipasi === 0 && (
                                                            <>
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${hendleCekProfile(data.id, 1, data.judulPengabdian)}`} >done</span>
                                                                <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`}  onClick={() => `${hendleCekProfile(data.id, 2, data.judulPengabdian)}`}>close</span>
                                                            </>
                                                        )}
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {console.log(data)}
                                                                {data?.pengabdian?.nilaiPengabdian.length !== 0 && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-pengabdian/nilaiPengabdian/${data?.pengabdian?.id}`}>
                                                                        Nilai 
                                                                    </Link>
                                                                )}
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

export default Keaggotaan