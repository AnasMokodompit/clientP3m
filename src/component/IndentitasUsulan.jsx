import { useDispatch, useSelector } from 'react-redux';
import style from './IdentitasUsulan.module.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import jwt from 'jwt-decode'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddData, AddDataPengabdian } from '../config/actions/DataActionMahasiswa';
import { saveDataAnggotaDosen } from '../config/actions/DataActionDosen';
import UsulanProposal from './UsulanProposal/Usulan';
import {saveAddPdf} from '../config/actions/SavePdfAction'




function  IdentitaUsulan(prosp) {
    let {dataSimpanAnggotaDosen} = useSelector(tes => tes.partisiDosen)
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {dataInSave, dataPengabdian} = useSelector(tes => tes.saveAddDataReducer)
    const dispatch = useDispatch()
    // const [ id, setId] = useState()
    const [dataUser, setDataUser] = useState([])
    const {pathname} = useLocation()
    const [judul, setJudul] = useState('')
    const [abstrak, setAbstrak] = useState('')
    const [skema, setSkema] = useState('')
    const [jenisTKT, setJenisTKT] = useState('')
    const [jenisTargetTKT, setJenisTargetTKT] = useState('')
    const [temaBidangFokus, setTemaBidangFokus] = useState('')
    const [bidangFokus, setBidangFokus] = useState('')
    const [biayaLuaran, setBiayaLuaran] = useState('')
    const [ruangLingkup, setRuangLinkup] = useState('')
    const [lamaKegiatan, setLamaKegiatan] = useState('')
    const [dataKetuaPenelitian, setDataKetuaPenelitian] = useState([])
    const [dataSkemaDatabase, setDataSkemaDatabase] = useState([])
    const [dataRuangLingkupDatabase, setDataRuangLingkupDatabase] = useState([])
    // const navigate = useNavigate()
    const [namedocUsulanPdf, setNameDocUsulanPdf] = useState('')
    const [statusUsulan, setStatusUsulan] = useState('')
    const [statusRevisi, setStatusRevisi] = useState('')

    const [pdf, setPdf] = useState({})


    // For Edit Penelitian
    const idEdit = useParams()

    const hendleGetByIdUser = async () => {
        
        const decode = jwt(dataLogin.dataLogin.token)
        // setId(decode.roleId) 

        if (decode.roleId !== 1) {     
            axios.get(`http://localhost:3005/api/users/${decode.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataUser(res.data.data)
            })
        }else{
            await axios.get(`http://localhost:3005/api/penelitian/${idEdit.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    axios.get(`http://localhost:3005/api/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                    .then((res) => {
                        setDataKetuaPenelitian(res.data.data[0][0])
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }

    }

    const hendleSimpanValueIdentitasUsulan = () => {

        if (pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) {
            dispatch(AddData(judul, abstrak, skema, jenisTKT, jenisTargetTKT, biayaLuaran, bidangFokus, lamaKegiatan, pdf))
        }else{
            dispatch(AddDataPengabdian(judul, abstrak, skema, temaBidangFokus, bidangFokus, ruangLingkup, lamaKegiatan, pdf))
        }


        let newValue = {
            nidn: dataUser.nidn,
            nameUser: dataUser.name,
            jabatan: "Ketua Pengusul",
            tugas: "",
            statusAkun: 1,
            statusPartisipasi: 1
        }

        if(dataSimpanAnggotaDosen[0]?.jabatan !== "Ketua Pengusul") {
            dispatch(saveDataAnggotaDosen(newValue))
        }


        
        prosp.submitIdentitasUsulan('AngtUsulanProposal')
    }

    const hendleAfterIndetitasUsulanSubmit = () => {
        if (pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) {     
            if (dataInSave?.judul) {
                setJudul(dataInSave.judul)
                setAbstrak(dataInSave.abstrak)
                setSkema(dataInSave.skema)
                setJenisTKT(dataInSave.jenisTKT)
                setJenisTargetTKT(dataInSave.jenisTargetTKT)
                setBiayaLuaran(dataInSave.biayaLuaran)
                setBidangFokus(dataInSave.bidangFokus)
                setLamaKegiatan(dataInSave.lamaKegiatan)
                console.log(dataInSave, pdf)
                setNameDocUsulanPdf(dataInSave?.pdf?.pdfAsFile?.name)
            }
        }else{
            if (dataPengabdian?.judul) {
                console.log(dataPengabdian.temaBidangFokus)
                setJudul(dataPengabdian.judul)
                setAbstrak(dataPengabdian.abstrak)
                setSkema(dataPengabdian.skema)
                setBidangFokus(dataPengabdian.bidangFokus)     
                if (dataPengabdian?.temaBidangFokus) {
                    setTemaBidangFokus(dataPengabdian.temaBidangFokus)
                }
                setRuangLinkup(dataPengabdian.ruangLingkup)
                setLamaKegiatan(dataPengabdian.lamaKegiatan)
                console.log(dataPengabdian, pdf)
                setNameDocUsulanPdf(dataPengabdian?.pdf?.pdfAsFile?.name)
            }
        }
    }

    // Edit Penelitian

    const hendleEditPenelitian = () => {
        axios.get(`http://localhost:3005/api/penelitian/${idEdit.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setJudul(res.data.data.judul)
            setAbstrak(res.data.data.abstrak)
            setSkema(res.data.data.skema)
            setJenisTKT(res.data.data.jenisTKT)
            setJenisTargetTKT(res.data.data.jenisTargetTKT)
            setBiayaLuaran(res.data.data.biayaLuaran)
            setBidangFokus(res.data.data.bidangFokus)
            setLamaKegiatan(res.data.data.lamaKegiatan)
            setNameDocUsulanPdf(res.data.data?.Dokumen[0])
            
            setStatusRevisi(res.data.data?.statusRevisi)
            setStatusUsulan(res.data.data?.statusPenelitian)
            // setStatusRevisi(res.data.data.statusRevisi)

        }).catch((err) => {
            console.log(err)
        })
    }
    // Akhir Edit Penelitian

    // Edit Pengabdian
    const hendleEditPengabdian = () => {
        axios.get(`http://localhost:3005/api/pengabdian/${idEdit.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data.temaBidangFokus)
            setJudul(res.data.data.judul)
            setAbstrak(res.data.data.abstrak)
            setSkema(res.data.data.skema)
            // if (res.data.data?.skema) {
            //     axios.get(`http://localhost:3005/api/ruangLingkupSkemaPengabdian?skemaPengabdian=${res.data.data.skema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            //     .then((res) => {
            //         setDataRuangLingkupDatabase(res.data.data)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // }
            setBidangFokus(res.data.data.bidangFokus)     
            if (res.data.data?.temaBidangFokus) {
                setTemaBidangFokus(res.data.data.temaBidangFokus)
            }
            setRuangLinkup(res.data.data.ruangLingkup)
            setLamaKegiatan(res.data.data.lamaKegiatan)
            console.log(res.data.data, pdf)
            setNameDocUsulanPdf(res.data.data?.Dokumen[0])

            setStatusRevisi(res.data.data?.statusRevisi)
            setStatusUsulan(res.data.data?.statusPengabdian)

        }).catch((err) => {
            console.log(err)
        })
    }
    // Akhir Edit Pengabdian


    const uploadPdf = (e) => {
        setNameDocUsulanPdf(e.target.files[0].name)

        setPdf({
            pdfPreview: URL.createObjectURL(e.target.files[0]),
            pdfAsFile: e.target.files[0]
        })

    }

    const hendleGetSkema = () => {
        if (pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) { 
            axios.get(`http://localhost:3005/api/skemaPenelitian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataSkemaDatabase(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
  
        }else{
            axios.get(`http://localhost:3005/api/skemaPengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataSkemaDatabase(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const hendleCekRuangLingkup = (nameSkema) => {
        axios.get(`http://localhost:3005/api/ruangLingkupSkemaPengabdian?skemaPengabdian=${nameSkema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataRuangLingkupDatabase(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        hendleGetByIdUser()
        hendleAfterIndetitasUsulanSubmit()

        hendleGetSkema()

        if (pathname === `/data-penelitian/Edit/${idEdit.id}`) {
            hendleEditPenelitian()
        }
        if (pathname === `/data-pengabdian/Edit/${idEdit.id}`) {
            hendleEditPengabdian()
        }
    }, [])

    // const [fileData, setFileData] = useState();
    // const previewFile = (e) => {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.addEventListener("loadend", () => {
    //     console.log(reader.result);
    //     setFileData(reader.result);
    //   });
    //   reader.readAsDataURL(file);
    // };

    
    

    return (
        <div className={style.containerr}>
            <div className={style.contentItem}>
                <p className={style.jdul}>Informasi Pengusul - Ketua</p>
                <div className={style.newUserForm}>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Nama</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.name : dataKetuaPenelitian?.nameUser}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">NIDN</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.nidn : dataKetuaPenelitian?.user?.nidn}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Program Studi</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.prodi?.name : dataKetuaPenelitian?.user?.prodi?.name}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Email</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.email : dataKetuaPenelitian?.user?.email}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Pendidikan Terakhir</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.pendidikan_terakhir : dataKetuaPenelitian?.user?.pendidikan_terakhir}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Jabatan Fungsional</label>
                        {/* <span><p>: </p>Tabang Kotamobagu Selatan Kotamobagu Sulawesi Indonesia Tabang Kotamobagu Selatan Kotamobagu Sulawesi Indonesia</span> */}
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.jabatan_fungsional : dataKetuaPenelitian?.user?.jabatan_fungsional}</span>
                    </div>
                    <div className={style.newUserItem}>
                        <label htmlFor="">Score Sinta</label>
                        <span><p>:</p>{(dataUser.length !== 0) ? dataUser?.sinta : dataKetuaPenelitian?.user?.sinta}</span>
                    </div>
                </div>
            </div>
            <div className={style.contentItem}>
                <p  className={style.jdul}>Indentitas Usulan</p>
                <div className={style.indetiUsulan}>
                    <div className={style.newIdentitiUsulanItem}>
                        <label htmlFor="">Judul <span className={style.wajib}>*</span></label>
                        <textarea name="" id="" value={judul} onChange={(e) => setJudul(e.target.value)} ></textarea>
                    </div>
                    <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                        <div>
                            {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) && (
                                <>
                                    <label htmlFor="">Skema Penelitian <span className={style.wajib}>*</span></label>
                                    <select name="" id="" value={skema} onChange={(e) => setSkema(e.target.value)}>
                                        <option>-- Pilih Skema Penelitian --</option>
                                        {dataSkemaDatabase.length !== 0 && (
                                            dataSkemaDatabase.map((data, key) => {
                                                return (
                                                    <option key={key} value={data?.name}>{data?.name}</option>
                                                )
                                            })
                                        )}
                                    </select>
                                </>
                            )}
                            {(pathname === "/data-pengabdian/Add" || pathname === `/data-pengabdian/Edit/${idEdit.id}`)&& (
                                <>
                                    <label htmlFor="">Skema Pengabdian <span className={style.wajib}>*</span></label>
                                    <select name="" id="" value={skema} onChange={(e) => `${hendleCekRuangLingkup(e.target.value)} ${setSkema(e.target.value)}`}>
                                    <option>-- Pilih Skema Pengabdian --</option>
                                        {dataSkemaDatabase.length !== 0 && (
                                            dataSkemaDatabase.map((data, key) => {
                                                return (
                                                    <option key={key} value={data?.name}>{data?.name}</option>
                                                )
                                            })
                                        )}
                                    </select>
                                </>
                            )}
                        </div>
                        {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) && (
                            <>
                                <div>
                                    <label htmlFor="">TKT Saat Ini <span className={style.wajib}>*</span></label>
                                    <select name="" id="" value={jenisTKT} onChange={(e) => setJenisTKT(e.target.value)}>
                                        <option>-- Pilih Jenis TKT</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                                <div className={style.divTkt}>
                                    <label htmlFor="">Target Akhir TKT <span className={style.wajib}>*</span></label>
                                    {/* <input type="number" className={style.tkt} value={jenisTargetTKT} onChange={(e) => setJenisTargetTKT(e.target.value)} /> */}
                                    <select name="" id="" value={jenisTargetTKT} onChange={(e) => setJenisTargetTKT(e.target.value)}>
                                        <option>-- Pilih Target Akhir TKT</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {(pathname === "/data-pengabdian/Add" || pathname === `/data-pengabdian/Edit/${idEdit.id}`)&& (
                            <div>
                                <label htmlFor="">Tema Bidang Fokus <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={temaBidangFokus} onChange={(e) => setTemaBidangFokus(e.target.value)}>
                                    <option>-- Pilih Tema Bidang Fokus</option>
                                    <option value="Bidang Fokus Tematik">Bidang Fokus Tematik</option>
                                    <option value="Bidang Fokus RIRN">Bidang Fokus RIRN</option>
                                </select>
                            </div>
                        )}
                        {/* {console.log(temaBidangFokus)} */}
                        {temaBidangFokus === 'Bidang Fokus Tematik' && (
                            <div>
                                <label htmlFor="">Bidang Fokus Tematik <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={bidangFokus} onChange={(e) => setBidangFokus(e.target.value)}>
                                    <option>-- Pilih Tema Bidang Fokus</option>
                                    <option value="Ekonomi Hijau">Ekonomi Hijau</option>
                                    <option value="Ekonomi Digital">Ekonomi Digital</option>
                                    <option value="Kemandirian Kesehatan">Kemandirian Kesehatan</option>
                                    <option value="Ekonomi Biru">Ekonomi Biru</option>
                                    <option value="Pengembangan Pariwisata">Pengembangan Pariwisata</option>
                                </select>
                            </div>
                        )}
                        {temaBidangFokus === 'Bidang Fokus RIRN' && (
                            <div>
                                <label htmlFor="">Bidang Fokus RIRN <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={bidangFokus} onChange={(e) => setBidangFokus(e.target.value)}>
                                    <option>-- Pilih Tema Bidang Fokus</option>
                                    <option value="Energi">Energi</option>
                                    <option value="Sosial Humaniora">Sosial Humaniora</option>
                                    <option value="Kemaritiman">Kemaritiman</option>
                                    <option value="Kesehatan">Kesehatan</option>
                                    <option value="Teknologi Informasi dan Komunikasi">Teknologi Informasi dan Komunikasi</option>
                                    <option value="Pangan">Pangan</option>
                                    <option value="Material Maju">Material Maju</option>
                                    <option value="Kebencanaan">Kebencanaan</option>
                                    <option value="Transportasi">Transportasi</option>
                                    <option value="Ketahanan dan Keamanan">Ketahanan dan Keamanan</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className={style.newIdentitiUsulanItem}>
                        <label htmlFor="">Abstrak <span className={style.wajib}>*</span></label>
                        <textarea name="" id="" maxLength={2000} minLength={1500} value={abstrak} onChange={(e) => setAbstrak(e.target.value)}></textarea>
                    </div>
                    <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                        <div>
                            {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) && (
                                <>
                                <label htmlFor="">Standar Biaya Luaran <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={biayaLuaran} onChange={(e) => setBiayaLuaran(e.target.value)}>
                                    <option>-- Pilih Biaya Luaran --</option>
                                    <option value="SBK Riset Dasar">SBK Riset Dasar</option>
                                    <option value="SBK Riset Pembinaan">SBK Riset Pembinaan</option>
                                    <option value="SBK Kajian Aktual Strategis">SBK Kajian Aktual Strategis</option>
                                    <option value="SBK Riset Terapan">SBK Riset Terapan</option>
                                    <option value="SBK Riset Pengembangan">SBK Riset Pengembangan</option>
                                </select>
                                </>
                            )}
                            {(pathname === "/data-pengabdian/Add" || pathname === `/data-pengabdian/Edit/${idEdit.id}`) && (
                                <>
                                <label htmlFor="">Ruang lingkup <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={ruangLingkup} onChange={(e) => setRuangLinkup(e.target.value)}>
                                    <option>-- Pilih Ruang lingkup --</option>
                                        {dataRuangLingkupDatabase.length !== 0 && (
                                            dataRuangLingkupDatabase.map((data, key) => {
                                                return (
                                                    <option key={key} value={data?.name}>{data?.name}</option>
                                                )
                                            })
                                        )}
                                </select>
                                </>
                            )}
                        </div>
                        {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${idEdit.id}`) && (
                            <div className={style.divTkt}>
                                <label htmlFor="">Bidang Fokus Penelitian <span className={style.wajib}>*</span></label>
                                <select name="" id="" value={bidangFokus} onChange={(e) => setBidangFokus(e.target.value)}>
                                    <option>-- Pilih Bidang Fokus Penelitian</option>
                                    <option value="Pangan dan Pertanian">Pangan dan Pertanian</option>
                                    <option value="Integrasi Fokus Riset Energi, Energi Baru dan Terbarukan">Integrasi Fokus Riset Energi, Energi Baru dan Terbarukan</option>
                                    <option value="Kesehatan dan Obat">Kesehatan dan Obat</option>
                                    <option value="Transportasi">Transportasi</option>
                                    <option value="Teknologi Informasi dan Komunikasi">Teknologi Informasi dan Komunikasi</option>
                                    <option value="Pertahanan dan Keamanan">Pertahanan dan Keamanan</option>
                                    <option value="Material Maju">Material Maju</option>
                                    <option value="Kemaritiman">Kemaritiman</option>
                                    <option value="Kebencanaan">Kebencanaan</option>
                                    <option value="Sosial Humaniora, Seni Budaya,Pendidikan">Sosial Humaniora, Seni Budaya,Pendidikan</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label htmlFor="">Lama Kegiatan <span className={style.wajib}>*</span></label>
                            <select name="" id="" value={lamaKegiatan} onChange={(e) => setLamaKegiatan(e.target.value)}>
                                <option>-- Pilih Lama Kegiatan</option>
                                <option value="1">1 Tahun</option>
                                <option value="2">2 Tahun</option>
                                <option value="3">3 Tahun</option>
                                <option value="4">4 Tahun</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>       
            {(statusUsulan === 2 || statusRevisi === 1) && (
                <div className={style.contentItem}>
                    <p className={style.jdul}>Dokumen Usulan</p>
                    <div className={style.indetiUsulan}>
                        {/* {statusRevisi.length !== 0 && ( */}
                        <div className={`${style.newIdentitiUsulanItem} ${style.ungahPdfUsulan}`}>
                            <span>Unggah Konten Dokumen Usulan <span>(.pdf)</span></span>
                            <div className={style.itemUploadUsulan}>
                                <div>
                                        <input type='file' accept="application/pdf" style={{color: 'transparent', width: '90px'}} title="Choose a video please" id="aa" onChange={uploadPdf}/>
                                        {(namedocUsulanPdf?.id !== undefined) ?
                                            <label style={{marginLeft: '5px'}} id="fileLabel">{namedocUsulanPdf.namePdf}</label>
                                            :
                                            <label style={{marginLeft: '5px'}} id="fileLabel">{namedocUsulanPdf}</label>
                                        }
                                        {(namedocUsulanPdf?.length === undefined || namedocUsulanPdf?.length === 0) && (
                                            <label style={{marginLeft: '5px'}} id="fileLabel">Choose file</label>
                                        )}
                                </div>
                            </div>
                            <div className={style.downloadDokumen}>
                                <span className="material-symbols-outlined">download</span>
                                {console.log(namedocUsulanPdf?.length)}
                                {namedocUsulanPdf?.id !== undefined && (
                                    <span> <Link to={`${namedocUsulanPdf.urlPdf}`} target='_blank' rel='noreferrer'>Lihat Dokumen Usulan</Link></span>
                                )}
                                {(namedocUsulanPdf?.id === undefined && namedocUsulanPdf?.length !== 0) && (
                                    <span> <Link to={`${pdf.pdfPreview}`} target='_blank' rel='noreferrer'>Lihat Dokumen Usulan</Link></span>
                                )}
                                {(namedocUsulanPdf?.length === 0) && (
                                    <label style={{marginLeft: '5px'}} id="fileLabel">Choose file</label>
                                )}
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                </div>
            ) }
            <div className={style.createButtton}>
                {/* {pathname === "/data-penelitian/Add" && ( */}
                    <input type="button" className={style.newUserButtonBack} value="Next" onClick={hendleSimpanValueIdentitasUsulan} />
                {/* )} */}
                {/* {pathname === `/data-penelitian/Edit/${idEdit.id}` && (
                    <input type="button" className={style.newUserButtonBack} value="Next" onClick={hendleSimpanValueAfterEditIdentitasUsulan} />
                )} */}
            </div>
        </div>
    )
}


export default IdentitaUsulan