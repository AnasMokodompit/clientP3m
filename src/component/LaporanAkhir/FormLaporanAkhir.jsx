import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidenar'
import style from './FormLaporanAkhir.module.css'
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


function FormLaporanAkhir() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const idEdit = useParams()
    const [idDeleteBiaya, setIdDeleteBiaya] = useState([])
    const [dataPenelitianDisetujuiUsulan, setDataPenelitianDisetujuiUsulan] = useState([]) 
    const [dataPengabdianDisetujuiUsulan, setDataPengabdianDisetujuiUsulan] = useState([]) 
    const [judul, setJudul] = useState('')
    const [tambahBiaya, setTambahBiaya] = useState([])
    const [uraian , setUraian] = useState('')
    const [jumlah, setJumlah] = useState('')
    const [urlJurnal, setUrlJurnal] = useState('')
    const [nameDocPdf, setNameDocPdf] = useState('')
    const [pdf, setPdf] = useState({})
    const navigate = useNavigate()
    const [dataKemajuan, setDataKemajuan] = useState([])


    

    const getAllPenelitianByStatusPenelian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/laporan?statusPenelitian=3`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPenelitianDisetujuiUsulan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        
    }
    const getAllPengabdianByStatusPengabdian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/laporan?statusPengabdian=3`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPengabdianDisetujuiUsulan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleCekLaporanKemajuan = (searchName) => {
        axios.get(`${process.env.REACT_APP_BASE_API}/laporan/kemajuan?searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataKemajuan(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleAddInput = () => {
        setTambahBiaya(s => {
            return [
                ...s, {uraian: '', jumlah: ''}
            ]
        })
        
        return console.log(tambahBiaya)
    }

    const hendleRemoveInput = (key, idDelete) => {
            if (idDelete ) {
                setIdDeleteBiaya(s => { return [...s, idDelete]})
            }

            if (tambahBiaya.length !== 0 ) {
                setTambahBiaya(tambahBiaya.filter((item, i) => i !== key))
            }
        // }
    }

    const hendleUpdateDataUrain = (e) => {

        e.preventDefault();
        
        const index = e.target.id;

        setTambahBiaya(s => {
        s[index].uraian = e.target.value;
        return s;
        });

 
    }

    const hendleUpdateDataJumlah = e => {
        e.preventDefault();

        const index = e.target.id;


        setTambahBiaya(s => {
        s[index].jumlah = e.target.value;
            return s;
        });
    }

    const hendleSubmitLaporanAkhir = () => {
            const formData = new FormData()
            
            formData.append('judul', judul)
            formData.append('laporan_akhir_pdf', pdf.pdfAsFile)
            formData.append('url_jurnal', urlJurnal)

            tambahBiaya.map((data, i) => {

                if (data.id) {
                    formData.append(`biayaLuaran[${i}][id]`, Number(data.id))
                    formData.append(`biayaLuaran[${i}][uraian]`, data.uraian)
                    formData.append(`biayaLuaran[${i}][jumlah]`, data.jumlah)
                }else{
                    formData.append(`biayaLuaran[${i}][uraian]`, data.uraian)
                    formData.append(`biayaLuaran[${i}][jumlah]`, data.jumlah)
                }
            })
            
            if (idDeleteBiaya.length !== 0) {
                idDeleteBiaya.map((data, i) => {
                    formData.append(`idDeleteBiaya[${i}]`, Number(data))
                })
            }

            
            console.log(tambahBiaya, idDeleteBiaya)

            // return 

        if (pathname === `/laporan-akhir/Edit/${idEdit.id}`) {
            axios.patch(`${process.env.REACT_APP_BASE_API}/laporan/akhir/${idEdit.id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                navigate('/laporan-akhir')
            }).catch((err) => {
                console.log(err)
            })

            setJudul('')
            setNameDocPdf('')
            setUrlJurnal('')
            setTambahBiaya([])
            setIdDeleteBiaya([])
        }else{
            axios.post(`${process.env.REACT_APP_BASE_API}/laporan/akhir`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                navigate('/laporan-akhir')
            }).catch((err) => {
                console.log(err)
            })

            setJudul('')
            setNameDocPdf('')
            setUrlJurnal('')
            setTambahBiaya([])
            setIdDeleteBiaya([])
        }
        
    }

    const uploadPdf = (e) => {
        setNameDocPdf(e?.target.files[0]?.name)

        setPdf({
            pdfPreview: URL.createObjectURL(e.target.files[0]),
            pdfAsFile: e.target.files[0]
        })

    }

    // Edit

    const hendleEditLaporanAkhir = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/laporan/akhir/${idEdit.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            if (res.data.data.judulPenelitian) {
                // console.log(res.data.data)
                setJudul(res.data.data.judulPenelitian)
                hendleCekLaporanKemajuan(res.data.data.judulPenelitian)
            }
            if(res.data.data.judulPengabdian){
                console.log(res.data.data)
                setJudul(res.data.data.judulPengabdian)
                hendleCekLaporanKemajuan(res.data.data.judulPengabdian)
            }
            setTambahBiaya(res.data.data.biayaKegiatan)
            setUrlJurnal(res.data.data.URLJurnal)
            setNameDocPdf(res.data.data?.Dokumen?.namePdf)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllPenelitianByStatusPenelian()
        getAllPengabdianByStatusPengabdian()

        if (pathname === `/laporan-akhir/Edit/${idEdit.id}`) {
            hendleEditLaporanAkhir()
        }
    }, [])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
                <Navbar/>
                <div className={style.content}>
                    <ToastContainer/>
                    {pathname === `/laporan-akhir/Edit/${idEdit.id}` && (
                        <span>Edit Laporan Akhir</span>
                    )}
                    {pathname === `/laporan-akhir/add` && (
                        <span>Tambahkan Laporan Akhir</span>
                    )}
                    <div className={style.containerr}>
                        <div className={style.contentItem}>
                            <p  className={style.jdul}>Monev 100%</p>
                            <div className={style.indetiUsulan}>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Judul Penelitian / Pengabdian</label>
                                    <select name="" id="" value={judul} onChange={(e) => `${setJudul(e.target.value)} ${hendleCekLaporanKemajuan(e.target.value)}`}>
                                        {/* {console.log(dataPenelitianDisetujuiUsulan, judul)} */}
                                        {(dataPenelitianDisetujuiUsulan.length !== 0 || dataPengabdianDisetujuiUsulan.length !== 0) ?
                                            <>
                                            <option value="">- Select Judul -</option>
                                                {dataPenelitianDisetujuiUsulan.length !== 0 && (
                                                    dataPenelitianDisetujuiUsulan.map((data, key) => {
                                                        return (
                                                            // roleId === 1 ? 
                                                            //     <option key={key} value={data?.id}>{data?.judul}</option>
                                                            //     :
                                                                <option key={key} value={data?.judul}>{data?.judulPenelitian}</option>
                                                        )
                                                    })
                                                )}
                                                {dataPengabdianDisetujuiUsulan.length !== 0 && (
                                                    dataPengabdianDisetujuiUsulan.map((data, key) => {
                                                        return (
                                                            // roleId === 1 ? 
                                                            //     <option key={key} value={data?.id}>{data?.judul}</option>
                                                            //     :
                                                                <option key={key} value={data?.judul}>{data?.judulPengabdian}</option>
                                                        )
                                                    })
                                                )}
                                            </>
                                            : 
                                            <option value={judul}>{judul}</option>
                                        }
                                    </select>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <div>
                                        <label htmlFor="">Monev 70%</label>
                                    </div>
                                    <div>
                                        <table className={style.tableMonev70}>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Uraian</th>
                                                    <th>Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {console.log(dataKemajuan)} */}
                                                {dataKemajuan[0]?.biayaKegiatan?.length !== 0 && (
                                                    dataKemajuan[0]?.biayaKegiatan?.map((data, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{data.uraian}</td>
                                                                <td>{data.jumlah}</td>
                                                            </tr>
                                                        )
                                                    })
                                                )}
                                                {/* {console.log(tambahBiaya)} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Biaya Kegiatan</label>
                                    <div className={style.contentButtonTambah}>
                                        <input className={style.itemButtonTambah} type="button" onClick={hendleAddInput} value="Tambah Biaya" />
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Uraian</th>
                                                <th>Harga</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tambahBiaya.map((data, key) => {
                                                // console.log(data.uraian) 
                                                return (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td><textarea name="" id={key} cols="30" rows="10" value={data?.uraian} onChange={(e) => `${hendleUpdateDataUrain(e)} ${setUraian(e.target.value)}`}></textarea></td>
                                                        <td><input type="number" id={key} value={data?.jumlah} onChange={(e) => `${hendleUpdateDataJumlah(e)} ${setJumlah(e.target.value)}`}/></td>
                                                        <td>
                                                            <span className={`${style.iconOptions} ${style.icon2} material-symbols-outlined`} onClick={() => hendleRemoveInput(key, data.id)}>delete</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className={style.newIdentitiUsulanItem}>
                                        <label htmlFor="">URL Jurnal Penelitian / Pengabdian</label>
                                        <div className={style.contentInputJurnal}>
                                            <input type="text" value={urlJurnal} onChange={(e) => setUrlJurnal(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className={style.newIdentitiUsulanItem}>
                                        <label htmlFor="">Laporan Akhir</label>
                                        <input type='file' accept="application/pdf" style={{color: 'transparent', width: '100px'}} title="Choose a video please" id="aa"  onChange={uploadPdf}/>
                                            {(nameDocPdf?.length !== undefined) ?
                                                <label style={{marginLeft: '5px'}} id="fileLabel">{nameDocPdf}</label>
                                                :
                                                <label style={{marginLeft: '5px'}} id="fileLabel">Choose file</label>
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.createButtton}>
                            <input type="button" className={style.newUserButtonBack} value="Simpan" onClick={() => hendleSubmitLaporanAkhir()} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormLaporanAkhir