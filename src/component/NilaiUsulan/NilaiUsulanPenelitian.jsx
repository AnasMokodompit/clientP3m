import style from './NilaiUsulanPenelitian.module.css'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode';


function NilaiUsulanPenelitian() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [ComponenDisplay, setComponenDisplay] = useState()
    const {id} = useParams()
    const {pathname} = useLocation()
    const [dataNilai, setDataNilai] = useState([])
    const [roleId, setRoleId] = useState()
    const [reviewerSebagai, setReviewerSebagai] = useState('')
    const [dataPenilaian, setDataPenilaian] = useState([])
    const [dataReviewer, setDataReviewer] = useState([])


    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId) 


        // console.log(decode.roleId)
        if (pathname === `/data-penelitian/nilaiPenelitian/${id}`){
            
            if (decode.roleId === 2) {
                hendleGetNilaiPenelitianByReviewer()
            }else if (decode.roleId === 3 || decode.roleId === 1 || decode.roleId === 4) {
                hendleGetReviewerAllByJudulPenelitian()
            }
        }else{
            if (decode.roleId === 2) {
                hendleGetNilaiPengabdianByReviewer()
            }else if (decode.roleId === 3 || decode.roleId === 1 || decode.roleId === 4) {
                hendleGetReviewerAllByJudulPengabdian()
            }

        }
    }

    const hendleGetReviewerAllByJudulPenelitian = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/reviewerPenelitian?idJudulPenelitian=${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataReviewer(res.data.data?.reviewPenelitian)
            setComponenDisplay(res.data.data?.reviewPenelitian[0].sebagai)

            if (res.data.data?.reviewPenelitian[0].sebagai) {
                
                axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/penelitian?id=${res.data.data?.reviewPenelitian[0].id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    setDataNilai(res.data.data)
                    setDataPenilaian(res.data.data?.nilaiPenelitian?.nilaiPenelitian)
                    // console.log(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleGetNilaiPenelitianByReviewer = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                // console.log(res.data.data)
                setDataPenilaian(res.data.data?.nilaiPenelitian)
                setReviewerSebagai(res.data.data?.Reviewer?.sebagai)
                setDataNilai(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const hendleGetNilaiPenelitian = (idNilai) => {
        axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/penelitian?id=${idNilai}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataNilai(res.data.data)
            setDataPenilaian(res.data.data?.nilaiPenelitian?.nilaiPenelitian)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    
    const hendleGetReviewerAllByJudulPengabdian = () => {
        console.log('tes')
        axios.get(`${process.env.REACT_APP_BASE_API}/reviewerPengabdian?idJudulPengabdian=${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            setDataReviewer(res.data.data?.reviewPengabdian)
            setComponenDisplay(res.data.data?.reviewPengabdian[0].sebagai)

            if (res.data.data?.reviewPengabdian[0].sebagai) {
                
                axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/pengabdian?id=${res.data.data?.reviewPengabdian[0].id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    setDataNilai(res.data.data)
                    setDataPenilaian(res.data.data?.nilaiPengabdian?.nilaiPengabdian)
                    // console.log(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleGetNilaiPengabdianByReviewer = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                console.log(res.data.data)
                setDataPenilaian(res.data.data?.nilaiPengabdian)
                setReviewerSebagai(res.data.data?.Reviewer?.sebagai)
                setDataNilai(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    

    const hendleGetNilaiPengabdian = (idNilai) => {
       
        axios.get(`${process.env.REACT_APP_BASE_API}/nilaiUsulan/pengabdian?id=${idNilai}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataNilai(res.data.data)
            setDataPenilaian(res.data.data?.nilaiPengabdian?.nilaiPengabdian)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        hendleAccesRoleUser()
    }, [])



    return (
        <div className={style.container}>
        <Sidebar/>
            <div className={style.kanan}>
                <Navbar/>
                <div className={style.content}>
                    <span className={style.title}>
                        Profile Saya
                    </span>
                    <div className={style.userShow}>
                        <div className={style.containerKiri}>
                            <div className={style.navbarComponent}>
                                {/* {console.log(roleId)} */}
                                {(roleId === 3 || roleId === 1 || roleId === 4) && (
                                    <>
                                    {pathname === `/data-penelitian/nilaiPenelitian/${id}` && (
                                        dataReviewer.length !== 0 && (
                                            dataReviewer.map((data, key) => {
                                                return (
                                                    <div key={key} className={`${style.navbarItem} ${ComponenDisplay === data.sebagai ? style.navbarActive :'' }`} onClick={() => `${setComponenDisplay(data.sebagai)} ${hendleGetNilaiPenelitian(data.id)}`}>{data.sebagai}</div>
                                                )
                                            })
                                        )
                                    )}
                                    {pathname === `/data-pengabdian/nilaiPengabdian/${id}` && (
                                        dataReviewer.length !== 0 && (
                                            dataReviewer.map((data, key) => {
                                                return (
                                                    <div key={key} className={`${style.navbarItem} ${ComponenDisplay === data.sebagai ? style.navbarActive :'' }`} onClick={() => `${setComponenDisplay(data.sebagai)} ${hendleGetNilaiPengabdian(data.id)}`}>{data.sebagai}</div>
                                                )
                                            })
                                        )
                                    )}
                                    </>
                                )}
                                {roleId === 2 && (
                                    console.log(reviewerSebagai),
                                    <div className={`${style.navbarItem} ${style.navbarActive}`}>{reviewerSebagai}</div>
                                )}
                            </div>
                            <div className={style.hasilPenilaian}>
                                {/* {console.log(dataNilai?.rataRataAndTotal !== undefined)} */}
                                {/* {dataNilai?.rataRataAndTotal !== undefined && (
                                    console.log(dataNilai?.rataRataAndTotal[0]?._sum.nilai)
                                ) } */}
                                <p>Nilai Rata-Rata : <span>{dataNilai?.rataRataAndTotal !== undefined ? dataNilai?.rataRataAndTotal[0]?._avg.nilai : ''}</span></p>
                                <p>Nilai Total : <span>{dataNilai?.rataRataAndTotal !== undefined ? dataNilai?.rataRataAndTotal[0]?._sum.nilai : ''}</span></p>
                            </div>
                        </div>
                        <form className={style.formUser} action="">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Deskripsi Penilaian</th>
                                        <th>Nilai</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pathname === `/data-penelitian/nilaiPenelitian/${id}` && (
                                        <>
                                            {dataPenilaian.length !== 0 && (
                                                // console.log(dataPenilaian, "ada"),
                                                dataPenilaian.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                <label htmlFor="">{data?.deskripsiPenilaianPenlitian?.name}</label>
                                                            </td>
                                                            <td>
                                                                {/* {(data?.rataRataAndTotal !== undefined) ? console.log(dataNilai.nilaiPenelitian.length) : ""} */}
                                                                <p>{(data?.nilai !== undefined && data?.nilai.length !== 0) ? data.nilai : ""}</p>
                                                            </td>
                                                            <td>
                                                                {(data?.nilai !== undefined && data.nilai === 100)? "Sangat Baik" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 90)? "Baik" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 80)? "Cukup" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 70)? "Sedang" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 60)? "Kurang" : ""}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )}
                                        </>
                                    )}
                                    {pathname === `/data-pengabdian/nilaiPengabdian/${id}` && (
                                        <>
                                            {/* {console.log(dataNilai)} */}
                                            {dataPenilaian.length !== 0 && (
                                                // console.log(dataPenilaian, "ada"),
                                                dataPenilaian.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                <label htmlFor="">{data?.deskripsiPenilaianPengabdian?.name}</label>
                                                            </td>
                                                            <td>
                                                                {/* {(data?.rataRataAndTotal !== undefined) ? console.log(dataNilai.nilaiPenelitian.length) : ""} */}
                                                                <p>{(data?.nilai !== undefined && data?.nilai.length !== 0) ? data.nilai : ""}</p>
                                                            </td>
                                                            <td>
                                                                {(data?.nilai !== undefined && data.nilai === 100)? "Sangat Baik" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 90)? "Baik" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 80)? "Cukup" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 70)? "Sedang" : ""}
                                                                {(data?.nilai !== undefined && data.nilai === 60)? "Kurang" : ""}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            
                        </form>
                    </div>
                </div>
            </div>
    </div>
    )
}


export default NilaiUsulanPenelitian