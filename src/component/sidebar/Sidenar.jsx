import style from './Sidebar.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import jwt from 'jwt-decode'
import axios from 'axios'

function Sidebar() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [toggle, setToggle] = useState(false)
    const [sideDrop, setSideDrop] = useState(false)
    const [ id, setId] = useState()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [sideDrown, setSideDrown] = useState('0')



    const isMenu = () => {
        setToggle(!toggle)
    }

    const hendleLogicSideDropDown = (data) => {

        if (data === 'data-penelitian') {
            if (sideDrown === 'data-penelitian') {
                setSideDrown('')
            }else{
                setSideDrown('data-penelitian')
            }
        }else if (data === 'data-pengabdian') {
            if (sideDrown === 'data-pengabdian') {
                setSideDrown('')
            }else{
                setSideDrown('data-pengabdian')
            }
        }else if (data === 'data-reviewer') {
            if (sideDrown === 'data-reviewer') {
                setSideDrown('')
            }else{
                setSideDrown('data-reviewer')
            }
        }else if (data === 'masterData') {
            if (sideDrown === 'masterData') {
                setSideDrown('')
            }else{
                setSideDrown('masterData')
            }
        }else if (data === 'Laporan') {
            if (sideDrown === 'Laporan') {
                setSideDrown('')
            }else{
                setSideDrown('Laporan')
            }
            
        }
    }

    const hendleAccesRoleUser = () => {
        if (dataLogin?.dataLogin?.token) {       
            const decode = jwt(dataLogin.dataLogin.token)
            setId(decode.roleId) 
            // console.log(decode)
        }
    }

    const authKadaluarsa = () => {
        // console.log(dataLogin)
        if (dataLogin === null) {
            navigate('/login')
        }else if (dataLogin?.dataLogin?.token) {
            const { exp } = jwt(dataLogin?.dataLogin?.token)

            // console.log(exp)

            const expirationTime = (exp * 1000) - 60000
    
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                navigate("/login");
            }
            
        }
    }


    const hendleExpireTime = async () => {

        let nameJadwal = "Penilaian Usulan"
        let pesanError = ""
        let dateLama =  ""

        await axios.get(`${process.env.REACT_APP_BASE_API}/penJadwalan?searchJudulJadwal=${nameJadwal}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            dateLama = new Date(res.data.data[0].tglAkhir).getTime()
            setDataAkhir(new Date(res.data.data[0].tglAkhir).getTime() - new Date().getTime())
        }).catch((err) => {
            console.log(err)
        })
        
            
        let x = setInterval(() => {
            const date = new Date().getTime()
            
            let hasil = dateLama - date;
            
            // console.log(hasil)

            let days = Math.floor(hasil / (1000 * 60 * 60 * 24));
            let hours = Math.floor((hasil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((hasil % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((hasil % (1000 * 60)) / 1000);

            // console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")

            // console.log(date, dateLama)

            // console.log(hasil, (hasil <= 0 && hasil >= -1000))

            if (hasil <= 0 && hasil >= -1000) {
                console.log(hasil, 'Waktu Telah Berakhir')
                axios.patch(`${process.env.REACT_APP_BASE_API}/penelitian/${id}`, {statusDibiayai: true}, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    console.log(res.data.data)
                })
                axios.patch(`${process.env.REACT_APP_BASE_API}/pengabdian/${id}`, {statusDibiayai: true}, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    console.log(res.data.data)
                })
                clearInterval(x)
            }
    
        }, 1000);
        // }

    }
    
    useEffect(() => {

        authKadaluarsa()
        hendleAccesRoleUser()

        hendleExpireTime();
    }, [])
    

    return (
        <div className={`${style.sidebar} ${toggle ? style.active : style.nonSctive}`}>
            <div className={style.item}>
                <span className={`${style.menu} material-symbols-outlined ${style.icon}`} onClick={isMenu}>menu</span>
                <span>P3M Polimdo</span>    
            </div>
            <div className={style.menuNavbar}>
                {/* <ul className={style.sideMenu}> */}
                    <ul className={style.sideMenu}>
                        <li>
                            <Link className={`${(pathname === '/beranda') ? style.side : ''} ${style.menu}`} to='/beranda'>
                                <span className={`${style.icon} material-symbols-outlined`}>home</span>
                                <span className={`${style.menuSidebar}`}>Beranda</span>
                            </Link>
                        </li>
                        {/* {(id === 3 || id === 2)  && ( */}
                        {(id === 3)  && (
                            <>
                                <li>
                                    <Link className={`${(pathname === '/data-penelitian') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('data-penelitian')}>    
                                        <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                                        <span className={`${style.menuSidebar}`}>Penelitian</span>
                                        <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "data-penelitian" ? style.yes : ''}`}>chevron_right</span>
                                    </Link>
                                    <ul className={`${style.side_dropdown} ${sideDrown === "data-penelitian" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                        <li>
                                            <Link to='/data-penelitian' >Usulan</Link> 
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/nilai'>Nilai Penelitian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/revisi'>Revisi Usulan</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/Add'>Tambah Penelitian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/Keangotaan'>Keanggotaan</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${(pathname === '/data-pengabdian') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('data-pengabdian')}>    
                                        <span className={`${style.icon} material-symbols-outlined`}>partner_exchange</span>
                                        <span className={`${style.menuSidebar}`}>Pengabdian</span>
                                        <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "data-pengabdian" ? style.yes : ''}`}>chevron_right</span>
                                    </Link>
                                    <ul className={`${style.side_dropdown} ${sideDrown === "data-pengabdian" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                        <li>
                                            <Link to='/data-pengabdian' >Usulan</Link> 
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/nilai'>Nilai Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/revisi'>Revisi Usulan</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/Add'>Tambah Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/Keangotaan'>Keanggotaan</Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                        {id === 2 && (
                            <li>
                                <Link className={`${(pathname === '/data-reviewer') ? style.side : ''} ${style.menu}`} onClick={(e) => hendleLogicSideDropDown('data-reviewer')}>    
                                    <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                                    <span className={`${style.menuSidebar}`}>Data Reviewer</span>
                                    <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "data-reviewer" ? style.yes : ''}`}>chevron_right</span>
                                </Link>
                                <ul className={`${style.side_dropdown} ${sideDrown === "data-reviewer" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                    <li>
                                        <Link to='/reviewer/data-penelitian' >Penelitian</Link> 
                                    </li>
                                    <li>
                                        <Link to='/reviewer/data-pengabdian'>Pengabdian</Link>
                                    </li>
                                    <li>
                                        <Link to='/reviewer/laporan'>Laporan</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {id === 4 && (
                            <> 
                                <li>
                                    <Link className={`${(pathname === '/data-penelitian') ? style.side : ''} ${style.menu}`} to='/data-penelitian'>    
                                        <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                                        <span className={`${style.menuSidebar}`}>Penelitian</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`${(pathname === '/data-pengabdian') ? style.side : ''} ${style.menu}`} to='/data-pengabdian'>    
                                        <span className={`${style.icon} material-symbols-outlined`}>partner_exchange</span>
                                        <span className={`${style.menuSidebar}`}>Pengabdian</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {id === 1 &&(
                            <>
                                <li>
                                    <Link className={`${(pathname === '/data-penelitian') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('data-penelitian')}>    
                                        <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                                        <span className={`${style.menuSidebar}`}>Penelitian</span>
                                        <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "data-penelitian" ? style.yes : ''}`}>chevron_right</span>
                                    </Link>
                                    <ul className={`${style.side_dropdown} ${sideDrown === "data-penelitian" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                        <li>
                                            <Link to='/data-penelitian'>Data Penelitian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/skema'>Skema Penelitian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/deskripsiPenilaian'>Deskripsi Penilaian Penilaian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/tentukan-reviewer' >Tentukan Reviewer</Link> 
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/nilai'>Nilai Penelitian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-penelitian/ApprovUsulan' >Aprrov Penelitian</Link> 
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${(pathname === '/data-pengabdian') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('data-pengabdian')}>    
                                        <span className={`${style.icon} material-symbols-outlined`}>partner_exchange</span>
                                        <span className={`${style.menuSidebar}`}>Pengabdian</span>
                                        <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "data-pengabdian" ? style.yes : ''}`}>chevron_right</span>
                                    </Link>
                                    <ul className={`${style.side_dropdown} ${sideDrown === "data-pengabdian" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                        <li>
                                            <Link to='/data-pengabdian'>Data pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/skema'>Skema Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/ruangLingkupSkema'>Ruang Lingkup Skema Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/deskripsiPenilaian'>Deskripsi Penilaian Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/tentukan-reviewer' >Tentukan Reviewer</Link> 
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/nilai'>Nilai Pengabdian</Link>
                                        </li>
                                        <li>
                                            <Link to='/data-pengabdian/ApprovUsulan' >Aprrov Pengabdian</Link> 
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${(pathname === '/masterData') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('masterData')}>
                                        <span className={`${style.icon} material-symbols-outlined`}>home</span>
                                        <span className={`${style.menuSidebar}`}>Master Data</span>
                                        <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "masterData" ? style.yes : ''}`}>chevron_right</span>
                                    </Link>
                                    <ul className={`${style.side_dropdown} ${sideDrown === "masterData" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                        <li>
                                            <Link to='/masterData/penjadwalan'>Penjadwalan</Link>
                                        </li>
                                        <li>
                                            <Link to='/masterData/jurusan'>Jurusan</Link>
                                        </li>
                                        <li>
                                            <Link to='/masterData/prodi'>Program Studi</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${(pathname === '/data-pengguna') ? style.side : ''} ${style.menu}`} to='/data-pengguna'>    
                                        <span className={`${style.icon} material-symbols-outlined`}>badge</span>
                                        <span className={`${style.menuSidebar}`}>Data Pengguna</span>
                                    </Link>
                                </li>
                            </>
                        )}   
                        <li>
                            <Link className={`${(pathname === '/Laporan') ? style.side : ''} ${style.menu}`} onClick={() => hendleLogicSideDropDown('Laporan')}>    
                                <span className={`${style.icon} material-symbols-outlined`}>description</span>
                                <span className={`${style.menuSidebar}`}>Laporan</span>
                                <span className={`${style.iconRight} material-symbols-outlined  ${sideDrown === "Laporan" ? style.yes : ''}`}>chevron_right</span>
                            </Link>
                            <ul className={`${style.side_dropdown} ${sideDrown === "Laporan" ? style.side : ""} ${sideDrop ? style.tes : ''}`}>
                                {id === 1 &&(
                                    <>
                                        <li>
                                            <Link to='/laporan/tentukan-reviewer'>Tentukan Reviewer</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <Link to='/catatan-harian'>Catatan Harian</Link>
                                </li>
                                <li>
                                    <Link to='/laporan-kemajuan'>Kemajuan</Link>
                                </li>
                                <li>
                                    <Link to='/laporan-akhir'>Akhir</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </div>
        </div>
    )
}

export default Sidebar