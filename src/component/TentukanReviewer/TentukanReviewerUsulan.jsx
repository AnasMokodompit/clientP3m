import style from './TentukanReviewerUsulan.module.css'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    const [reviewer, setReviewer] = useState([{nameUser: ""}])
    const [nameReviewer, setNameReviewer] = useState()
    const [listName, setListName] = useState([])
    const [opsiMenu, setOpsiMenu] = useState("0")
    const [idDeleteReviewer, setIdDeleteReviewer] = useState([])
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)




    const [pengabdianAssesment, setPengabdianAssesment] = useState([])
    const [penelitianAssesment, setPenelitianAssesment] = useState([])
    const [popupAddTentuReviewer, setPopupAddTentuReviewer] = useState('')
    const [popupTentuReviewer, setPopupTentuReviewer] = useState('')
    const [deskripsiPenilaian, setDeskripsiPenilaian] = useState([])
    const [popUpNilaiUsulan, setPopUpNilaiUsulan] = useState('')


    const [AssesmentLaporan, setAssesmentLaporan] = useState([])

    // Edit Penelitian
    const [nilai, setNilai] = useState([])
    const [dataNilai, setDataNilai] = useState([])
    const [revisi, setRevisi] = useState('')
    const [idNilaiUsulan, setIdNilaiUsulan] = useState()

    const [userReviewerPenelitian, setUserReviewerPenelitian] = useState([])
    const [userReviewerPengabdian, setUserReviewerPengabdian] = useState([])

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
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }



    const hendleGetAllPeneltianAssesment = () => {
        axios.get(`http://localhost:3005/api/penelitian/assesment?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setPenelitianAssesment(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleGetAllPengabdianAssesment = () => {
        axios.get(`http://localhost:3005/api/pengabdian/assesment?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            // console.log(res.data.data)
            setPengabdianAssesment(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleAddTentuReviewer = (judul) => {
        setJudul(judul)
        setReviewer([])
    }

    const hendleEditTentuReviewerPenelitian = (id, judul) => {

        setJudul(judul)
        axios.get(`http://localhost:3005/api/reviewerPenelitian?judul=${judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setReviewer(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditTentuReviewerPengabdian = (id, judul) => {

        setJudul(judul)
        axios.get(`http://localhost:3005/api/reviewerPengabdian?judul=${judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setReviewer(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleCloseTentuReviewer = () => {
        setJudul('')
        setReviewer('')
        setListName([])
    }

    const hendleSubmitTentuReviewer = () => {

        const Data = []

        if (popupTentuReviewer === 'TentukanReviewerPenelitian') {

            
            reviewer.map((data, i) => {
                if (data.nameUser.length !== 0) {
                    Data.push({
                        nameUser: data.nameUser,
                        judulPenelitian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }
            })

            axios.post(`http://localhost:3005/api/reviewerPenelitian` , Data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllPeneltianAssesment()
            }).catch((err)=> {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllPeneltianAssesment()
            })
        }else if (popupTentuReviewer === 'TentukanReviewerPengabdian') {
            reviewer.map((data, i) => {
                if (data.nameUser.length !== 0) {
                    Data.push({
                        nameUser: data.nameUser,
                        judulPengabdian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }
            })

            axios.post(`http://localhost:3005/api/reviewerPengabdian` , Data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllPengabdianAssesment()
            }).catch((err)=> {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllPengabdianAssesment()
            })
        }else if(popupTentuReviewer === 'EditReviewerPenelitian') {
            
            // console.log(idDeleteReviewer)

            reviewer.map((data, i) => {
                if (data.id) {
                    Data.push({
                        id: data.id,
                        nameUser: data.nameUser,
                        judulPenelitian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }else{
                    Data.push({
                        nameUser: data.nameUser,
                        judulPenelitian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }
            })


            const dataOVerAll = {
                Data,
                idDeleteReviewer
            }



            axios.patch(`http://localhost:3005/api/reviewerPenelitian`, dataOVerAll, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllPeneltianAssesment()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllPeneltianAssesment()
            })
        }else{
            // console.log(idDeleteReviewer)

            reviewer.map((data, i) => {
                if (data.id) {
                    Data.push({
                        id: data.id,
                        nameUser: data.nameUser,
                        judulPengabdian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }else{
                    Data.push({
                        nameUser: data.nameUser,
                        judulPengabdian: judul,
                        sebagai: `Reviewer ${i+=1}`
                    })
                }
            })


            const dataOVerAll = {
                Data,
                idDeleteReviewer
            }



            axios.patch(`http://localhost:3005/api/reviewerPengabdian`, dataOVerAll, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleGetAllPengabdianAssesment()
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
                hendleGetAllPengabdianAssesment()
            })
        }
        

        setJudul('')
        setReviewer('')
        setPenelitianAssesment('')
        setNameReviewer('')
        setIdDeleteReviewer([])
    }



    const hendleSearchName = e => {

        e.preventDefault();


        const index = e.target.id;

        axios.get(`http://localhost:3005/api/users?name=${e.target.value}&Role=2`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setListName(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        setReviewer(s => {
            s[index].nameUser = e.target.value;
            return s;
        });
    }

    const hendleSearchNidn = (e) => {

        setListName([])
        
        const index = e.target.id;

        // console.log(e.target.innerHTML)

        // console.log(reviewer)


        setReviewer(s => {
        s[index].nameUser = e.target.innerHTML;


        return s;
        });

    }

    const hendleAddInput = () => {
        if (reviewer.length !== 3) {
            setReviewer(s => {
                return [
                    ...s, {nameUser: ""}
                ]
            })
            
        }

        // return console.log(reviewer)
    }

    const hendleRemoveInput = (id, idDelete) => {
        if (popupTentuReviewer === "TentukanReviewerPenelitian") {
            
            if (reviewer.length !== 0 ) {
                setReviewer(reviewer.filter((item, i) => i !== id))
            }
        }else{
            if (idDelete ) {
                setIdDeleteReviewer(s => { return [...s, idDelete]})
            }

            if (reviewer.length !== 0 ) {
                setReviewer(reviewer.filter((item, i) => i !== id))
            }
        }
    }


    // For Penilaian
    const hendleGetAllRevuewerPenelitianByUser = () => {
        axios.get(`http://localhost:3005/api/reviewerPenelitian?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setUserReviewerPenelitian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    // For Pengabdian
    const hendleGetAllRevuewerPengabdianByUser = () => {
        axios.get(`http://localhost:3005/api/reviewerPengabdian?page=${page}&row=${row}&searchJudul=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setUserReviewerPengabdian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const cekJadwal = (id, skema) => {

        let nameJadwal = "Penilaian Usulan"
        let pesanError = ""

        console.log(nameJadwal)

        axios.get(`http://localhost:3005/api/penJadwalan?searchJudulJadwal=${nameJadwal}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data, new Date().getTime(), new Date(res.data.data[0].tglMulai).getTime())
            if (res.data.data.length === 0) {
                pesanError = "Jadwal Belum Ada" 
                // console.log("Jadwal Belum Ada")
            }else if (new Date().getTime() < new Date(res.data.data[0].tglMulai).getTime()) {
                // console.log("Jadwal Penilaian Usulan Belum waktunya")
                pesanError = "Jadwal Penilaian Usulan Belum waktunya"
            }else if (new Date().getTime() > new Date(res.data.data[0].tglAkhir).getTime()) {
                // console.log("Jadwal Penilaian Usulan Telah Berakhir")
                pesanError = "Jadwal Penilaian Usulan Telah Berakhir"
            }
        }).catch((err) => {
            console.log(err)
        })

        console.log(pesanError)

        return setTimeout(() => {
            if (pesanError.length !== 0) {
                return alert(pesanError)
            }else if (pathname === "/reviewer/data-penelitian") {
                hendleAddReviewerByUserPenelitian(id, skema)
                setPopupAddTentuReviewer("1")
                
            }else if(pathname === "/reviewer/data-pengabdian"){
                hendleAddReviewerByUserPengabdian(id, skema)
                setPopupAddTentuReviewer("1")
            }
        }, 200)
    }

    const hendleAddReviewerByUserPenelitian = (id, skema) => {
        setIdNilaiUsulan(id)

        axios.get(`http://localhost:3005/api/deskripsiPenilaianPenelitian?searchSkema=${skema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDeskripsiPenilaian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditReviewerByUserPenelitian = (id) => {
        setIdNilaiUsulan(id)

        if (nilai.length !== 0) {
            setNilai([])
        }


        axios.get(`http://localhost:3005/api/reviewerPenelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            // console.log(res.data.data.nilaiPenelitian)
            // s => { return [...s, { id: data.id, nilai: e.target.value}]}
            res.data.data?.nilaiPenelitian.map((data, i) => {
                setNilai(s => {return [...s, {id: data?.id, nilai:  data?.nilai}]})
            })
            setDataNilai(res.data.data?.nilaiPenelitian)
            setRevisi(res.data.data?.revisi)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleAddReviewerByUserPengabdian = (id, skema) => {
        setIdNilaiUsulan(id)

        axios.get(`http://localhost:3005/api/deskripsiPenilaianPengabdian?searchSkema=${skema}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDeskripsiPenilaian(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditReviewerByUserPengabdian = (id) => {
        setIdNilaiUsulan(id)

        if (nilai.length !== 0) {
            setNilai([])
        }

        axios.get(`http://localhost:3005/api/reviewerPengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            // console.log(res.data.data)
            res.data.data?.nilaiPengabdian.map((data, i) => {
                setNilai(s => {return [...s, {id: data?.id, nilai:  data?.nilai}]})
            })
            setDataNilai(res.data.data?.nilaiPengabdian)
            setRevisi(res.data.data?.revisi)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitAddNilaiReviewer = (id) => {

        // console.log(deskripsiPenilaian.length, nilai.length)
        if (deskripsiPenilaian.length !== nilai.length) {
            setNilai([])
            return toast('Wajib Memasukan Semua Nilai')
        }

        let data = {
            revisi: revisi,
            nilai: nilai
        }

        if (pathname === '/reviewer/data-penelitian') {
            
            axios.patch(`http://localhost:3005/api/reviewerPenelitian/${idNilaiUsulan}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                toast(`Berhasil Memberikan Nilai`)
                hendleGetAllRevuewerPenelitianByUser()
            }).catch((err) => {
                console.log(err)
            })

        }else if (pathname === '/reviewer/data-pengabdian') {
            // console.log(data)

            axios.patch(`http://localhost:3005/api/reviewerPengabdian/${idNilaiUsulan}`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                toast(`Berhasil Memberikan Nilai`)
                hendleGetAllRevuewerPengabdianByUser()
            }).catch((err) => {
                console.log(err)
            })
            
        }

        setIdNilaiUsulan(id)
        setNilai([])
        setRevisi()
    }

    const hendleSubmitEditNilaiReviewer = () => {

        let data = {
            revisi: revisi,
            nilai: nilai
        }


        setNilai([])

        if (pathname === '/reviewer/data-penelitian') {
            
            axios.post(`http://localhost:3005/api/nilaiUsulan/penelitian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                toast(`Berhasil Mengubah Nilai`)
                hendleGetAllRevuewerPenelitianByUser()
            }).catch((err) => {
                console.log(err)
            })

        }else if (pathname === '/reviewer/data-pengabdian') {
            // console.log(data)

            axios.post(`http://localhost:3005/api/nilaiUsulan/pengabdian`, data, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                toast(`Berhasil Mengubah Nilai`)
                hendleGetAllRevuewerPengabdianByUser()
            }).catch((err) => {
                console.log(err)
            })
            
        }

        setIdNilaiUsulan(id)
        // setNilai([])
        setRevisi()

    } 

    const hendleCloseNilaiReviewer = () => {
        setIdNilaiUsulan(id)
        setDataNilai([])
        setRevisi()
    }
    // 

    useEffect(() => {
        hendleAccesRoleUser()
        if (pathname === '/data-penelitian/tentukan-reviewer' || pathname === '/reviewer/data-penelitian') {     
            hendleGetAllPeneltianAssesment()
            hendleGetAllRevuewerPenelitianByUser()
        }else{
            hendleGetAllPengabdianAssesment()
            hendleGetAllRevuewerPengabdianByUser()
        }
    }, [row, page, searchName])

    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                <div className={`${(popupAddTentuReviewer === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}></div>
                {pathname === '/data-penelitian/tentukan-reviewer' && (
                    <span>Daftar Keanggotan Penelitian</span>
                    )}
                {pathname === '/data-pengabdian/tentukan-reviewer' && (
                    <span>Daftar Keanggotan Pengabdian</span>
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
                                {/* {console.log(pathname)} */}
                                {(pathname === '/data-penelitian/tentukan-reviewer'|| pathname === '/reviewer/data-penelitian') && (
                                    <>
                                        <th>Skema Penelitian</th>
                                        <th>Waktu Penelitian</th>
                                    </>
                                )}
                                {(pathname === '/data-pengabdian/tentukan-reviewer' || pathname === '/reviewer/data-pengabdian') && (
                                    <>
                                        <th>Skema Pengabdian</th>
                                        <th>Waktu Pengabdian</th>
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
                            {pathname === '/data-penelitian/tentukan-reviewer' && (
                                <>
                                {id === 1 && (
                                    penelitianAssesment.length !== 0  && (
                                        penelitianAssesment.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forAdmin}>
                                                    <td>{key +=1 }</td>
                                                    <td>{data?.judul}</td>
                                                    <td>{data?.skema}</td>
                                                    <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                                    <td>{data?.partisipasiPenelitian[0]?.nameUser}</td>
                                                    <td>
                                                        {data.reviewPenelitian.length !== 0 ? 
                                                            data.reviewPenelitian.map((dataaaa,key) => {
                                                                return (
                                                                    <span key={key}>
                                                                        Reviewer {key +=1} : {dataaaa.nameUser}
                                                                    </span>
                                                                )
                                                            }):
                                                            <>
                                                                <span>Reviewer 1 : - </span>
                                                                <span>Reviewer 2 : - </span>
                                                                
                                                            </>
                                                        }
                                                    </td>
                                                    <td>
                                                        {data.reviewPenelitian.length !== 0 ? 
                                                            <p className={style.sedangDiNilai}>Assesment</p>
                                                        :
                                                            <p className={style.diajukan}>Tentukan Assesment</p>
                                                        }
                                                    </td>
                                                    <td>
                                                        <p>
                                                            {data.statusPenelitian === 3 && (
                                                                data?.reviewPenelitian.length === 0 ?
                                                                    <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")}  ${hendleAddTentuReviewer(data.judul)} ${setPopupTentuReviewer('TentukanReviewerPenelitian')}`}>add</span> 
                                                                    :
                                                                    <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${hendleEditTentuReviewerPenelitian(data.id, data.judul)} ${setPopupTentuReviewer('EditReviewerPenelitian')}`}>edit</span> 
                                                                
                                                            )}
                                                            <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                            {/* {console.log(data)} */}
                                                            {opsiMenu == data.id && (
                                                                <div className={style.buttonActionMenu}>
                                                                    <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.id}`}>
                                                                        Rreview
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                )}
                                </>
                            )}
                            {pathname === '/reviewer/data-penelitian' && (
                                <>
                                {id === 2 && (
                                    userReviewerPenelitian.length !== 0 && (
                                        userReviewerPenelitian.map((data,key) => {
                                            return (
                                                <tr key={key} className={style.forReviewer}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.judulPenelitian}</td>
                                                    <td>{data?.penelitian?.skema}</td>
                                                    <td>{`${dateFormat(data?.penelitian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.penelitian?.createdAt, "dd mmm")} ${new Date(data?.penelitian?.createdAt).getFullYear() + Number(data?.penelitian?.lamaKegiatan)}`}</td>
                                                    <td>{data?.sebagai}</td>
                                                    <td>
                                                        {
                                                            (data?.penelitian?.statusPenelitian === 0) && 
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
                                                            {data?.penelitian?.statusPenelitian === 2 && 
                                                                <p className={style.dibiayai}>Approve</p>
                                                            } 
                                                            {data?.penelitian?.statusPenelitian === 1 && (
                                                                    <p className={style.diajukan}>Diajukan</p>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        <p>
                                                            {/* {console.log(data)} */}
                                                            {data.nilaiPenelitian.length !== 0 && (
                                                                <Link className={style.nilaiPenelitian} to={`/data-penelitian/nilaiPenelitian/${data?.id}`}>
                                                                    <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                                </Link>
                                                            )}
                                                            {data.nilaiPenelitian.length == 0 && (
                                                                <span className={`${style.iconOptions} ${style.addOpsi} material-symbols-outlined`}  onClick={() => `${setPopUpNilaiUsulan('AddNilaiUsulan')} ${cekJadwal(data.id, data?.penelitian?.skema)} `} >add</span>
                                                            )}
                                                            {(data.nilaiPenelitian.length !== 0 && data.penelitian.statusPenelitian === 3) && (
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${setPopUpNilaiUsulan('EditNilaiUsulan')} ${hendleEditReviewerByUserPenelitian(data.id)}`} >edit</span>
                                                            )}
                                                            <span id={data?.penelitian?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                            {opsiMenu == data?.penelitian?.id && (
                                                                <div className={style.buttonActionMenu}>
                                                                    <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                        Rreview
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) 
                                
                                )}
                                </>
                            )}
                            {pathname === '/data-pengabdian/tentukan-reviewer' && (
                                <>
                                {id === 1 && (
                                pengabdianAssesment.length !== 0  && (
                                    pengabdianAssesment.map((data,key) => {
                                        return (
                                            <tr key={key} className={style.forAdmin}>
                                                <td>{key +=1 }</td>
                                                <td>{data?.judul}</td>
                                                <td>{data?.skema}</td>
                                                <td>{`${dateFormat(data.createdAt, "dd mmm yyyy")} - ${dateFormat(data.createdAt, "dd mmm")} ${new Date(data.createdAt).getFullYear() + Number(data.lamaKegiatan)}`}</td>
                                                <td>{data?.partisipasiPengabdian[0]?.nameUser}</td>
                                                <td>
                                                    {data.reviewPengabdian.length !== 0 ? 
                                                        data.reviewPengabdian.map((dataaaa,key) => {
                                                            return (
                                                                <span key={key}>
                                                                    Reviewer {key +=1} : {dataaaa.nameUser}
                                                                </span>
                                                            )
                                                        }):
                                                        <>
                                                            <span>Reviewer 1 : - </span>
                                                            <span>Reviewer 2 : - </span>
                                                            
                                                        </>
                                                    }
                                                </td>
                                                <td>
                                                    {data.reviewPengabdian.length !== 0 ? 
                                                        <p className={style.sedangDiNilai}>Assesment</p>
                                                    :
                                                        <p className={style.diajukan}>Tentukan Assesment</p>
                                                    }
                                                </td>
                                                <td>
                                                    <p>
                                                        {data.statusPengabdian === 3 && (
                                                            data?.reviewPengabdian.length === 0 ?
                                                                <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")}  ${hendleAddTentuReviewer(data.judul)} ${setPopupTentuReviewer('TentukanReviewerPengabdian')}`}>add</span> 
                                                                :
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${hendleEditTentuReviewerPengabdian(data.id, data.judul)} ${setPopupTentuReviewer('EditReviewerPengabdian')}`}>edit</span> 
                                                            
                                                        )}
                                                        <span id={data.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                        {/* {console.log(data)} */}
                                                        {opsiMenu == data.id && (
                                                            <div className={style.buttonActionMenu}>
                                                                <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.id}`}>
                                                                    Rreview
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                                )}
                                </>
                            )}
                            {pathname === '/reviewer/data-pengabdian' && (
                                <>
                                {id === 2 && (
                                    userReviewerPengabdian.length !== 0 && (
                                        // console.log(userReviewerPengabdian),
                                        userReviewerPengabdian.map((data,key) => {
                                            return (
                                                // console.log(data),
                                                <tr key={key} className={style.forReviewer}>
                                                    <td>{key += 1}</td>
                                                    <td>{data?.judulPengabdian}</td>
                                                    <td>{data?.pengabdian?.skema}</td>
                                                    <td>{`${dateFormat(data?.pengabdian?.createdAt, "dd mmm yyyy")} - ${dateFormat(data?.pengabdian?.createdAt, "dd mmm")} ${new Date(data?.pengabdian?.createdAt).getFullYear() + Number(data?.pengabdian?.lamaKegiatan)}`}</td>
                                                    <td>{data?.sebagai}</td>
                                                    <td>
                                                        {
                                                            (data?.statusPengabdian === 0) && 
                                                            <p className={style.nonAjukan}>Belum Diajukan</p>
                                                            }
                                                            {data?.statusPengabdian === 3 && 
                                                                <p className={style.gagaldibiayai}>Gagal Dibiayai</p>
                                                            } 
                                                            {data?.statusPengabdian === 4 && 
                                                                <p className={style.gagaldibiayai}>Tidak Dibiayai</p>
                                                            } 
                                                            {data?.statusPengabdian === 5 && 
                                                                <p className={style.dibiayai}>Pengabdian Dibiayai</p>
                                                            } 
                                                            {data?.statusPengabdian === 2 && 
                                                                <p className={style.dibiayai}>Approve</p>
                                                            } 
                                                            {data?.reviewPengabdian?.length !== 0 ?
                                                                data?.statusPengabdian === 1 && (
                                                                    <p className={style.sedangDiNilai}>Sedang Dinilai</p>
                                                                )
                                                            : 
                                                                data?.statusPengabdian === 1 && (
                                                                    <p className={style.diajukan}>Diajukan</p>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        <p>
                                                            {/* {console.log(data)} */}
                                                            {data.nilaiPengabdian.length !== 0 && (
                                                                <Link className={style.nilaiPengabdian} to={`/data-pengabdian/nilaiPengabdian/${data?.id}`}>
                                                                    <span className={`${style.iconOptions} ${style.readOpsi} material-symbols-outlined`}>visibility</span>
                                                                </Link>
                                                            )}
                                                            {data.nilaiPengabdian.length == 0 && (
                                                                <span className={`${style.iconOptions} ${style.addOpsi} material-symbols-outlined`}  onClick={() => `${setPopUpNilaiUsulan('AddNilaiUsulan')} ${cekJadwal(data.id, data?.pengabdian?.skema)} `} >add</span>
                                                            )}
                                                            {(data.nilaiPengabdian.length !== 0 && data.pengabdian.statusPengabdian === 2) && (
                                                                <span className={`${style.iconOptions} ${style.EditOpsi} material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("1")} ${setPopUpNilaiUsulan('EditNilaiUsulan')} ${hendleEditReviewerByUserPengabdian(data.id)}}`}>edit</span>
                                                            )}
                                                            <span id={data?.pengabdian?.id} className={`${style.iconOptions} ${style.opsionOpsi} material-symbols-outlined`} onClick={(e) => hendleMenuOpsi(e)} >more_vert</span>
                                                            {opsiMenu == data?.pengabdian?.id && (
                                                                <div className={style.buttonActionMenu}>
                                                                    <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                        Rreview
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </p>
                                                    </td>
                                                </tr>
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
                            {(popupTentuReviewer === "EditReviewerPenelitian" && reviewer.length !== 0) && (
                                reviewer.map((data, i) => {
                                    return (
                                           <div key={i} className={style.itemPopUp}>
                                               <div className={style.search}>
                                                   <label htmlFor="">{`Reviewer ${(i + 1)}`}</label>
                                                   <div>
                                                        <input type="text" id={i} value={data?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)} ${setNameReviewer(i)}`}/>
                                                        <span id={i} className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput(i, data.id)}>delete</span>
                                                   </div>
                                               </div>
                                               <ul className={style.listName}>
                                                   {i === nameReviewer ?
                                                    listName.length !== 0 && (
                                                       listName.map((data, key) => {
                                                           return (
                                                               <li key={key} id={i} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                           )
                                                       })
                                                    ):""
                                                   }
                                               </ul>
                                           </div>
                                       )
                               })
                            )}
                            {console.log(reviewer)}
                            {popupTentuReviewer === "TentukanReviewerPenelitian" && (
                                reviewer.map((data, i) => {
                                     return (
                                            <div key={i} className={style.itemPopUp}>
                                                <div className={style.search}>
                                                    <label htmlFor="">{`Reviewer ${(i + 1)}`}</label>
                                                    <div>
                                                        <input type="text" id={i} value={data?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)} ${setNameReviewer(i)}`}/>
                                                        <span id={i} className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput(i)}>delete</span>
                                                    </div>
                                                </div>
                                                <ul className={style.listName}>
                                                    {i === nameReviewer ?
                                                     listName.length !== 0 && (
                                                        listName.map((data, key) => {
                                                            return (
                                                                <li key={key} id={i} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                            )
                                                        })
                                                     ):""
                                                    }
                                                </ul>
                                            </div>
                                        )
                                })
                            )}
                            {(popupTentuReviewer === "EditReviewerPengabdian" && reviewer.length !== 0) && (
                                reviewer.map((data, i) => {
                                    return (
                                           <div key={i} className={style.itemPopUp}>
                                               <div className={style.search}>
                                                   <label htmlFor="">{`Reviewer ${(i + 1)}`}</label>
                                                   <div>
                                                        <input type="text" id={i} value={data?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)} ${setNameReviewer(i)}`}/>
                                                        <span id={i} className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput(i, data.id)}>delete</span>
                                                   </div>
                                               </div>
                                               <ul className={style.listName}>
                                                   {i === nameReviewer ?
                                                    listName.length !== 0 && (
                                                       listName.map((data, key) => {
                                                           return (
                                                               <li key={key} id={i} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                           )
                                                       })
                                                    ):""
                                                   }
                                               </ul>
                                           </div>
                                       )
                               })
                            )}
                            {popupTentuReviewer === "TentukanReviewerPengabdian" && (
                                reviewer.map((data, i) => {
                                     return (
                                            <div key={i} className={style.itemPopUp}>
                                                <div className={style.search}>
                                                    <label htmlFor="">{`Reviewer ${(i + 1)}`}</label>
                                                    <div>
                                                        <input type="text" id={i} value={data?.nameUser} placeholder='Search Name Reviewer' onChange={(e) => `${hendleSearchName(e)} ${setNameReviewer(i)}`}/>
                                                        <span id={i} className={`${style.iconOptions} ${style.deleteOpsi} material-symbols-outlined`} onClick={() => hendleRemoveInput(i)}>delete</span>
                                                    </div>
                                                </div>
                                                <ul className={style.listName}>
                                                    {i === nameReviewer ?
                                                     listName.length !== 0 && (
                                                        listName.map((data, key) => {
                                                            return (
                                                                <li key={key} id={i} onClick={(e) => `${hendleSearchNidn(e)}`} >{data.name}</li>
                                                            )
                                                        })
                                                     ):""
                                                    }
                                                </ul>
                                            </div>
                                        )
                                })
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
                        {pathname === '/reviewer/data-penelitian' && (
                            <div className={style.containerPopUpReviewer}>
                                <div className={style.contentTitle}>
                                    <p>Tentukan Nilai </p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("0")} ${hendleCloseNilaiReviewer()}`}>close</span>
                                </div>
                                    {popUpNilaiUsulan === 'AddNilaiUsulan' && (
                                        // console.log(deskripsiPenilaian),
                                        deskripsiPenilaian.length !== 0 && (
                                            deskripsiPenilaian.map((data, key) => {
                                                return (
                                                    <div className={style.itemPopUp} key={key} >
                                                        <div>
                                                            <label htmlFor="">{data.name} <span className={style.wajib}>*</span></label>
                                                        </div>
                                                        <div>
                                                            <select name="" id="" onChange={(e) => setNilai(s => { return [...s, { idDeskripsiPenilaian: data.id, nilai: e.target.value}]})}>
                                                                <option>-- Pilih Nilai --</option>
                                                                <option value={100}>Sangat Baik</option>
                                                                <option value={90}>Baik</option>
                                                                <option value={80}>Cukup</option>
                                                                <option value={70}>Sedang</option>
                                                                <option value={60}>Kurang</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    )}
                                    {popUpNilaiUsulan === "EditNilaiUsulan" && (
                                        // console.log(nilai),
                                        (dataNilai.length !== 0 && nilai.length !== 0) && (
                                            dataNilai.map((data, key) => {
                                                // console.log(data)
                                                return (
                                                    <div className={style.itemPopUp} key={key} >
                                                        <div>
                                                            <label htmlFor="">{data.deskripsiPenilaianPenlitian.name} <span className={style.wajib}>*</span></label>
                                                        </div>
                                                        <div>
                                                                {/* {console.log(nilai[key].nilai)} */}
                                                            <select name="" id={data.id} value={nilai[key].nilai}  onChange={(e) => setNilai(nilai => nilai.map((item, i) => item.id == e.target.id ? {id: Number(e.target.id), nilai: Number(e.target.value) }: item))}>
                                                                <option>-- Pilih Nilai --</option>
                                                                <option value={100}>Sangat Baik</option>
                                                                <option value={90}>Baik</option>
                                                                <option value={80}>Cukup</option>
                                                                <option value={70}>Sedang</option>
                                                                <option value={60}>Kurang</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    )}
                                    <div className={style.revisi}>
                                        <div>
                                            <label htmlFor="">Komentar :</label>
                                        </div>
                                        <div>
                                            <textarea style={{padding: "3px"}} name="" id="" cols="30" rows="10" value={revisi !== null ? revisi : ""}  onChange={(e) => setRevisi(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                <div className={style.conSubmit}>
                                    {popUpNilaiUsulan === "AddNilaiUsulan" && (
                                        <input type="button" value="Submit" onClick={() => `${hendleSubmitAddNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                                    )}
                                    {popUpNilaiUsulan === "EditNilaiUsulan" && (
                                        <input type="button" value="Submit" onClick={() => `${hendleSubmitEditNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                                    )}
                                </div>
                            </div>
                        )}
                        {pathname === '/reviewer/data-pengabdian' && (
                            <div className={style.containerPopUpReviewer}>
                                <div className={style.contentTitle}>
                                    <p>Tentukan Nilai </p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddTentuReviewer("0")} ${hendleCloseNilaiReviewer()}`}>close</span>
                                </div>
                                {popUpNilaiUsulan === 'AddNilaiUsulan' && (
                                        // console.log(deskripsiPenilaian),
                                        deskripsiPenilaian.length !== 0 && (
                                            deskripsiPenilaian.map((data, key) => {
                                                return (
                                                    <div className={style.itemPopUp} key={key} >
                                                        <div>
                                                            <label htmlFor="">{data.name} <span className={style.wajib}>*</span></label>
                                                        </div>
                                                        <div>
                                                            <select name="" id="" onChange={(e) => setNilai(s => { return [...s, { idDeskripsiPenilaian: data.id, nilai: e.target.value}]})}>
                                                                <option>-- Pilih Nilai --</option>
                                                                <option value={100}>Sangat Baik</option>
                                                                <option value={90}>Baik</option>
                                                                <option value={80}>Cukup</option>
                                                                <option value={70}>Sedang</option>
                                                                <option value={60}>Kurang</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    )}
                                    {popUpNilaiUsulan === "EditNilaiUsulan" && (
                                        // console.log(nilai),
                                        (dataNilai.length !== 0 && nilai.length !== 0) && (
                                            dataNilai.map((data, key) => {
                                                console.log(data)
                                                return (
                                                    <div className={style.itemPopUp} key={key} >
                                                        <div>
                                                            <label htmlFor="">{data.deskripsiPenilaianPengabdian.name} <span className={style.wajib}>*</span></label>
                                                        </div>
                                                        <div>
                                                                {/* {console.log(nilai[key].nilai)} */}
                                                            <select name="" id={data.id} value={nilai[key].nilai}  onChange={(e) => setNilai(nilai => nilai.map((item, i) => item.id == e.target.id ? {id: Number(e.target.id), nilai: Number(e.target.value) }: item))}>
                                                                <option>-- Pilih Nilai --</option>
                                                                <option value={100}>Sangat Baik</option>
                                                                <option value={90}>Baik</option>
                                                                <option value={80}>Cukup</option>
                                                                <option value={70}>Sedang</option>
                                                                <option value={60}>Kurang</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    )}
                                <div className={style.revisi}>
                                        <div>
                                            <label htmlFor="">Komentar :</label>
                                        </div>
                                        <div>
                                            <textarea style={{padding: "3px"}} name="" id="" cols="30" rows="10" value={revisi !== null ? revisi : ""}  onChange={(e) => setRevisi(e.target.value)}></textarea>
                                        </div>
                                </div>
                                        
                                <div className={style.conSubmit}>
                                    {popUpNilaiUsulan === "AddNilaiUsulan" && (
                                        <input type="button" value="Submit" onClick={() => `${hendleSubmitAddNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                                    )}
                                    {popUpNilaiUsulan === "EditNilaiUsulan" && (
                                        <input type="button" value="Submit" onClick={() => `${hendleSubmitEditNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/>
                                    )}
                                    {/* <input type="button" value="Submit" onClick={() => `${hendleSubmitEditNilaiReviewer()} ${setPopupAddTentuReviewer("0")}`}/> */}
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