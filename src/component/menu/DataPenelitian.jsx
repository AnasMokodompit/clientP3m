
import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidenar"
import style from './StyleMenu.module.css'
import TableData from "../TableData"
import jwt from 'jwt-decode'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function DataPenelitian() {
    const {dataLogin} = useSelector(tes => tes.p3m)
    const [ id, setId] = useState()
    const navigate = useNavigate()

    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setId(decode.roleId) 
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
                    {id === 4 &&(
                        <span>
                            Data Penelitian Mahasiswa
                        </span>
                    )}
                    {id === 3 && (
                        <span>
                            Data Penelitian Dosen
                        </span>
                    )}
                    {id === 2 && (
                        <span>
                            Data Penelitian Reviewer
                        </span>
                    )}
                    {id === 1 && (
                        <span>
                            Data Penelitian Admin
                        </span>
                    )}
                        <div>
                            <TableData/>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default DataPenelitian