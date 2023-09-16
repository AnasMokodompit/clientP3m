import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidenar"
import style from './Beranda.module.css'
import jwt from 'jwt-decode'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Char
import { Chart } from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import SwiperJadwalP3M from "../../component/swiper/SwiperJadwalP3M"
import axios from "axios"

function Beranda() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [ id, setId] = useState()
    const [totalPenelitian, setTotalPenelitian] = useState(0)
    const [totalPengabdian, setTotalPengabdian] = useState(0)
    const [usulanPenelitian, setUsulanPenelitian] = useState(0)
    const [seleksiPenelitian, setSeleksiPenelitian] = useState(0)
    const [lolosPenelitian, setLolosPenelitian] = useState(0)
    const [ditolakPenelitian, setDitolakPenelitian] = useState(0)
    const [usulanPengabdian, setUsulanPengabdian] = useState(0)
    const [seleksiPengabdian, setSeleksiPengabdian] = useState(0)
    const [lolosPengabdian, setLolosPengabdian] = useState(0)
    const [ditolakPengabdian, setDitolakPengabdian] = useState(0)
    const navigate = useNavigate()

    const [dataChart, setDataChart] = useState([])
    const [data, setData] = useState([])

    // const hendleCekLogin = () => {
    //     console.log(dataLogin)
       
    //     console.log(dataLogin)
    // }

    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setId(decode.roleId) 
    }

    const hendleReadOnly = () => {
    // Penelitian
        // Semua Penelitian 
        axios.get(`http://localhost:3005/api/penelitian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setTotalPenelitian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })


        // Semua Usulan Penelitian 
        axios.get(`http://localhost:3005/api/penelitian/usulan`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setUsulanPenelitian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Seleksi Penelitian
        axios.get(`http://localhost:3005/api/penelitian/seleksi`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setSeleksiPenelitian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Lolos Penelitian
        axios.get(`http://localhost:3005/api/penelitian/lolos`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setLolosPenelitian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Ditolak Penelitian
        axios.get(`http://localhost:3005/api/penelitian/ditolak`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDitolakPenelitian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })


    // Pengabdian
        // Semua Pengabdian 
        axios.get(`http://localhost:3005/api/pengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setTotalPengabdian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })


        // Semua Usulan Pengabdian 
        axios.get(`http://localhost:3005/api/pengabdian/usulan`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setUsulanPengabdian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Seleksi Pengabdian
        axios.get(`http://localhost:3005/api/pengabdian/seleksi`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setSeleksiPengabdian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Lolos Pengabdian
        axios.get(`http://localhost:3005/api/pengabdian/lolos`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setLolosPengabdian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

        // Semua Ditolak Pengabdian
        axios.get(`http://localhost:3005/api/pengabdian/ditolak`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDitolakPengabdian(res.data.data.length)
        }).catch((err) => {
            console.log(err)
        })

    }

    const hendleChart = async () => {
        // Chart
        
        const labels = ["2022", "2023", "2024", "2025"];


        // const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agus", "Sep", "Okt", "Nov", "Des"];
        console.log(dataChart)

        let data = {
            labels: labels,
            datasets: [
                {
                    label: "Penelitian",
                    backgroundColor: "#bfc7d1",
                    borderColor: "#bfc7d1",
                    borderWidth: 1,
                    data: [0,0,0,0],
                },
                {
                    label: "Pengabdian",
                    backgroundColor: "#52616B",
                    borderColor: "#52616B",
                    borderWidth: 1,
                    data: [0,0,0,0],
                },
            ],

        };

        await axios.get(`http://localhost:3005/api/penelitian/statisticPenelitian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(data.datasets[0].data, res.data.data)
            data.datasets[0].data = res.data.data
        }).catch((err) => {
            console.log(err)
        })

        
        await axios.get(`http://localhost:3005/api/pengabdian/statisticPengabdian`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(data.datasets[0].data, res.data.data)
            data.datasets[1].data = res.data.data
        }).catch((err) => {
            console.log(err)
        })

        setData(data)

    }


    useEffect(() => {
        hendleAccesRoleUser()
        hendleReadOnly()
        hendleChart()
    }, [])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
                <Navbar/>
                <div className={style.content}>
                        <div>        
                            {id === 1 && (
                                <span>
                                    Beranda Admin
                                </span>
                            )}
                            {id === 2 && (
                                <span>
                                    Beranda Reviewer
                                </span>
                            )}
                            {id === 3 && (
                                <span>
                                    Beranda Dosen
                                </span>
                            )}
                            {id === 4 &&(
                                <span>
                                    Beranda Mahasiswa
                                </span>
                            )}
                            <div className={style.containerItem}>
                                <div className={style.infomation}>
                                    <div className={style.swiperjs}>
                                        <SwiperJadwalP3M/>
                                    </div>
                                    <div className={style.contentItemLeft}>
                                        <div className={style.cardPenelitian}>
                                            <div className={style.logoCard}>
                                                <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                                            </div>
                                            <div className={style.detailContentItemLeft}>
                                                <p>{totalPenelitian}</p>
                                                <p>Total Penelitian</p>
                                            </div>
                                        </div>
                                        <div className={style.cardPengabdian}>
                                            <div className={style.logoCard}>
                                                <span className={`${style.icon} material-symbols-outlined`}>partner_exchange</span>
                                            </div>
                                            <div className={style.detailContentItemLeft}>
                                                <p>{totalPengabdian}</p>
                                                <p>Total Pengabdian</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.sideDua}>
                                    <div className={style.chart}>
                                        <div className={style.menuChart}>
                                            <span className="material-symbols-outlined">menu</span>
                                        </div>
                                        {data.length !== 0 ? 
                                            <Bar className={style.tes}  data={data} />
                                            : ""
                                        }
                                    </div>
                                    <div className={style.pemberitahun}>
                                        <div className={style.usulan}>
                                            <p>Penelitian</p>
                                            <div className={style.usulanItem}>
                                                {id !== 1 && (
                                                    <span>Pengusulan</span>
                                                )}
                                                {id === 1 && (
                                                    <span>Usulan</span>
                                                )}
                                                <p className={style.detail}>    
                                                    <span>{usulanPenelitian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Seleksi</span>
                                                <p className={style.detail}>  
                                                    <span>{seleksiPenelitian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Lolos</span>
                                                <p className={style.detail}>
                                                    <span>{lolosPenelitian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Ditolak</span>
                                                <p className={style.detail}>
                                                    <span>{ditolakPenelitian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={style.usulan}>
                                            <p>Pengabdian</p>
                                            <div className={style.usulanItem}>
                                                {id !== 1 && (
                                                    <span>Pengusulan</span>
                                                )}
                                                {id === 1 && (
                                                    <span>Usulan</span>
                                                )}
                                                <p className={style.detail}>    
                                                    <span>{usulanPengabdian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Seleksi</span>
                                                <p className={style.detail}>  
                                                    <span>{seleksiPengabdian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Lolos</span>
                                                <p className={style.detail}>
                                                    <span>{lolosPengabdian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                            <div className={style.usulanItem}>
                                                <span>Ditolak</span>
                                                <p className={style.detail}>
                                                    <span>{ditolakPengabdian}</span>
                                                    <span className="material-symbols-outlined">open_in_new</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Beranda