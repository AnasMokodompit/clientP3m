
import { Link, useNavigate } from 'react-router-dom'
import style from './Register.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"


function Register() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [nama, setNama] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const hendleDeleteInputDataRegister = () => {
        setUsername('')
        setNama('')
        setRole('')
        setEmail('')
        setPassword('')
    }


    const hendleSumbitDataRegisterAkun = () => {
        const dataUserCreate = {
            username,
            name: nama,
            email,
            password,
            roleId: role
        }

        axios.post(`http://localhost:3005/api/users`, dataUserCreate, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            toast(`User Berhasil Ditambahkan`)
            navigate('/login')
        }).catch((err) => {
            toast(`User Gagal Ditambahkan`)
            console.log(err)
        })
    }


    return (
        <div className={style.container}>
            <ToastContainer/>
            <div className={style.content}>
                <div className={style.conItemJudul}>
                    <span></span>
                    <h4>Register P3M Politeknik Negeri Manado</h4>
                </div>
                <div className={style.conItem}>
                    <label htmlFor="">Username <span className={style.wajib}>*</span></label>
                    <input type="text" value={username} placeholder='Jawaban Anda' onChange={(e) =>setUsername(e.target.value)}/>
                </div>
                <div className={style.conItem}>
                    <label htmlFor="">Nama <span className={style.wajib}>*</span></label>
                    <input type="text" value={nama} placeholder='Jawaban Anda' onChange={(e) =>setNama(e.target.value)}/>
                </div>
                <div className={style.conItem}>
                    <label htmlFor="">Role User <span className={style.wajib}>*</span></label>
                    <select className={style.select} name="" id="" value={role} onChange={(e) =>setRole(e.target.value)}>
                        <option>Pilih</option>
                        <option value="1">Admin</option>
                        <option value="2">Reviewer</option>
                        <option value="3">Dosen</option>
                        <option value="4">Mahasiswa</option>
                    </select>
                </div>
                <div className={style.conItem}>
                    <label htmlFor="">Email <span className={style.wajib}>*</span></label>
                    <input type="email" value={email} placeholder='Jawaban Anda' onChange={(e) =>setEmail(e.target.value)}/>
                </div>
                <div className={style.conItem}>
                    <label htmlFor="">Password <span className={style.wajib}>*</span></label>
                    <input type="password" value={password} placeholder='Jawaban Anda' onChange={(e) =>setPassword(e.target.value)}/>
                </div>
                <div className={style.conItemButton}>
                    <input type="button" value="Kirim"  onClick={hendleSumbitDataRegisterAkun}/>
                    <Link onClick={hendleDeleteInputDataRegister}>Kosongkan formulir</Link>
                </div>
            </div>
        </div>
    )
}

export default Register