import { Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from './TableAnggotaPenelitianDosen.module.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
import { DeleteDataAnggotaDosen, EditDataAnggotaDosen, saveDataAnggotaDosen } from '../../config/actions/DataActionDosen';

function TableAnggotaPenelitianDosen() {
    const [popUpUsulan, setPopUpUsulan] = useState('')
    let {dataInSave, dataPengabdian} = useSelector(tes => tes.saveAddDataReducer)
    let {dataSimpanAnggotaDosen} = useSelector(tes => tes.partisiDosen)
    const {dataLogin} = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [dataPengusul, setDataPengusul] = useState([])
    const [name, setName] = useState('')
    const [nidn, setNidn] = useState('')
    const dispatch = useDispatch()
    let [dataDosenAddAnggota, setDataDosenAddAnggota] = useState([])
    const [popupAddAngota, setPopupAddAngota] = useState('0')
    const {id} = useParams()
    const [partisipasiDosen, setPartisipasiDosen] = useState()
    const [roleId, setRoleId] = useState()
    const [listName, setListName] = useState([])

    
    // 
    const [peranDosen, setPerannDosen] = useState('')
    const [tugas, setTugas] = useState('')

    const getUserPengusul = () => {
        const decode = jwt(dataLogin.dataLogin.token)

        // console.log(decode.roleId)
        setRoleId(decode.roleId)

        axios.get(`http://localhost:3005/api/users/${decode.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataPengusul(res.data.data)
        })

    }

    const hendleSearchNidn = (name) => {

        setListName([])
        setName(name)

        axios.get(`http://localhost:3005/api/users?name=${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataDosenAddAnggota(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSearchName = (e) => {
        axios.get(`http://localhost:3005/api/users?name=${e.target.value}&Role=3`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setListName(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleSubmitAnggotaPenelitian = (name) => {
            setNidn(dataDosenAddAnggota[0].nidn)

            if (popUpUsulan === "EditPenelitian"|| popUpUsulan === "EditPengabdian") {
                let newValue = {
                    nameUser: name,
                    jabatan: peranDosen,
                    tugas: tugas
                }

                let valueAlert = ""

                dataSimpanAnggotaDosen.map(data => {
                    // console.log(data.nameUser, newValue.nameUser)
                    if (data.jabatan === newValue.jabatan && data.nameUser !== newValue.nameUser) {
                        return valueAlert = `Jataban Sudah Ditambahkan`
                    }
                })


                if (valueAlert === `Jataban Sudah Ditambahkan`) {
                    alert(valueAlert)
                }else{
                    dispatch(EditDataAnggotaDosen(newValue))
                }

                
            }else if (popUpUsulan === "TambahPenelitian" || popUpUsulan === "TambahPengabdian") {
                
                let newValue = {
                    nidn: dataDosenAddAnggota[0].nidn,
                    nameUser: name,
                    jabatan: peranDosen,
                    tugas: tugas,
                    statusAkun: 1,
                    statusPartisipasi: 0
                }

                
                // if (dataSimpanAnggotaDosen.length >= 3) {
                //     alert('Batas Anggota Dalam Penelitian 3')
                // }

                let valueAlert = ""

                dataSimpanAnggotaDosen.map(data => {
                    if (data.nameUser === newValue.nameUser) {
                        return valueAlert = "Nama Dosen Sudah Ditambahkan"
                    }
                    
                    if (data.jabatan === newValue.jabatan) {
                        return valueAlert = `Jataban Sudah Ditambahkan`
                    }
                })


                if (valueAlert === "Nama Dosen Sudah Ditambahkan") {
                    alert(valueAlert)
                }else if (valueAlert === `Jataban Sudah Ditambahkan`) {
                    alert(valueAlert)
                }else{
                    dispatch(saveDataAnggotaDosen(newValue))
                }


            }

            setName('')
            setPerannDosen('')
            setTugas('')
            setDataDosenAddAnggota('')
        
    }


    const hendleSubmitAnggotaPenelitianIfCreate = (name, idAnggotaPenelitian) => {

        if(popUpUsulan === "TambahPenelitian") {

            const dataCreatePartisipasiPenelitianDosen = {
                idPenelitian: id,
                nameUser: name,
                judulPenelitian: dataInSave.judul,
                jabatan: peranDosen,
                tugasdlmPenlitian: tugas,
                statusAkun: 1,
                statusPartisipasi: 0
            }
            
            axios.post(`http://localhost:3005/api/anggotaPenelitian`, dataCreatePartisipasiPenelitianDosen, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPenelitian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }else if (popUpUsulan === "TambahPengabdian") {
            const dataCreatePartisipasiPengabdianDosen = {
                idPengabdian: id,
                nameUser: name,
                judulPengabdian: dataPengabdian.judul,
                jabatan: peranDosen,
                tugasdlmPengabdian: tugas,
                statusAkun: 1,
                statusPartisipasi: 0
            }
            
            axios.post(`http://localhost:3005/api/anggotaPengabdian`, dataCreatePartisipasiPengabdianDosen, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPengabdian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }else if(popUpUsulan === "EditPengabdian"){
            const judulPengabdian = dataPengabdian.judul
            console.log(dataPengabdian.judul, 'te')

            const dataUpdatePartisipasiPengabdianDosen = {
                jabatan: peranDosen,
                tugasdlmPengabdian: tugas
            }
            axios.patch(`http://localhost:3005/api/anggotaPengabdian/${idAnggotaPenelitian}?judulPengabdian=${judulPengabdian}`,dataUpdatePartisipasiPengabdianDosen, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleEditPengabdian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }else{
            const judulPenelitian = dataInSave.judul
            console.log(judulPenelitian.judul)

            const dataUpdatePartisipasiPenelitianDosen = {
                jabatan: peranDosen,
                tugasdlmPenlitian: tugas
            }
            axios.patch(`http://localhost:3005/api/anggotaPenelitian/${idAnggotaPenelitian}?judulPenelitian=${judulPenelitian}`,dataUpdatePartisipasiPenelitianDosen, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleEditPenelitian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
        }
        
        setName('')
        setPerannDosen('')
        setTugas('')
        setDataDosenAddAnggota('')
    }

    const hendleDeleteAnggotaDosen = (name) => {
        if (pathname === `/data-penelitian/Edit/${id}`) {
            axios.delete(`http://localhost:3005/api/anggotaPenelitian/${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleEditPenelitian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })

            setName('')
            setPerannDosen('')
            setTugas('')
            setDataDosenAddAnggota('')
        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            axios.delete(`http://localhost:3005/api/anggotaPengabdian/${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then(() => {
                hendleEditPengabdian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })

            setName('')
            setPerannDosen('')
            setTugas('')
            setDataDosenAddAnggota('')
        } else if (pathname === `/data-penelitian/Add` || pathname === `/data-pengabdian/Add`) {
            dispatch(DeleteDataAnggotaDosen(name))
        }
    }

    const hendleEditAnggotaDosen = async (name) => {

        if (pathname === `/data-penelitian/Edit/${id}`) {
            axios.get(`http://localhost:3005/api/anggotaPenelitian/${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataDosenAddAnggota(res.data.data)

                setName(res.data.data.user.name)
                setPerannDosen(res.data.data.jabatan)
                setTugas(res.data.data.tugasdlmPenlitian)
            }).catch((err) => {
                console.log(err)
            })

        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            axios.get(`http://localhost:3005/api/anggotaPengabdian/${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataDosenAddAnggota(res.data.data)
                
                setName(res.data.data.user.name)
                setPerannDosen(res.data.data.jabatan)
                setTugas(res.data.data.tugasdlmPengabdian)
            }).catch((err) => {
                console.log(err)
            })
        }else if (pathname === `/data-penelitian/Add` || pathname === `/data-pengabdian/Add`) {
            
            const DataEdit = await dataSimpanAnggotaDosen.filter((data) => data.nameUser === name )
    
            axios.get(`http://localhost:3005/api/users?name=${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataDosenAddAnggota(res.data.data)
            })
            
            setName(DataEdit[0].nameUser)
            setPerannDosen(DataEdit[0].jabatan)
            setTugas(DataEdit[0].tugas)
        }
    }

    const hendleCloseAnggotaPeneltianDosen = () => {
        setName('')
        setPerannDosen('')
        setTugas('')
        setDataDosenAddAnggota('')

    }

    // Edit Penelitian 
    const hendleEditPenelitian = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        setRoleId(decode.roleId)


        await axios.get(`http://localhost:3005/api/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {

            axios.get(`http://localhost:3005/api/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiDosen(res.data.data[0])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    // Edit Pengabdian

    const hendleEditPengabdian = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        setRoleId(decode.roleId)


        await axios.get(`http://localhost:3005/api/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {

            axios.get(`http://localhost:3005/api/anggotaPengabdian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiDosen(res.data.data[0])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserPengusul()

        if (pathname === `/data-penelitian/Edit/${id}`) {
            hendleEditPenelitian()
        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            hendleEditPengabdian()
        }
    }, [])

    return (
            <div>
                <div className={`${(popupAddAngota === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
                </div>
                <div className={style.conTable}>
                    <div className={style.buttonCreate}>
                        {/* {roleId !== 1 && ( */}
                        {(pathname === `/data-penelitian/Add` || pathname === `/data-penelitian/Edit/${id}`) && (
                            <input type="button" className={style.userAddButton} onClick={(e) => `${setPopupAddAngota('1')} ${setPopUpUsulan('TambahPenelitian')}`} value="Tambah Data" />
                            )}
                        {(pathname === `/data-pengabdian/Add` || pathname === `/data-pengabdian/Edit/${id}`) && (
                            <input type="button" className={style.userAddButton} onClick={(e) => `${setPopupAddAngota('1')} ${setPopUpUsulan('TambahPengabdian')}`} value="Tambah Data" />
                        )}
                        {/* )} */}
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nidn</th>
                                <th>Nama Anggota</th>
                                <th>Peran</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(pathname === `/data-penelitian/Edit/${id}` || pathname === `/data-pengabdian/Edit/${id}`) && (
                            partisipasiDosen?.map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{data?.user.nidn}</td>
                                        <td>{data.nameUser}</td>
                                        <td>{data.jabatan}</td>
                                        <td>
                                            {data.statusPartisipasi === 1 && (
                                                <p className={style.diajukan}>Disetujui</p>
                                            )}
                                            {data.statusPartisipasi === 0 && (
                                                <p className={style.nonAjukan}>Mengunggu Persetujuan</p>
                                            )}
                                        </td>
                                        <td>
                                            {key === 0 && (
                                                <>
                                                {(pathname === `/data-penelitian/Edit/${id}`) && (
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.id)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPenelitian')}`}>edit</span>
                                                )}
                                                {(pathname === `/data-pengabdian/Edit/${id}`) && (
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.id)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPengabdian')}`}>edit</span>
                                                )}
                                                    {/* <span className={`${style.iconOptions} ${style.iconOptions3} material-symbols-outlined`}>more_vert</span> */}
                                                </>

                                            )}
                                            {key >= 1 && (
                                                <>
                                                {(pathname === `/data-penelitian/Edit/${id}`) && (
                                                    <>
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.id)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPenelitian')}`}>edit</span>
                                                    <span className={`${style.iconOptions} ${style.iconOptions2} material-symbols-outlined`} onClick={() => hendleDeleteAnggotaDosen( data.id)}>delete</span>
                                                    </>
                                                )}
                                                {(pathname === `/data-pengabdian/Edit/${id}`) && (
                                                    <>
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.id)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPengabdian')}`}>edit</span>
                                                    <span className={`${style.iconOptions} ${style.iconOptions2} material-symbols-outlined`} onClick={() => hendleDeleteAnggotaDosen( data.id)}>delete</span>
                                                    </>
                                                )}
                                                </>
                                                    // {/* <span className={`${style.iconOptions} ${style.iconOptions3} material-symbols-outlined`}>more_vert</span> */}
                                            )}
                                           
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                        {(pathname === "/data-penelitian/Add" || pathname === "/data-pengabdian/Add") && (
                            dataSimpanAnggotaDosen.map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{data?.nidn}</td>
                                        <td>{data.nameUser}</td>
                                        <td>{data.jabatan}</td>
                                        <td>
                                            {data.statusPartisipasi === 1 && (
                                                <p className={style.diajukan}>Disetujui</p>
                                            )}
                                            {data.statusPartisipasi === 0 && (
                                                <p className={style.nonAjukan}>Mengunggu Persetujuan</p>
                                            )}
                                        </td>
                                        <td>
                                            {key === 0 && (
                                                <>
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.nameUser)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPenelitian')}`}>edit</span>
                                                    {/* <span className={`${style.iconOptions} ${style.iconOptions3} material-symbols-outlined`}>more_vert</span> */}
                                                </>

                                            )}
                                            {key >= 1 && (
                                                <>
                                                    <span className={`${style.iconOptions} ${style.iconOptions1} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaDosen(data.nameUser)} ${setPopupAddAngota('1')} ${setPopUpUsulan('EditPengabdian')}`}>edit</span>
                                                    <span className={`${style.iconOptions} ${style.iconOptions2} material-symbols-outlined`} onClick={() => hendleDeleteAnggotaDosen(data.nameUser)}>delete</span>
                                                    {/* <span className={`${style.iconOptions} ${style.iconOptions3} material-symbols-outlined`}>more_vert</span> */}
                                                </>
                                            )}
                                           
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                        
                        </tbody>
                    </Table>
                    <div className={style.pagenation}>
                        <span>Showing 1 to 1 of entries</span>
                        <div className={style.page}>
                            <span className={`${style.before} material-symbols-outlined`}>chevron_left</span>
                            <span className={`${style.number}`}>1</span>
                            <span className={`${style.after} material-symbols-outlined`}>chevron_right</span>
                        </div>
                    </div>
                </div>
                {popupAddAngota === "1" && (
                    <>
                        <div className={style.containerPopUp}>
                            <div className={style.contentTitle}>
                                {popUpUsulan === "TambahPenelitian" && (
                                    <p>Create Anggota Penelitian Dosen</p>
                                )}
                                {popUpUsulan === "EditPenelitian" && (
                                    <p>Edit Anggota Penelitian Dosen</p>
                                )}
                                {popUpUsulan === "TambahPengabdian" && (
                                    <p>Create Anggota Pengabdian Dosen</p>
                                )}
                                {popUpUsulan === "EditPengabdian" && (
                                    <p>Edit Anggota Pengabdian Dosen</p>
                                )}
                                <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddAngota("0")} ${hendleCloseAnggotaPeneltianDosen()}`}>close</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Nama</p>
                                    {(popUpUsulan === "TambahPenelitian" || popUpUsulan === "TambahPengabdian") && (
                                        <div className={style.conterSearch}>
                                            <div className={`${style.item} ${style.search}`}>
                                                <input type="text" placeholder='Search Name' value={name} onChange={(e) => `${setName(e.target.value)} ${hendleSearchName(e)}`}/>
                                                <span className="material-symbols-outlined">search</span>
                                            </div>
                                            <ul className={style.listName}>
                                                {listName.length !== 0 && (
                                                    listName.map((data, key) => {
                                                        return (
                                                            <li key={key} onClick={(e) => `${hendleSearchNidn(e.target.innerText)}`} >{data.name}</li>
                                                        )
                                                    })
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                    {(popUpUsulan === "EditPenelitian"|| popUpUsulan === "EditPengabdian") && (
                                        <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota[0]?.name : ""}</span>
                                    )}
                                    <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota?.user?.name : ""}</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Nidn</p>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota[0]?.nidn : ""}</span>
                                    <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota?.user?.nidn : ""}</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Jurusan</p>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota[0]?.jurusan?.name : ""}</span>
                                    <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota?.user?.jurusan?.name : ""}</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Prodi</p>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota[0]?.prodi?.name : ""}</span>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota?.user?.prodi?.name : ""}</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Email</p>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota[0]?.email : ""}</span>
                                <span>{dataDosenAddAnggota !== 0 ? dataDosenAddAnggota?.user?.email : ""}</span>
                            </div>
                            <div className={style.itemPopUp}>
                                <p htmlFor="">Peran</p>
                                <input type="text" value={peranDosen} onChange={(e) => setPerannDosen(e.target.value)} />
                            </div>
                            {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${id}`) && (
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Tugas Dalam Penelitian</label>
                                    <textarea name="" id="" cols="30" rows="10" value={tugas} onChange={(e) => setTugas(e.target.value)}></textarea>
                                </div>
                            )}
                            {(pathname === "/data-pengabdian/Add" || pathname === `/data-pengabdian/Edit/${id}`) && (
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Tugas Dalam Pengabdian</label>
                                    <textarea name="" id="" cols="30" rows="10" value={tugas} onChange={(e) => setTugas(e.target.value)}></textarea>
                                </div>
                            )}
                            <div className={style.conSubmit}>
                                {pathname === `/data-penelitian/Edit/${id}` && (
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianIfCreate(popUpUsulan === "EditPenelitian" ? dataDosenAddAnggota?.nameUser : dataDosenAddAnggota[0]?.name, dataDosenAddAnggota.id)} ${setPopupAddAngota("0")}`}/>
                                )}
                                {pathname === "/data-penelitian/Add" && (
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitian(dataDosenAddAnggota[0]?.name)} ${setPopupAddAngota("0")}`}/>
                                )}
                                {pathname === `/data-pengabdian/Edit/${id}` && (
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianIfCreate(popUpUsulan === "EditPengabdian" ? dataDosenAddAnggota?.nameUser : dataDosenAddAnggota[0]?.name, dataDosenAddAnggota.id)} ${setPopupAddAngota("0")}`}/>
                                )}
                                {pathname === "/data-pengabdian/Add" && (
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitian(dataDosenAddAnggota[0]?.name)} ${setPopupAddAngota("0")}`}/>
                                )}
                                
                            </div>
                        </div>
                    </>
                )}
            </div>
    )
}


export default TableAnggotaPenelitianDosen