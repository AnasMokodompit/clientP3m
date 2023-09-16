import { useState } from "react"
import style from "./Login.module.css"
import { useDispatch, useSelector } from "react-redux"
import registerEmail from "../../config/actions/userAction"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [ username, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    


    const hendleLogin = async(e) => {

        const login = {
            email: username,
            password: password
        }

        axios.post(`http://localhost:3005/api/users/login`, login)
        .then((res) => {
            
            dispatch(registerEmail(username, password))
            
            setTimeout(() => {     
                navigate("/beranda")
            }, 400);
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else{
                toast(err.response.data.message)
            }
        })
    }

    // setInterval(() => {
    //     window.location.reload(false);
    // }, 1000);

    useEffect(() => {
    },[])

    return (
        <div className={style.container}>
            <ToastContainer/>
            <div className={style.style}>
                <div>
                    <span>Selamat Datang di Sistem Informasi Pusat Penelitian dan Pengabdian pada Masyarakat Politeknik Negeri Manado.</span>
                    {/* <p className={style.info}>Untuk Ingin Mendaftar Hubungi Admin <span>085696241363</span></p> */}
                </div>
            </div>
            <div className={style.form_container}>
                <form action="" className={style.sign_up_form}>
                    <h4 className={style.title}>Sign In</h4>
                    <div className={style.input_field}>
                        <span className="material-symbols-outlined">person</span>
                        <input type="text" placeholder="Email Or Username" onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className={style.input_field}>
                        <span className="material-symbols-outlined">lock</span>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* <div className={style.forgetPswd}>
                       <span>Lupa Password</span>
                    </div> */}
                    <input className={style.login} type="button" value="LOGIN" onClick={ (e) => hendleLogin(e)}/>
                </form>
            </div>
        </div>
    )
}

export default Login