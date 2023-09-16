
import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidenar"
import style from './StyleMenu.module.css'
import jwt from 'jwt-decode'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import TableData from "../TableData"

function DataPengabdian() {
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
                            Data Pengabdian Mahasiswa
                        </span>
                    )}
                    {id === 3 && (
                        <span>
                            Data Pengabdian Dosen
                        </span>
                    )}
                    {id === 2 && (
                        <span>
                            Data Pengabdian Reviewer
                        </span>
                    )}
                    {id === 1 && (
                        <span>
                            Data Pengabdian Admin
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

export default DataPengabdian