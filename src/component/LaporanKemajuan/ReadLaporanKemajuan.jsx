import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidenar'
import style from './ReadLaporanKemajuan.module.css'
import { ToastContainer, toast } from "react-toastify"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


function ReadLaporanKemajuan() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const idEdit = useParams()
    const [judul, setJudul] = useState('')
    const [tambahBiaya, setTambahBiaya] = useState([])
    const [urlJurnal, setUrlJurnal] = useState('')
    const [DocPdf, setDocPdf] = useState('')


    const hendleEditLaporanKemajuan = () => {
        axios.get(`http://localhost:3005/api/laporan/kemajuan/${idEdit.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            if (res.data.data.judulPenelitian) {
                setJudul(res.data.data.judulPenelitian)
            }else{
                setJudul(res.data.data.judulPengabdian)
            }
            setTambahBiaya(res.data.data.biayaKegiatan)
            setUrlJurnal(res.data.data.URLJurnal)
            setDocPdf(res.data.data?.Dokumen)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        hendleEditLaporanKemajuan()
    },[])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
                <Navbar/>
                <div className={style.content}>
                    <ToastContainer/>
                    <span>Laporan Kemajuan</span>
                    <div className={style.containerr}>
                        <div className={style.contentItem}>
                            <p  className={style.jdul}>Monev 70%</p>
                            <div className={style.indetiUsulan}>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Judul Penelitian / Pengabdian</label>
                                    <span>{judul}</span>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Biaya Kegiatan</label>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Uraian</th>
                                                <th>Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tambahBiaya.length !== 0 && (
                                                tambahBiaya.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{data.uraian}</td>
                                                            <td>{data.jumlah}</td>
                                                        </tr>
                                                    )
                                                })
                                            )}
                                            {console.log(tambahBiaya)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">URL Jurnal Penelitian / Pengabdian</label>
                                    <span className={style.url} onClick={()=>window.open(`${urlJurnal}`,'_blank')}>{urlJurnal}</span>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Laporan Kemajuan</label>
                                    <NavLink className={style.stylePdf} to={`/data-penelitian/revisi/reviewPdf/${DocPdf?.id}`}>{DocPdf?.namePdf}</NavLink>
                                    {/* <span>{DocPdf.urlPdf}</span> */}
                                </div>
                                <div className={style.createButtton}>
                                    <NavLink to="/laporan-kemajuan">
                                        <input type="button" className={style.newUserButtonBack} value="Kembali" /> 
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadLaporanKemajuan
