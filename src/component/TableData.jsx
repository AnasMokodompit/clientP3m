import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import style from './TableData.module.css'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import dateFormat from "dateformat"
import { ToastContainer, toast } from "react-toastify"



function TableData() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const navigate = useNavigate()
    const [jatabatanKampus, setJabatanKampus] = useState('')
    const [dataUser, setDataUser] = useState([])
    const [dataCatatanHarian, setDataCatatanHarian] = useState([])
    const [dataPenelitian, setDataPenelitian] = useState([])
    const [dataPengabdian, setDataPengabdian] = useState([])
    const [activeByProdi, setActiveByProdi] = useState(false)
    const {pathname} = useLocation()
    const [popupAddcatatanHarian, setPopupAddcatatanHarian] = useState('0')
    const [popupReadcatatanHarian, setPopupReadcatatanHarian] = useState('0')
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [roleId, setRoleId] = useState()
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)

    // CatatanHarian
    const [dataPenelitianDisetujuiUsulan, setDataPenelitianDisetujuiUsulan] = useState([])
    const [dataPengabdianDisetujuiUsulan, setDataPengabdianDisetujuiUsulan] = useState([])
    const [judul, setJudul] = useState('')
    const [kegiatan, setKegiatan] = useState('')
    const [kehadiran, setKehadiran] = useState()
    const [ttg, setTtg] = useState('')
    const [id, setId] = useState('')
    const [partisipasiUsulanId, setPartisipasiUsulanId] = useState()
    const [popupCatatanHarian, setPopupCatatanHarian] = useState('')
    const [nameDocPdf, setNameDocPdf] = useState('')
    const [pdf, setPdf] = useState({})

    // Akhir

    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId) 

        axios.get(`http://localhost:3005/api/users/${decode.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataUser(res.data.data)
            setJabatanKampus(res.data.data?.jabtan_kampus)
        })

    }

    // For Data Catatan Harian

    const getAllDataCatatanHarian = () => {
        axios.get(`http://localhost:3005/api/catatanHarian?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataCatatanHarian(res.data.data)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleReadCatatanHarian = (id) => {
        axios.get(`http://localhost:3005/api/catatanHarian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setKegiatan(res.data.data.kegiatan)
            setTtg(dateFormat(res.data.data.ttg, "yyyy-mm-dd"))
            if (res.data.data?.partisipasiPenelitian?.judulPenelitian) {
                setJudul(res.data.data.partisipasiPenelitian.judulPenelitian)
            }else{
                setJudul(res.data.data.partisipasiPengabdian.judulPengabdian)
            }
            setNameDocPdf(res.data.data?.Dokumen?.namePdf)
            setKehadiran(res.data.data?.kehadiran)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditCatatanHarian = (id) => {

        setId(id)
        axios.get(`http://localhost:3005/api/catatanHarian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setKegiatan(res.data.data.kegiatan)
            setTtg(dateFormat(res.data.data.ttg, "yyyy-mm-dd"))
            if (res.data.data?.partisipasiPenelitian?.judulPenelitian) {
                setPartisipasiUsulanId(res.data.data.partisipasiPenelitianId)
            }else{
                setPartisipasiUsulanId(res.data.data.partisipasiPengabdianId)
            }
            setNameDocPdf(res.data.data?.Dokumen?.namePdf)
            setKehadiran(res.data.data.kehadiran)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDeleteCatatanHarian = (id) => {
        axios.delete(`http://localhost:3005/api/catatanHarian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            getAllDataCatatanHarian()
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitCatatanHarian = () => {

        const date = new Date(ttg).toISOString()

        if (popupCatatanHarian === "TambahCatatanHarian") {

            
            const formData = new FormData()
            
            formData.append('kegiatan', kegiatan)
            formData.append('ttg', date)
            formData.append('kehadiran', kehadiran)
            formData.append('catatan_harian_pdf', pdf.pdfAsFile)
            formData.append('partisipasiUsulanId', Number(partisipasiUsulanId))

            formData.forEach((value,key) => {
                console.log(key+" "+value)
              });

            axios.post(`http://localhost:3005/api/catatanHarian?`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                getAllDataCatatanHarian()
            }).catch((err) => {
                console.log(err)
            })
        }else{

            const formData = new FormData()
            
            formData.append('kegiatan', kegiatan)
            formData.append('ttg', date)
            formData.append('kehadiran', kehadiran)
            formData.append('catatan_harian_pdf', pdf.pdfAsFile)
            formData.append('partisipasiUsulanId', Number(partisipasiUsulanId))


            axios.patch(`http://localhost:3005/api/catatanHarian/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}} )
            .then(() => {
                getAllDataCatatanHarian()
            }).catch((err) => {
                console.log(err)
            })
        }

        setKehadiran('')
        setKegiatan('')
        setTtg('')
        setPartisipasiUsulanId()
        setNameDocPdf('')
        setPdf({})
    }

    const hendleCloseCatatanHarian = () => {
        setKehadiran('')
        setKegiatan('')
        setTtg('')
        setPartisipasiUsulanId()
        setNameDocPdf('')
    }
    // Akhir 



    // For Data Penelitian

    const hendleCekProfile = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId) 

        let nameJadwal = "Pemasukan Usulan"
        let pesanError = ""

        axios.get(`http://localhost:3005/api/penJadwalan?searchJudulJadwal=${nameJadwal}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            if (res.data.data.length === 0) {
                pesanError = "Jadwal Belum Ada" 
            }else if (new Date().getTime() < new Date(res.data.data[0].tglMulai).getTime()) {
                pesanError = "Jadwal Pemasukan Usulan Belum waktunya"
            }else if (new Date().getTime() > new Date(res.data.data[0].tglAkhir).getTime()) {
                pesanError = "Jadwal Pemasukan Usulan Telah Berakhir"
            }
        }).catch((err) => {
            console.log(err)
        })

        return setTimeout(() => {
            
            if (pesanError.length !== 0) {
                return alert(pesanError)
            }else{
    
                axios.get(`http://localhost:3005/api/users/${decode.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    if (!res.data.data?.username || !res.data.data?.name || !res.data.data?.nomor_tlp || !res.data.data?.jurusanId || !res.data.data?.prodiId || !res.data.data?.email || !res.data.data?.pendidikan_terakhir || !res.data.data?.jabatan_fungsional || !res.data.data?.sinta || !res.data.data?.jnsKelaminName || !res.data.data?.tempat_lahir || !res.data.data?.alamat || !res.data.data?.tanggalLahir || !res.data.data?.profile_picture || (!res.data.data?.nidn && !res.data.data?.nim)) {
                        alert('Data User Belum Di Lengkapi')
                    }else{
                        if (pathname === "/data-pengabdian") {
                            navigate(`/data-pengabdian/Add`)
                        }else{
                            navigate(`/data-penelitian/Add`)
                        }
                    }
                })
            }

        }, 200); 


    }

    const getAllDataPenelitian = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId)

        if (decode.roleId === 4 || decode.roleId === 1) {
            axios.get(`http://localhost:3005/api/penelitian?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataPenelitian(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        if (decode.roleId === 3 || decode.roleId === 2) {
            axios.get(`http://localhost:3005/api/penelitian/usulan?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataPenelitian(res.data.data)
            }).catch((err)=> {
                console.log(err)
            })
        }
    }

    const hendleCekUsulanProdiPenelitian = (id_prodi) => {
        hendleCekProfile()


        axios.get(`http://localhost:3005/api/penelitian/prodi?page=${page}&row=${row}&searchJudul=${searchName}&id_prodi=${id_prodi}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataPenelitian(res.data.data)
        }).catch((err)=> {
            
        })

    }

    const hendleCekUsulanProdiPengabdian = (id_prodi) => {
        axios.get(`http://localhost:3005/api/pengabdian/prodi?page=${page}&row=${row}&searchJudul=${searchName}&id_prodi=${id_prodi}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataPengabdian(res.data.data)
        }).catch((err)=> {
            console.log(err)
        })

    }

    const hendleDeletePenelitian = (id) => {
        axios.delete(`http://localhost:3005/api/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}}).
        then(()=>{
            getAllDataPenelitian()
        }).catch((err)=>{
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

    const hendleAjukanPenelitian = (id) => {

        const data = {
            statusPenelitian: 1
        }
        axios.patch(`http://localhost:3005/api/penelitian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            getAllDataPenelitian()
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    // Akhir

    // For Data Pengabdian

    const getAllDataPengabdian = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId)

        if (decode.roleId === 4 || decode.roleId === 1) {
            axios.get(`http://localhost:3005/api/pengabdian?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataPengabdian(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        if (decode.roleId === 3 || decode.roleId === 2) {
            axios.get(`http://localhost:3005/api/pengabdian/usulan?page=${page}&row=${row}&searchJudul=${searchName}`,{ headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataPengabdian(res.data.data)
            }).catch((err)=> {
                console.log(err)
            })
        }
    }

    const hendleDeletePengabdian = (id) => {
        axios.delete(`http://localhost:3005/api/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}}).
        then(()=>{
            getAllDataPengabdian()
        }).catch((err)=>{
            console.log(err)
        })
    }

    // Akhir 

    const getAllPenelitianByStatusPenelian = () => {
        axios.get(`http://localhost:3005/api/penelitian/catatanHarian?statusPenelitian=5`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPenelitianDisetujuiUsulan(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
            alert(err.response.data.message)
        })
    }

    const getAllPengabdianByStatusPengabdian = () => {
        axios.get(`http://localhost:3005/api/pengabdian/catatanHarian?statusPengabdian=5`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPengabdianDisetujuiUsulan(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
            alert(err.response.data.message)
        })
    }

    const hendleAjukanPengabdian = (id) => {

        const data = {
            statusPengabdian: 1
        }
        axios.patch(`http://localhost:3005/api/pengabdian/${id}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            getAllDataPengabdian()
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    const uploadPdf = (e) => {
        setNameDocPdf(e.target.files[0].name)

        setPdf({
            pdfPreview: URL.createObjectURL(e.target.files[0]),
            pdfAsFile: e.target.files[0]
        })

    }

    

    useEffect(() => {
        if (activeByProdi === false) {
            hendleAccesRoleUser()
            getAllDataCatatanHarian()
            getAllDataPenelitian()
            getAllDataPengabdian()
            getAllPenelitianByStatusPenelian()
            getAllPengabdianByStatusPengabdian()
        }else{
            hendleCekUsulanProdiPenelitian(dataUser?.prodi?.id)
            hendleCekUsulanProdiPengabdian(dataUser?.prodi?.id)
        }
    }, [row, page, searchName])


    return (
        <>
            {pathname === "/catatan-harian" && (
                <>
                    <input type="file" id='uploadLaporanKemajuan' hidden />
                    <div className={`${(popupAddcatatanHarian === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
                    </div>
                    <div>
                        <div className={style.conTable}>
                            <div className={style.buttonCreate}>
                                {roleId !== 1 && (
                                    <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddcatatanHarian("1")} ${setPopupCatatanHarian("TambahCatatanHarian")} `} value="Tambah Data" />
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
                                        <input type="text" value={searchName} placeholder='Search' onChange={(e) => setSearchName(e.target.value)}/>
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
                                        <th>Kegiatan</th>
                                        <th>Kehadiran</th>
                                        <th>Tanggal Kegiatan</th>
                                        <th>File</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody className={style.dataTableCatatanHarian}>
                                    {dataCatatanHarian.length !== 0 && (
                                        dataCatatanHarian.map((data, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{key += 1}</td>
                                                    {console.log(data)}
                                                    {data?.partisipasiPenelitian && (
                                                        <>
                                                        <td>{data?.partisipasiPenelitian?.penelitian?.judul}</td>
                                                        <td>{data?.partisipasiPenelitian?.penelitian?.skema}</td>
                                                        </>    
                                                    )}
                                                    {data?.partisipasiPengabdian && (
                                                        <>
                                                        <td>{data?.partisipasiPengabdian?.pengabdian?.judul}</td>
                                                        <td>{data?.partisipasiPengabdian?.pengabdian?.skema}</td>
                                                        </>
                                                    )}
                                                    <td>{data?.kegiatan}</td>
                                                    <td>{data?.kehadiran}</td>
                                                    <td>{dateFormat(data.ttg, "dd mmm yyyy")}</td>
                                                    <td className={style.stylePdf}>
                                                        {data?.Dokumen?.namePdf.length !== 0 ? 
                                                            <Link to={`/data-penelitian/revisi/reviewPdf/${data?.Dokumen?.id}`}><p>{data?.Dokumen?.namePdf}</p></Link>
                                                            :
                                                            <p className={style.nonAjukan}>Belum diupload</p>
                                                        }
                                                    </td>
                                                    <td>
                                                        <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`} onClick={() => `${setPopupReadcatatanHarian("1")} ${hendleReadCatatanHarian(data.id)}`}>visibility</span> 
                                                        <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddcatatanHarian("1")} ${hendleEditCatatanHarian(data.id)} ${setPopupCatatanHarian("EditCatatanHarian")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => `${handleDeleteCatatanHarian(data?.id)}`}>delete</span>
                                                        {/* <span className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`}>more_vert</span> */}
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
                                    <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)} >chevron_left</span>
                                    <span className={`${style.number}`}>{page}</span>
                                    <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                                </div>
                            </div>
                        </div>
                        {popupAddcatatanHarian === "1" && (
                            <div className={style.containerPopUp}>
                                <div className={style.contentTitle}>
                                    {popupCatatanHarian === "EditCatatanHarian" && (
                                        <p>Edit Catatan Harian</p>
                                    )}
                                    {popupCatatanHarian === "TambahCatatanHarian" && (
                                        <p>Create Catatan Harian</p>
                                    )}
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddcatatanHarian("0")} ${hendleCloseCatatanHarian()}`}>close</span>
                                </div>
                                {roleId !== 1 && (
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Judul Penelitian / Pengabdian</label>
                                        {console.log(dataPenelitianDisetujuiUsulan, dataPengabdianDisetujuiUsulan)}
                                        <select name="" id="" value={partisipasiUsulanId} onChange={(e) => setPartisipasiUsulanId(e.target.value)}>
                                            <option value="">- Select Judul -</option>
                                            {dataPenelitianDisetujuiUsulan.length !== 0 && (
                                                dataPenelitianDisetujuiUsulan.map((data, key) => {
                                                    {console.log(data)}
                                                    return (
                                                        // roleId === 1 ? 
                                                            // <option key={key} value={data?.id}>{data?.judul}</option>
                                                            // :
                                                            <option key={key} value={data?.id}>{data?.judulPenelitian}</option>
                                                    )
                                                })
                                            )}
                                            {dataPengabdianDisetujuiUsulan.length !== 0 && (
                                                dataPengabdianDisetujuiUsulan.map((data, key) => {
                                                    {console.log(data)}
                                                    return (
                                                        // roleId === 1 ? 
                                                            // <option key={key} value={data?.id}>{data?.judul}</option>
                                                            // :
                                                            <option key={key} value={data?.id}>{data?.judulPengabdian}</option>
                                                    )
                                                })
                                            )}
                                        </select>
                                    </div>
                                )}
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Kegiatan</label>
                                    <textarea name="" id="" value={kegiatan} cols="30" rows="10" onChange={(e) => setKegiatan(e.target.value)}></textarea>
                                </div>
                                <div className={style.conHorizontal}>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Tanggal</label>
                                        <input type="date" value={ttg} onChange={(e) => setTtg(e.target.value)}/>
                                    </div>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Kehadiran</label>
                                        <input type="text" value={kehadiran} onChange={(e) => setKehadiran(e.target.value)} />
                                    </div>
                                </div>
                                <div className={`${style.fileCatatanHarian}`}>
                                    <input type='file' accept="application/pdf" style={{color: 'transparent', width: '100px'}} title="Choose a video please" id="aa"  onChange={uploadPdf}/>
                                    {/* {console.log(nameDocPdf?.length)} */}
                                    {(nameDocPdf?.length !== undefined) ?
                                        <label style={{marginLeft: '5px'}} id="fileLabel">{nameDocPdf}</label>
                                        :
                                        <label style={{marginLeft: '5px'}} id="fileLabel">Choose file</label>
                                    }
                                </div>
                                <div className={style.conSubmit}>
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitCatatanHarian()} ${setPopupAddcatatanHarian("0")}`}/>
                                </div>
                            </div>
                        )}
                        {popupReadcatatanHarian === "1" && (
                            <div className={style.containerPopUp}>
                                <div className={style.contentTitle}>
                                    <p>Read Catatan Harian</p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupReadcatatanHarian("0")} ${hendleCloseCatatanHarian()}`}>close</span>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Judul Penelitian / Pengabdian</label>
                                    <textarea name="" id="" style={{height: "50px"}} value={judul} disabled></textarea>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Kegiatan</label>
                                    <textarea name="" id="" value={kegiatan} disabled cols="30" rows="10" onChange={(e) => setKegiatan(e.target.value)}></textarea>
                                </div>
                                <div className={style.conHorizontal}>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Tanggal</label>
                                        <input type="date" value={ttg} onChange={(e) => setTtg(e.target.value)} disabled/>
                                    </div>
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Kehadiran</label>
                                        <input type="text" value={kehadiran} onChange={(e) => setKehadiran(e.target.value)} disabled/>
                                    </div>
                                </div>
                                <div className={`${style.fileCatatanHarian}`}>
                                    <label htmlFor="">Pdf Catatan Harian : </label>
                                    {console.log(nameDocPdf)}
                                    {(nameDocPdf?.length !== undefined) ?
                                        <Link>
                                            <label style={{marginLeft: '5px', fontStyle: 'italic'}} id="fileLabel">{nameDocPdf}</label>
                                        </Link> 
                                        :
                                        <label style={{marginLeft: '5px'}} id="fileLabel">No File</label>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {pathname === "/data-penelitian" && (
                <div className={style.conTable} onClick={(e) => hendleMenuOpsi(e)}>
                    {/* <div> */}
                    <div className={style.buttonCreate}>
                        {/* {console.log(dataPenelitian, activeByProdi)} */}
                        {(roleId === 3 && jatabatanKampus?.toLocaleLowerCase() === "kepala program studi" ||  jatabatanKampus?.toLocaleLowerCase() === "kaprodi") && (
                            <>
                            <span>
                            <Link className={style.userAddButton} onClick={() => `${setActiveByProdi(true)} ${hendleCekUsulanProdiPenelitian(dataUser?.prodi?.id)}`}>Usulan Prodi</Link> 
                            {/* <span></span> */}
                            </span>
                            </>
                        )}
                        {(roleId !== 1 && roleId !== 4) && (
                            <>
                            <Link onClick={hendleCekProfile} className={style.userAddButton}>Tambah Data</Link>
                            </>
                        )}
                    </div>
                    <div className={style.buttonSearchAndRow}>
                        <div className={style.entitas}>
                            <span>Show</span>
                            <select name="" id="">
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
                                <input type="text" value={searchName} placeholder='Search' onChange={(e) => setSearchName(e.target.value)}/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>    
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Judul</th>
                                <th>Skema Penelitian</th>
                                <th>Waktu Penelitian</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleId !== 1 ?
                                dataPenelitian.length !== 0 && (
                                    dataPenelitian.map((data, key) => {
                                        // console.log(`${dateFormat(data.penelitian.createdAt, "dd mmm yyyy")} - ${dateFormat(data.penelitian.createdAt, "dd mmm")} ${new Date(data.penelitian.createdAt).getFullYear() + Number(data.penelitian.lamaKegiatan)}`)
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.penelitian?.judul}</td>
                                                <td>{data?.penelitian?.skema}</td>
                                                <td>{`${dateFormat(data.penelitian.createdAt, "dd mmm yyyy")} - ${dateFormat(data.penelitian.createdAt, "dd mmm")} ${new Date(data.penelitian.createdAt).getFullYear() + Number(data.penelitian.lamaKegiatan)}`}</td>
                                                <td>
                                                    <>
                                                            {data?.penelitian?.statusPenelitian === 0 && 
                                                                    <p className={style.nonAjukan}>Belum Diajukan</p>
                                                            }
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
                                                            {data?.penelitian?.statusPenelitian === 7 && 
                                                                <p className={style.dibiayai}>Selesai</p>
                                                            } 
                                                            {console.log(data)}
                                                            {(data?.penelitian?.statusPenelitian === 2) && 
                                                                <p className={style.diajukan}>Approved</p>
                                                            }
                                                            {/* {(data?.penelitian?.statusPenelitian === 2 && data?.penelitian?.reviewPenelitian?.length !== 0) && 
                                                                <p className={style.sedangDiNilai}>Sedang Dinilai</p>

                                                            } */}
                                                            {data.penelitian.statusPenelitian === 1 && 
                                                                    <p className={style.diajukan}>Menunggu Approve Kampus</p>
                                                            }   
                                                    </>
                                                </td>
                                                <td>
                                                    <div>
                                                        {/* {console.log(data?.penelitian?.id)} */}
                                                        <Link to={`/data-penelitian/${data?.penelitian?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        {(roleId !== 4 && data?.penelitian?.statusPenelitian === 0 && activeByProdi === false) && (
                                                            <>     
                                                                <Link to={`/data-penelitian/Edit/${data?.penelitian?.id}`}>
                                                                    <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                                </Link>
                                                                <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleDeletePenelitian(data?.penelitian?.id)}>delete</span>
                                                            </>
                                                        )}
                                                        {console.log(data)}
                                                        {(data?.penelitian?.statusPenelitian === 2 || data?.penelitian?.statusRevisi !== false) && (
                                                            <>     
                                                                <Link to={`/data-penelitian/Edit/${data?.penelitian?.id}`}>
                                                                    <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                                </Link>
                                                            </>
                                                        )}
                                                        {console.log(data)}
                                                        <span id={data?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data?.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {(data?.penelitian?.statusPenelitian === 0 && activeByProdi === false) && (
                                                                    <p className={style.ajukanPenelitian} onClick={() => hendleAjukanPenelitian(data?.penelitian?.id)}>Ajukan</p>
                                                                    )}
                                                                {/* {data?.penelitian?.statusPenelitian === 3 && (
                                                                    <p className={style.ajukanPenelitian}>Upload Laporan Kemajuan</p>
                                                                    )} */}
                                                                {/* {(data?.penelitian?.nilaiPenelitian.length !== 0 && data?.penelitian?.statusPenelitian === 3 || data?.penelitian?.statusPenelitian === 4) && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-penelitian/nilaiPenelitian/${data?.penelitian?.id}`}>
                                                                      Nilai 
                                                                    </Link>
                                                                )} */}
                                                            </div>
                                                        )}
                                                    </div>  
                                                </td>
                                            </tr>
                                        )
                                    })
                                ): dataPenelitian.length !== 0 && (
                                    dataPenelitian.map((data, key) => {
                                        {console.log(data)}
                                        return (
                                            <tr key={key}>
                                                <td>{key += 1}</td>
                                                <td>{data?.judul}</td>
                                                <td>{data?.skema}</td>
                                                <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                                <td>
                                                    {console.log(data?.statusPenelitian, data?.reviewPenelitian)}
                                                    {
                                                        (data?.statusPenelitian === 0) && 
                                                        <p className={style.nonAjukan}>Belum Diajukan</p>
                                                    }
                                                        {data?.statusPenelitian === 3 && 
                                                            <p className={style.dibiayai}>Assesment</p>
                                                        } 
                                                        {data?.statusPenelitian === 4 && 
                                                            <p className={style.gagaldibiayai}>Tidak Dibiayai</p>
                                                        } 
                                                        {data?.statusPenelitian === 5 && 
                                                            <p className={style.dibiayai}>Penelitian Dibiayai</p>
                                                        } 
                                                        {data?.statusPenelitian === 6 && 
                                                                <p className={style.dibiayai}>Assesment Luaran</p>
                                                            } 
                                                        {data?.statusPenelitian === 7 && 
                                                                <p className={style.dibiayai}>Selesai</p>
                                                            } 
                                                        {data?.statusPenelitian === 2 && 
                                                            <p className={style.dibiayai}>Approve</p>
                                                        } 
                                                        {data?.statusPenelitian === 1 && (
                                                            <p className={style.diajukan}>Diajukan</p>
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    <div>
                                                        <Link to={`/data-penelitian/${data?.id}`}>
                                                            <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                        </Link>
                                                        {roleId === 1 && (
                                                            <>     
                                                                <Link to={`/data-penelitian/Edit/${data?.id}`}>
                                                                    <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                                </Link>
                                                                <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleDeletePenelitian(data?.id)}>delete</span>
                                                            </>
                                                        )}
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                                {console.log(data)}
                                                                {data?.nilaiPenelitian.length !== 0 && (
                                                                    <Link className={style.nilaiPenelitian} to={`/data-penelitian/nilaiPenelitian/${data?.id}`}>
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
            )}
            {pathname === "/data-pengabdian" && (
                <div className={style.conTable}>
                    <div className={style.buttonCreate}>
                        {(roleId === 3 && jatabatanKampus?.toLocaleLowerCase() === "kepala program studi" ||  jatabatanKampus?.toLocaleLowerCase() === "kaprodi") && (
                            <>
                            <span>
                            <Link className={style.userAddButton} onClick={() => `${setActiveByProdi(true)} ${hendleCekUsulanProdiPengabdian(dataUser?.prodi?.id)}`}>Usulan {dataUser?.prodi?.name}</Link> 
                            {/* <span></span> */}
                            </span>
                            </>
                        )}
                        {(roleId !== 1 && roleId !== 4) && (
                            <Link onClick={hendleCekProfile} className={style.userAddButton}>Tambah Data</Link>
                        )}
                    </div>
                    <div className={style.buttonSearchAndRow}>
                        <div className={style.entitas}>
                            <span>Show</span>
                            <select name="" id="">
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
                                <input type="text" value={searchName} placeholder='Search' onChange={(e) => setSearchName(e.target.value)}/>
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>    
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Judul</th>
                                <th>Skema Pengabdian</th>
                                <th>Waktu Pengabdian</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleId !== 1 ?
                            dataPengabdian.length !== 0 && (
                                console.log(dataPengabdian),
                                dataPengabdian.map((data, key) => {
                                    return (
                                        // console.log(data),
                                        <tr key={key}>
                                            <td>{data?.pengabdian?.id}</td>
                                            <td>{data?.pengabdian?.judul}</td>
                                            <td>{data?.pengabdian?.skema}</td>
                                            <td>{`${dateFormat(data?.pengabdian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.pengabdian?.createdAt, "dd mmm")} ${new Date(data?.pengabdian?.createdAt).getFullYear() + Number(data?.pengabdian?.lamaKegiatan)}`}</td>
                                            <td>
                                            <>
                                                            {data?.pengabdian?.statusPengabdian === 0 && 
                                                                    <p className={style.nonAjukan}>Belum Diajukan</p>
                                                            }
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
                                                            {data?.pengabdian?.statusPengabdian === 7 && 
                                                                <p className={style.dibiayai}>Selesai</p>
                                                            } 
                                                            {console.log(data)}
                                                            {(data?.pengabdian?.statusPengabdian === 2) && 
                                                                <p className={style.diajukan}>Approved</p>
                                                            }
                                                            {/* {(data?.pengabdian?.statusPengabdian === 2 && data?.pengabdian?.reviewPengabdian?.length !== 0) && 
                                                                <p className={style.sedangDiNilai}>Sedang Dinilai</p>

                                                            } */}
                                                            {data.pengabdian.statusPengabdian === 1 && 
                                                                    <p className={style.diajukan}>Menunggu Approve Kampus</p>
                                                            }   
                                                    </>
                                            </td>
                                            <td>
                                                <div>
                                                    <Link to={`/data-pengabdian/${data?.pengabdian?.id}`}>
                                                        <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                    </Link>
                                                    {(roleId !== 4 && data?.pengabdian?.statusPengabdian === 0 && activeByProdi === false) && (
                                                        <>     
                                                            <Link to={`/data-pengabdian/Edit/${data?.pengabdian?.id}`}>
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                            </Link>
                                                            <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleDeletePengabdian(data?.pengabdian?.id)}>delete</span>
                                                        </>
                                                    )}
                                                    {(data?.pengabdian?.statusPengabdian === 2 || data?.pengabdian?.statusRevisi !== false) && (
                                                        <>     
                                                            <Link to={`/data-pengabdian/Edit/${data?.pengabdian?.id}`}>
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                            </Link>
                                                        </>
                                                    )}
                                                    {/* {console.log(data)} */}
                                                    <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                    {opsiMenu == data?.id && (
                                                        console.log('tes'),
                                                        <div className={style.buttonActionMenu}>
                                                            <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                Rreview
                                                            </Link>
                                                            {(data?.pengabdian?.statusPengabdian === 0 && activeByProdi === false) && (
                                                                <p className={style.ajukanPenelitian} onClick={() => hendleAjukanPengabdian(data?.pengabdian?.id)}>Ajukan</p>
                                                                )}
                                                            {/* {data?.pengabdian?.nilaiPengabdian.length !== 0 && (
                                                                <Link className={style.nilaiPenelitian} to={`/data-pengabdian/nilaiPengabdian/${data?.pengabdian?.id}`}>
                                                                    Nilai 
                                                                </Link>
                                                            )} */}
                                                        </div>
                                                    )}
                                                </div>  
                                            </td>
                                        </tr>
                                    )
                                })
                            ): dataPengabdian.length !== 0 && (
                                dataPengabdian.map((data, key) => {
                                    {console.log(data.judul)}
                                    return (
                                        <tr key={key}>
                                            <td>{key += 1}</td>
                                            <td>{data?.judul}</td>
                                            <td>{data?.skema}</td>
                                            <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                            <td>
                                                {console.log(data?.statusPengabdian, data?.reviewPenelitian)}
                                                {
                                                    (data?.statusPengabdian === 0) && 
                                                    <p className={style.nonAjukan}>Belum Diajukan</p>
                                                }
                                                    {data?.statusPengabdian === 3 && 
                                                        <p className={style.sedangDiNilai}>Assesment</p>
                                                    } 
                                                    {data?.statusPengabdian === 4 && 
                                                        <p className={style.gagaldibiayai}>Tidak Dibiayai</p>
                                                    } 
                                                    {data?.statusPengabdian === 5 && 
                                                        <p className={style.dibiayai}>Pengabdian Dibiayai</p>
                                                    } 
                                                    {data?.statusPengabdian === 6 && 
                                                        <p className={style.dibiayai}>Assesment Luaran</p>
                                                    } 
                                                    {data?.statusPengabdian === 7 && 
                                                        <p className={style.dibiayai}>Selesai</p>
                                                    } 
                                                    {data?.statusPengabdian === 2 && 
                                                        <p className={style.dibiayai}>Approve</p>
                                                    } 
                                                    {data?.statusPengabdian === 1 && (
                                                        <p className={style.diajukan}>Diajukan</p>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <div>
                                                    <Link to={`/data-pengabdian/${data?.id}`}>
                                                        <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                    </Link>
                                                    {roleId === 1 && (
                                                        <>     
                                                            <Link to={`/data-pengabdian/Edit/${data?.id}`}>
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`}>edit</span>
                                                            </Link>
                                                            <span className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleDeletePengabdian(data?.id)}>delete</span>
                                                        </>
                                                    )}
                                                    <span id={data?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)}  >more_vert</span>
                                                    {opsiMenu == data.id && (
                                                        <div className={style.buttonActionMenu}>
                                                            <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.id}`}>
                                                                Rreview
                                                            </Link>
                                                            {console.log(data)}
                                                            {data?.nilaiPengabdian.length !== 0 && (
                                                                <Link className={style.nilaiPenelitian} to={`/data-pengabdian/nilaiPengabdian/${data?.id}`}>
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
            )}
        </>
    )
}

export default TableData