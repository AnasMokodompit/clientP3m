
import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidenar"
import style from './StyleMenu.module.css'
import jwt from 'jwt-decode'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import TabelDataPengguna from "../table/TabelDataPengguna"

function DataPengguna() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [ id, setId] = useState()
    const navigate = useNavigate()

    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setId(decode.roleId) 
    }

    console.log(id)
    useEffect(() => {
        hendleAccesRoleUser()
    }, [])


    return (
        <div className={style.container}>
            <Sidebar/>
            <div className={style.kanan}>
                <Navbar/>
                <div className={style.content}>
                    Data Pengguna
                    <div>
                        <TabelDataPengguna/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataPengguna