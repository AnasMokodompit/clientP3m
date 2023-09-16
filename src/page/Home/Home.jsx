import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import jwt from 'jwt-decode'
import { useEffect } from "react"



function Home() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const navigate = useNavigate()

    
    const hendleCekLogin = () => {
        if (dataLogin === null) {
            navigate('/login')
        }else if(dataLogin?.dataLogin?.token){
            const { exp } = jwt(dataLogin?.dataLogin?.token)

            const expirationTime = (exp * 1000) - 60000

            if (Date.now() >= expirationTime) {
                localStorage.clear();
                navigate("/login");
            }else{
                navigate('/beranda')
            }
        }

        console.log(dataLogin)
    }

    useEffect(() => {
        hendleCekLogin()
    }, [])

    
    return (
        <div>
            <Link to="/login">Login</Link> 
                HALAMAN INI AKAN MENAMPILKAN BERBAGAI KEGIATAN KEGIATAN P3M YANG TELAH DILAKUKAN
            <Link to="/beranda">Beranda</Link>
        </div>
    )
}

export default Home