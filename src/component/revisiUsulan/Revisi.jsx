import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidenar"
import { useState } from 'react'
import style from './RevisiUsulan.module.css'
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useEffect } from "react"
import jwt from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import {saveAddPdf, EditDataPdf, DeleteDataPdf, ResetDatSavePdf} from '../../config/actions/SavePdfAction'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



function Revisi() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {optionsPdf} = useSelector(tes => tes.dataPdf)
    const [penelitian, setPenelitian] = useState([])
    const [pengabdian, setPengabdian] = useState([])
    const {pathname} = useLocation()
    const [roleId, setRoleId] = useState()
    const dispatch = useDispatch()




    const hendleAccesRoleUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId) 
    }

    const getAllDataPenelitian = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId)
            axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/usulan?statusRevisi=true`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                console.log(res.data.data)
                setPenelitian(res.data.data)
            }).catch((err)=> {
                console.log(err)
            })
    }

    const getAllDataPengabdian = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId)
            axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/usulan?statusRevisi=true`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                console.log(res.data.data)
                setPengabdian(res.data.data)
            }).catch((err)=> {
                console.log(err)
            })
    }

    const hendleKirimRevisiUsulan = (id, idPdf) => {
        // console.log(id, optionsPdf?.pictureAsFile)
        const formData = new FormData();

        // return console.log(id, idPdf)

        if (id === undefined) {
            alert('Masukan PDF Pada Edit Usulan')
        }else{

            const cekPdf = optionsPdf.filter(data => data.id == idPdf)
    
            // return console.log(cekPdf)
    
            formData.append('usulan_pdf_revisi', cekPdf[0]?.pictureAsFile)
    
    
            axios.patch(`${process.env.REACT_APP_BASE_API}/dokumen/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                if (pathname === "/data-penelitian/revisi") {
                    getAllDataPenelitian()
                }else{
                    getAllDataPengabdian()
                }
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message[0].msg) {
                    toast(err.response.data.message[0].msg)
                }else{
                    toast(err.response.data.message)
                }
            })
        }

        dispatch(DeleteDataPdf(idPdf))

    }

    const uploadPicture = (e) => {

        console.log(e.target.id)

        const optios = {
            id: e.target.id,
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
            namePdf: e.target.files[0].name
        }


        if (optionsPdf.length === 0) {
            dispatch(saveAddPdf(optios))
        }else{

            const cekPdf = optionsPdf.filter(data => data.id == e.target.id)
            
            console.log(cekPdf)
            
            if (cekPdf.length !== 0) {
                dispatch(EditDataPdf(optios))
            }else{
                dispatch(saveAddPdf(optios))
            }
            
        }

        console.log(optionsPdf)
        
    }

    useEffect(() => {
        hendleAccesRoleUser()
        if (pathname === "/data-penelitian/revisi" ) {
            getAllDataPenelitian()
        }else{
            getAllDataPengabdian()
        }
    }, [])


    return (
        <div className={style.container}>
            {console.log(penelitian)}
            <Sidebar/>
                <div className={style.kanan}>
                    <Navbar/>
                    <div className={style.content}>
                        <ToastContainer/>
                        <span>Revisi Usulan Proposal</span>
                        {/* {pathname === "/data-penelitian/revisi" && ( */}
                            <div className={style.conTable}>
                                <div className={style.buttonCreate}>
                                    <div className={style.entitas}>
                                        <span>Show</span>
                                        <select name="" id="">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        <span>Entitas</span>
                                    </div>
                                </div>    
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Judul</th>
                                            {pathname === "/data-penelitian/revisi" && (
                                                <th>Skema Penelitian</th>
                                            )}
                                            {pathname === "/data-pengabdian/revisi" && (
                                                <th>Skema Pengabdian</th>
                                            )}
                                            <th>File Revisi</th>
                                            <th>Revisi</th>
                                            {/* <th>Nilai</th> */}
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {pathname === "/data-penelitian/revisi" && 
                                        penelitian.length !== 0 && 
                                            penelitian.map((data, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{key += 1}</td>
                                                        <td>{data?.penelitian?.judul}</td>
                                                        <td>{data?.penelitian?.skema}</td>
                                                        <td className={style.stylePdf}>
                                                            {optionsPdf.length !== 0 && (
                                                                optionsPdf.map((dataa, key) => {
                                                                    return (
                                                                        dataa.id == data.id && (
                                                                            <Link key={key} to="reviewPdf">{dataa?.pictureAsFile?.type ? dataa?.namePdf : ""}</Link>
                                                                        )

                                                                    )
                                                                })

                                                            )} 
                                                        </td>
                                                        <td>
                                                            {data.penelitian.reviewPenelitian.map((data, key) => {
                                                                // console.log(data)
                                                                return (
                                                                    <p key={key}><span>Revisi {data.sebagai} : </span><span>{data.revisi}</span></p>
                                                                )
                                                            })}
                                                        </td>
                                                        <td>
                                                            {roleId !== 4 && (
                                                                <>     
                                                                    <Link to={`/data-penelitian/Edit/${data?.penelitian?.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon1} material-symbols-outlined`}>edit</span>
                                                                    </Link>
                                                                    <div>
                                                                        {/* {console.log(data.id)} */}
                                                                        <input type="file" accept="application/pdf" id={data.id} multiple hidden  onChange={(e) => uploadPicture(e)}/>
                                                                        <label  htmlFor={data.id}> 
                                                                            <span className={`${style.iconOptions} ${style.icon2} material-symbols-outlined`}>upload</span>
                                                                        </label>
                                                                    </div>
                                                                    <Link className={style.pdfUsulanPenelitian} to={`/data-penelitian/pdf/${data?.penelitian?.id}`}>
                                                                        <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                    </Link>
                                                                    <span id={`${data.id}`} className={`${style.iconOptions} ${style.icon4} material-symbols-outlined`} onClick={(e) => hendleKirimRevisiUsulan(data?.penelitian?.Dokumen[0]?.id, e.target.id)} >send</span>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                    {pathname === "/data-pengabdian/revisi" && (
                                        <>
                                        {roleId !== 1 ?
                                            pengabdian.length !== 0 && (
                                                console.log(optionsPdf),
                                                pengabdian.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key += 1}</td>
                                                            <td>{data?.pengabdian?.judul}</td>
                                                            <td>{data?.pengabdian?.skema}</td>
                                                            <td className={style.stylePdf}>
                                                                {optionsPdf.length !== 0 && (
                                                                    optionsPdf.map((dataa, key) => {
                                                                        return (
                                                                            dataa.id == data.id && (
                                                                                <Link key={key} to="reviewPdf">{dataa?.pictureAsFile?.type ? dataa?.namePdf : ""}</Link>
                                                                            )

                                                                        )
                                                                    })

                                                                )} 
                                                            </td>
                                                            <td>
                                                                {data.pengabdian.reviewPengabdian.map((data, key) => {
                                                                    // console.log(data)
                                                                    return (
                                                                        <p key={key}><span>Revisi {data.sebagai} : </span><span>{data.revisi}</span></p>
                                                                    )
                                                                })}
                                                            </td>
                                                            <td>
                                                                {roleId !== 4 && (
                                                                    <>     
                                                                        <Link to={`/data-pengabdian/Edit/${data?.pengabdian?.id}`}>
                                                                            <span className={`${style.iconOptions} ${style.icon1} material-symbols-outlined`}>edit</span>
                                                                        </Link>
                                                                        <div>
                                                                            <input type="file" accept="application/pdf" id={data.id} multiple hidden  onChange={(e) => uploadPicture(e)}/>
                                                                            <label  htmlFor={data.id}> 
                                                                                <span className={`${style.iconOptions} ${style.icon2} material-symbols-outlined`}>upload</span>
                                                                            </label>
                                                                        </div>
                                                                        <Link className={style.pdfUsulanPenelitian} to={`/data-pengabdian/pdf/${data?.pengabdian?.id}`}>
                                                                            <span className={`${style.iconOptions} ${style.icon3} material-symbols-outlined`}>visibility</span>
                                                                        </Link>
                                                                        {console.log(data)}
                                                                        <span id={`${data.id}`} className={`${style.iconOptions} ${style.icon4} material-symbols-outlined`} onClick={(e) => hendleKirimRevisiUsulan(data?.pengabdian?.Dokumen[0]?.id, e.target.id)} >send</span>
                                                                    </>
                                                                    
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ): pengabdian.length !== 0 && (
                                                pengabdian.map((data, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key += 1}</td>
                                                            <td>{data?.judul}</td>
                                                            <td>{data?.skema}</td>
                                                            <td>06 Aprl 2023 - 07 Des 2023</td>
                                                            <td>
                                                                {data.reviewPengabdian.length !== 0 ? (
                                                                    <p className={style.sedangDiNilai}>Sedang Dinilai</p>
                                                                ): data.reviewPengabdian.length === 0 && (                                        
                                                                    data.statusPengabdian === 0 ? (
                                                                        <p className={style.nonAjukan}>Belum Diajukan</p>
                                                                    ):
                                                                    data.statusPengabdian === 1 && (
                                                                        <p className={style.diajukan}>Diajukan</p>
                                                                    )
                                                                )}
                                                            
                                                            </td>
                                                            <td>
                                                                {roleId === 1 && (
                                                                    <>     
                                                                        <Link to={`/data-pengabdian/Edit/${data?.id}`}>
                                                                            <span className={`${style.iconOptions} material-symbols-outlined`}>edit</span>
                                                                        </Link>
                                                                        {/* <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeletePenelitian(data?.id)}>delete</span> */}
                                                                    </>
                                                                )}
                                                                {/* <span id='target' className={`${style.iconOptions} material-symbols-outlined`} >more_vert</span> */}
                                                                {/* {opsiMenu === "1" && (
                                                                    <div className={style.buttonActionMenu}>
                                                                        <span>Rreview</span>
                                                                        <span onClick={() => hendleAjukanPenelitian(data?.penelitian?.id)}>Ajukan</span>
                                                                    </div>
                                                                )} */}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                        </>
                                    )}
                                    </tbody>
                                </table>
                                <div className={style.pagenation}>
                                    <span>Showing 1 to 1 of entries</span>
                                    <div className={style.page}>
                                        <span className={`${style.before} material-symbols-outlined`}>chevron_left</span>
                                        <span className={`${style.number}`}>1</span>
                                        <span className={`${style.after} material-symbols-outlined`}>chevron_right</span>
                                    </div>
                                </div>
                            </div>
                        {/* )} */}
                    </div>
                </div>
        </div>
    )
}


export default Revisi