import Sidebar from "../sidebar/Sidenar"
import Navbar from "../navbar/Navbar"
import style from './Penjadwalan.module.css'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import dateFormat from "dateformat"

function Penjadwalan() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [popupAddPenjadwalan, setPopupAddPenjadwalan] = useState('')
    const [popupPenjadwalan, setPopupPenjadwalan] = useState('')
    const [judulJadwal, setJudulJadwal] = useState('')
    const [tglMulai, setTglMulai] = useState("")
    const [tglAkhir, setTglAkhir] = useState("")
    const [keterangan, setKeterangan] = useState()
    const [jadwalp3m, setJadwalp3m] = useState([])
    const [id, setId] = useState()
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchJudulJadwal, setSearchJudulJadwal] = useState('')
    const [jumlahData, setJumlahData] = useState(0)


    const hendleGetAllJadwalp3m = () => {
        axios(`http://localhost:3005/api/penJadwalan?page=${page}&row=${row}&searchJudulJadwal=${searchJudulJadwal}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahData(res.data.data.length)
            setJadwalp3m(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleClosePenjadwalan = () => {
        setJudulJadwal('')
        setTglMulai('')
        setTglAkhir('')
        setKeterangan('')
    }

    const hendleEditPenjadwalan = (id) => {
        setId(id)
        axios.get(`http://localhost:3005/api/penJadwalan/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setJudulJadwal(res.data.data.jadwalJudul)
            setTglMulai(dateFormat(res.data.data.tglMulai, "yyyy-mm-dd HH:MM:ss"))
            setTglAkhir(dateFormat(res.data.data.tglAkhir, "yyyy-mm-dd HH:MM:ss"))
            setKeterangan(res.data.data.keterangan)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDeletePenjadwalan = (id) => {
        axios.delete(`http://localhost:3005/api/penJadwalan/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            hendleGetAllJadwalp3m()
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitPenjadwalan = () => {

        const dateMulai = new Date(tglMulai).toISOString()
        const dateAkhir = new Date(tglAkhir).toISOString()
        // return console.log(dateMulai)
        
        if (popupPenjadwalan === 'TambahPenjadwalan') {

            const dataCreatePenjadwalan = {
                jadwalJudul: judulJadwal,
                tglMulai: dateMulai,
                tglAkhir: dateAkhir,
                keterangan: keterangan
            }

            axios.post(`http://localhost:3005/api/penJadwalan` ,dataCreatePenjadwalan, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllJadwalp3m()
            }).catch((err) => {
                console.log(err)
            })

        }else{
            const dataUpdatePenjadwalan = {
                jadwalJudul: judulJadwal,
                tglMulai: dateMulai,
                tglAkhir: dateAkhir,
                keterangan: keterangan
            }

            axios.patch(`http://localhost:3005/api/penJadwalan/${id}` ,dataUpdatePenjadwalan, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllJadwalp3m()
            }).catch((err) => {
                console.log(err)
            })
        }

        setJudulJadwal('')
        setTglMulai('')
        setTglAkhir('')
        setKeterangan('')

    }

    useEffect(() => {
        hendleGetAllJadwalp3m()
    }, [row, page, searchJudulJadwal])



    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <div className={`${(popupAddPenjadwalan === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                <span>Penjadwalan</span>
                <div className={style.conTable} >
                    <div className={style.buttonCreate}>
                        <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddPenjadwalan("1")} ${setPopupPenjadwalan("TambahPenjadwalan")} `} value="Tambah Data" />
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
                                <input type="text" value={searchJudulJadwal} placeholder='Search judul jadwal' onChange={(e) => setSearchJudulJadwal(e.target.value)}/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>    
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Judul Jadwal</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Berakhir</th>
                                <th>Keterangan</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalp3m.length !== 0 && (
                                jadwalp3m.map((data,key) => {
                                    return (
                                        <tr key={key} className={style.forAdmin}>
                                            <td>{key += 1}</td>
                                            <td>{data?.jadwalJudul}</td>
                                            {console.log(data.tglMulai, data.tglAkhir)}
                                            <td>{dateFormat(data?.tglMulai, "dd mmm yyyy, HH:MM")}</td>
                                            <td>{dateFormat(data?.tglAkhir, "dd mmm yyyy, HH:MM")}</td>
                                            <td>{data?.keterangan}</td>
                                            <td>
                                                <p>
                                                <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddPenjadwalan("1")} ${hendleEditPenjadwalan(data.id)} ${setPopupPenjadwalan("EditPenjadwalan")}`}>edit</span> 
                                                <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${handleDeletePenjadwalan(data.id)}`} >delete</span>
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                    <div className={style.pagenation}>
                        <span>Showing {jumlahData === 0 ? jumlahData : 1} to {jumlahData} of entries</span>
                        <div className={style.page}>
                            <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)}>chevron_left</span>
                            <span className={`${style.number}`}>{page}</span>
                            <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                        </div>
                    </div>
                </div>
                {popupAddPenjadwalan === "1" && (
                    <div className={style.containerPopUp}>
                        <div className={style.contentTitle}>
                            <p>Atur Jadwal</p>
                            <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddPenjadwalan("0")} ${hendleClosePenjadwalan()}`}>close</span>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Judul Jadwal</label>
                            <select name="" id="" value={judulJadwal} onChange={(e) => setJudulJadwal(e.target.value)}>
                                <option>Pilih Jadwal</option>
                                <option value="Pemasukan Usulan">Pemasukan Usulan</option>
                                <option value="Pemasukan Usulan Proposal">Pemasukan Usulan Proposal</option>
                                <option value="Penilaian Usulan">Penilaian Usulan</option>
                            </select>
                            {/* <input type="text" value={judulJadwal} onChange={(e) => setJudulJadwal(e.target.value)}/> */}
                        </div>
                        <div className={style.horizontal}>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Tanggal Mulai</label>
                                <input type="datetime-local" value={tglMulai} onChange={(e) => setTglMulai(e.target.value)}/>
                            </div>
                            <div className={style.itemPopUp}>
                                <label htmlFor="">Tanggal Akhir</label>
                                <input type="datetime-local" value={tglAkhir} onChange={(e) => setTglAkhir(e.target.value)}/>
                            </div>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Keterangan</label>
                            <textarea name="" id="" cols="30" rows="10" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
                        </div>
                        <div className={style.conSubmit}>
                            <input type="button" value="Submit" onClick={() => `${hendleSubmitPenjadwalan()} ${setPopupAddPenjadwalan("0")}`}/>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}

export default Penjadwalan