import { useState } from "react"
import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidenar"
import style from './TabelNilai.module.css'
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import dateFormat from "dateformat"



function TabelNilai() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [dataPenelitian, setDataPenelitian] = useState([])
    const [dataPengabdian, setDataPengabdian] = useState([])
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)
    const {pathname} = useLocation()


    const hendleMenuOpsi = (e) => {
        e.preventDefault()
        console.log(e)

        if (e.target.id !== "0") {
            opsiMenu === e.target.id ? setOpsiMenu("0") : setOpsiMenu(e.target.id)
        }else{
            setOpsiMenu("0")
        }
    }


    const getAllPenelitian = () => {
        axios.get(`http://localhost:3005/api/penelitian/nilai?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataPenelitian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const getAllPengabdian = () => {
        axios.get(`http://localhost:3005/api/pengabdian/nilai?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataPengabdian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        getAllPenelitian()
        getAllPengabdian()
    }, [])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                {/* {console.log(pathname)} */}
                {/* {pathname === "/data-penelitian/Keangotaan" && (
                    <span>Daftar Keanggotan Penelitian</span>
                )}
                {pathname === "/data-pengabdian/Keangotaan" && (
                    <span>Daftar Keanggotan Pengabdian</span>
                )} */}
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
                                {pathname === "/data-penelitian/nilai" && (
                                    <th>Skema Penelitian</th>
                                    )}
                                {pathname === "/data-pengabdian/nilai" && (
                                    <th>Skema Pengabdian</th>
                                )}
                                <th>Waktu Penelitian</th>
                                <th>R1</th>
                                <th>R2</th>
                                <th>R3</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pathname === "/data-penelitian/nilai" && (
                                dataPenelitian.length !== 0 && (
                                    dataPenelitian.map((data, key) => {
                                        console.log(data)
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.penelitian?.judul}</td>
                                                <td>{data?.penelitian?.skema}</td>
                                                <td>{`${dateFormat(data?.penelitian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.penelitian?.createdAt, "dd mmm")} ${new Date(data?.penelitian?.createdAt).getFullYear() + Number(data?.penelitian?.lamaKegiatan)}`}</td>
                                                <td>{data?.nilaiPenelitian[0]?._sum?.nilai}</td>
                                                <td>{data?.nilaiPenelitian[1]?._sum?.nilai}</td>
                                                <td>{data?.nilaiPenelitian[2]?._sum?.nilai}</td>
                                                <td>
                                                    {data?.penelitian?.statusPenelitian === 3 && 
                                                        <p className={style.dibiayai}>Assesment</p>
                                                    } 
                                                    {data?.penelitian?.statusPenelitian === 4 && 
                                                        <p className={style.gagaldibiayai}>Tidak Dibiayai</p>
                                                    } 
                                                    {data?.penelitian?.statusPenelitian === 5 && 
                                                        <p className={style.dibiayai}>Penelitian Dibiayai</p>
                                                    }
                                                    {data?.penelitian?.statusPenelitian === 6 && 
                                                        <p className={style.dibiayai}>Assesment Luaran</p>
                                                    }  
                                                </td>
                                                <td>
                                                    <div>
                                                        {/* <Link to={`/data-penelitian/${data?.penelitian?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link> */}
                                                        {console.log(data?.penelitian?.id)}
                                                        <span id={data?.penelitian?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data?.penelitian?.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {/* {console.log(data)} */}
                                                                {data?.nilaiPenelitian.length !== 0 && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-penelitian/nilaiPenelitian/${data?.penelitian?.id}`}>
                                                                        Detail Nilai 
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
                                {pathname === "/data-pengabdian/nilai" && (
                                    console.log(dataPengabdian),
                                dataPengabdian.length !== 0 && (
                                    dataPengabdian.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.pengabdian?.judul}</td>
                                                <td>{data?.pengabdian?.skema}</td>
                                                <td>{`${dateFormat(data?.pengabdian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.pengabdian?.createdAt, "dd mmm")} ${new Date(data?.pengabdian?.createdAt).getFullYear() + Number(data?.pengabdian?.lamaKegiatan)}`}</td>
                                                <td>{data?.nilaiPengabdian[0]?._sum?.nilai}</td>
                                                <td>{data?.nilaiPengabdian[1]?._sum?.nilai}</td>
                                                <td>{data?.nilaiPengabdian[2]?._sum?.nilai}</td>
                                                <td>
                                                    {data?.pengabdian?.statusPengabdian === 3 && 
                                                        <p className={style.dibiayai}>Assesment</p>
                                                    } 
                                                    {data?.pengabdian?.statusPengabdian === 4 && 
                                                        <p className={style.gagaldibiayai}>Tidak Dibiayai</p>
                                                    } 
                                                    {data?.pengabdian?.statusPengabdian === 5 && 
                                                        <p className={style.dibiayai}>Pengabdian Dibiayai</p>
                                                    } 
                                                     {data?.pengabdian?.statusPengabdian === 6 && 
                                                        <p className={style.dibiayai}>Assesment Luaran</p>
                                                    }  
                                                </td>
                                                <td>
                                                    <div>
                                                        {/* <Link to={`/data-pengabdian/${data?.pengabdian?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link> */}
                                                        {console.log(data?.pengabdian?.id)}
                                                        <span id={data?.pengabdian?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data?.pengabdian?.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {/* {console.log(data)} */}
                                                                {data?.nilaiPengabdian.length !== 0 && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-pengabdian/nilaiPengabdian/${data?.pengabdian?.id}`}>
                                                                        Detail Nilai 
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

export default TabelNilai