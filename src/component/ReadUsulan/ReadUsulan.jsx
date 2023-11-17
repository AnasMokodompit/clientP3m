import { useState } from "react"
import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidenar"
import style from './ReadUsulan.module.css'
import jwt from "jwt-decode"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link, useLocation, useParams } from "react-router-dom"
import { useEffect } from "react"



function ReadUsulan() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [partisipasiDosen, setPartisipasiDosen] = useState([])
    const [partisipasiMahasiswa, setPartisipasiMahasiswa] = useState([])
    const {pathname} = useLocation()
    const {id} = useParams()
    const [judul, setJudul] = useState('')
    const [abstrak, setAbstrak] = useState('')
    const [skema, setSkema] = useState('')
    const [jenisTKT, setJenisTKT] = useState('')
    const [jenisTargetTKT, setJenisTargetTKT] = useState('')
    const [bidangFokus, setBidangFokus] = useState('')
    const [biayaLuaran, setBiayaLuaran] = useState('')
    const [lamaKegiatan, setLamaKegiatan] = useState('')
    const [namedocUsulanPdf, setNameDocUsulanPdf] = useState([])
    const [temaBidangFokus, setTemaBidangFokus] = useState('')
    const [ruangLingkup, setRuangLingkup] = useState('')
    const [dataSkemaDatabase, setDataSkemaDatabase] = useState([])
    const [dataRuangLingkupDatabase, setDataRuangLingkupDatabase] = useState([])


    // Penelitian
    const hendleReadPenelitian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
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
            // setStatusRevisi(res.data.data.statusRevisi)

        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleGetSkema = () => {
        if (pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian") { 
            axios.get(`${process.env.REACT_APP_BASE_API}/skemaPenelitian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataSkemaDatabase(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
  
        }else{
            axios.get(`${process.env.REACT_APP_BASE_API}/skemaPengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataSkemaDatabase(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    


    const hendlePartisipasiPenelitianDosen = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        // setRoleId(decode.roleId)


        await axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {

            axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiDosen(res.data.data[0])
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    const hendlePartisipasiPenelitianMahasiswa = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        // setRoleId(decode.roleId) 

        await axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiMahasiswa(res.data.data[1])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    // Pengabdian

    const hendleReadPengabdian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setJudul(res.data.data.judul)
            setAbstrak(res.data.data.abstrak)
            setSkema(res.data.data.skema)
            setTemaBidangFokus(res.data.data.temaBidangFokus)
            setBidangFokus(res.data.data.bidangFokus)
            setRuangLingkup(res.data.data.ruangLingkup)
            console.log(res.data.data.ruangLingkup)
            console.log(res.data.data.skema)
            if (res.data.data?.skema) {
                axios.get(`${process.env.REACT_APP_BASE_API}/ruangLingkupSkemaPengabdian?skemaPengabdian=${res.data.data.skema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    setDataRuangLingkupDatabase(res.data.data)
                    console.log(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
            setLamaKegiatan(res.data.data.lamaKegiatan)
            setNameDocUsulanPdf(res.data.data?.Dokumen[0])
            // setStatusRevisi(res.data.data.statusRevisi)

        }).catch((err) => {
            console.log(err)
        })
    }


    const hendlePartisipasiPengabdianDosen = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        // setRoleId(decode.roleId)


        await axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {

            axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPengabdian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiDosen(res.data.data[0])
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }


    const hendlePartisipasiPengabdianMahasiswa = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        // setRoleId(decode.roleId) 

        await axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPengabdian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiMahasiswa(res.data.data[1])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    useEffect(() => {
        hendleGetSkema()
        console.log(pathname.substring(1, pathname.length - (id.length + 1)))
        if (pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian") {
            hendleReadPenelitian()
            hendlePartisipasiPenelitianDosen()
            hendlePartisipasiPenelitianMahasiswa()
        }else if (pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian") {
            hendleReadPengabdian()
            hendlePartisipasiPengabdianDosen()
            hendlePartisipasiPengabdianMahasiswa()
        }
    }, [])


    return (
        <div className={style.container}>
            {console.log(pathname.substring(1, pathname.length - (id.length + 1)))}
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                    <span>Data Penelitian</span>
                )}
                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                    <span>Data Pengabdian</span>
                )}
                <div className={style.conTable} >  
                    {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                        <div className={style.contentItem}>
                            <p  className={style.jdul}>Indentitas Usulan</p>
                            <div className={style.indetiUsulan}>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Judul</label>
                                    <textarea name="" id="" value={judul} disabled></textarea>
                                </div>
                                <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                                    <div>
                                        <label htmlFor="">Skema Penelitian</label>
                                        <select name="" id="" value={skema} disabled>
                                            <option>-- Pilih Skema Penelitian --</option>
                                            {dataSkemaDatabase.length !== 0 && (
                                                dataSkemaDatabase.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data?.name}>{data?.name}</option>
                                                    )
                                                })
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">TKT Saat Ini</label>
                                        <select name="" id="" value={jenisTKT} disabled>
                                            <option>-- Pilih Jenis TKT</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                    <div className={style.divTkt}>
                                        <label htmlFor="">Target Akhir TKT</label>
                                        <select name="" id="" value={jenisTargetTKT} disabled>
                                            <option>-- Pilih Target Akhir TKT</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Abstrak</label>
                                    <textarea name="" id="" value={abstrak} disabled/>
                                </div>
                                <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                                    <div>
                                        <label htmlFor="">Standar Biaya Luaran</label>
                                        <select name="" id="" value={biayaLuaran} disabled>
                                            <option>-- Pilih Biaya Luaran --</option>
                                            <option value="SBK Riset Dasar">SBK Riset Dasar</option>
                                            <option value="SBK Riset Pembinaan">SBK Riset Pembinaan</option>
                                            <option value="SBK Kajian Aktual Strategis">SBK Kajian Aktual Strategis</option>
                                            <option value="SBK Riset Terapan">SBK Riset Terapan</option>
                                            <option value="SBK Riset Pengembangan">SBK Riset Pengembangan</option>
                                        </select>
                                    </div>
                                    <div className={style.divTkt}>
                                        <label htmlFor="">Bidang Fokus Penelitian</label>
                                        <select name="" id="" value={bidangFokus} disabled>
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
                                    <div>
                                        <label htmlFor="">Lama Kegiatan</label>
                                        <select name="" id="" value={lamaKegiatan} disabled>
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
                    )}
                    {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                        <div className={style.contentItem}>
                            <p  className={style.jdul}>Indentitas Usulan</p>
                            <div className={style.indetiUsulan}>
                                <div className={style.newIdentitiUsulanItem}>
                                    <label htmlFor="">Judul</label>
                                    <textarea name="" id="" value={judul} disabled></textarea>
                                </div>
                                <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                                    <div>
                                        <label htmlFor="">Skema Pengabdian</label>
                                        <select name="" id="" value={skema} disabled>
                                            <option>-- Pilih Skema Pengabdian --</option>
                                            {dataSkemaDatabase.length !== 0 && (
                                                dataSkemaDatabase.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data?.name}>{data?.name}</option>
                                                    )
                                                })
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Tema Bidang Fokus</label>
                                        <select name="" id="" value={temaBidangFokus} disabled>
                                            <option>-- Pilih Tema Bidang Fokus</option>
                                            <option value="Bidang Fokus Tematik">Bidang Fokus Tematik</option>
                                            <option value="Bidang Fokus RIRN">Bidang Fokus RIRN</option>
                                        </select>
                                    </div>
                                    {/* {temaBidangFokus === 'Bidang Fokus Tematik' && ( */}
                                        <div>
                                            <label htmlFor="">Bidang Fokus Tematik</label>
                                            <select name="" id="" value={bidangFokus} disabled>
                                                <option>-- Pilih Tema Bidang Fokus</option>
                                                <option value="Ekonomi Hijau">Ekonomi Hijau</option>
                                                <option value="Ekonomi Digital">Ekonomi Digital</option>
                                                <option value="Kemandirian Kesehatan">Kemandirian Kesehatan</option>
                                                <option value="Ekonomi Biru">Ekonomi Biru</option>
                                                <option value="Pengembangan Pariwisata">Pengembangan Pariwisata</option>
                                            </select>
                                        </div>
                                    {/* )} */}
                                    {temaBidangFokus === 'Bidang Fokus RIRN' && (
                                        <div>
                                            <label htmlFor="">Bidang Fokus RIRN</label>
                                            <select name="" id="" value={bidangFokus} disabled>
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
                                    <label htmlFor="">Abstrak</label>
                                    <textarea name="" id="" value={abstrak} disabled/>
                                </div>
                                <div className={`${style.newIdentitiUsulanItem} ${style.flexDiv}`}>                  
                                    <div>
                                        <label htmlFor="">Ruang lingkup</label>
                                        <select name="" id="" value={ruangLingkup} disabled>
                                            <option>-- Pilih Ruang lingkup --</option>
                                            {dataRuangLingkupDatabase.length !== 0 && (
                                                console.log(dataRuangLingkupDatabase),
                                                dataRuangLingkupDatabase.map((data, key) => {
                                                    return (
                                                        <option key={key} value={data?.name}>{data?.name}</option>
                                                    )
                                                })
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Lama Kegiatan</label>
                                        <select name="" id="" value={lamaKegiatan} disabled>
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
                    )}
                    <div className={style.contentItem}>
                        <p className={style.jdul}>Subtansi Usulan</p>
                        <div className={style.indetiUsulan}>
                            <div className={`${style.newIdentitiUsulanItem} ${style.ungahPdfUsulan}`}>
                                <span>Download Dokumen Usulan <span>(.pdf)</span></span>
                                <div className={style.itemUploadUsulan}>
                                    <div>
                                            <span className={`material-symbols-outlined ${style.iconPdf}`}>picture_as_pdf</span>
                                            {(namedocUsulanPdf?.length !== 0) ?
                                               <>
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                                                    <Link to={`/data-penelitian/revisi/reviewPdf/${namedocUsulanPdf?.id}`}>
                                                        <label style={{marginLeft: '5px'}} className={style.fileLabelCursor}>{namedocUsulanPdf?.namePdf}</label>
                                                    </Link>
                                                )}
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                                                    <Link to={`/data-pengabdian/revisi/reviewPdf/${namedocUsulanPdf?.id}`}>
                                                        <label style={{marginLeft: '5px'}} className={style.fileLabelCursor}>{namedocUsulanPdf?.namePdf}</label>
                                                    </Link>
                                                )}
                                               </>
                                                :
                                                <label style={{marginLeft: '5px'}} id="fileLabel">Choose file</label>
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.contentItem}>
                        {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                            <p className={style.jdul}>Team Usulan Penelitian Dosen</p>
                            )}
                        {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                            <p className={style.jdul}>Team Usulan Pengabdian Dosen</p>
                        )}
                        <div className={style.conTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nidn</th>
                                        <th>Nama Anggota</th>
                                        <th>Peran</th>
                                        <th>Tugas</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {partisipasiDosen.length !== 0 && (
                                    partisipasiDosen?.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{data?.user.nidn}</td>
                                                <td>{data.nameUser}</td>
                                                <td>{data.jabatan}</td>
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                                                    <td>{data.tugasdlmPenlitian}</td>
                                                )}
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                                                    <td>{data.tugasdlmPengabdian}</td>
                                                )}
                                                <td>
                                                    {data.statusPartisipasi === 1 && (
                                                        <p className={style.diajukan}>Disetujui</p>
                                                    )}
                                                    {data.statusPartisipasi === 0 && (
                                                        <p className={style.nonAjukan}>Mengunggu Persetujuan</p>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={style.contentItem}>
                        {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                            <p className={style.jdul}>Anggota Penelitian Mahasiswa</p>
                            )}
                        {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                            <p className={style.jdul}>Anggota Pengabdian Mahasiswa</p>
                        )}
                        <div className={style.conTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nim</th>
                                        <th>Nama Anggota</th>
                                        <th>Jurusan</th>
                                        <th>Prodi</th>
                                        <th>Tugas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {partisipasiMahasiswa.length !== 0 && (
                                    partisipasiMahasiswa?.map((data,key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{data?.user?.nim}</td>
                                                <td>{data.nameUser}</td>
                                                <td>{data?.user?.jurusan?.name}</td>
                                                <td>{data?.user?.prodi?.name}</td>
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-penelitian" && (
                                                    <td>{data.tugasdlmPenlitian}</td>
                                                )}
                                                {pathname.substring(1, pathname.length - (id.length + 1)) === "data-pengabdian" && (
                                                    <td>{data.tugasdlmPengabdian}</td>
                                                )}
                                            </tr>
                                        )
                                    })
                                )} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ReadUsulan