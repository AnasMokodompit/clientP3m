import { useState } from 'react'
import style from './TableAnggotaPenelitianMahasiswa.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteDataAnggotaMahasiswa, EditDataAnggotaMahasiswa, saveDataAnggotaMahasiswa } from '../../config/actions/DataActionMahasiswa'
import { useEffect } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'

function TableAnggotaPenelitianMahasiswa() {
    const dispatch = useDispatch()
    const [popUpUsulan, setPopUpUsulan] = useState('')
    const [ poupAddAnggotaMahasiswa, setPoupAddAnggotaMahasiswa] = useState('0')
    const [nim, setNim] = useState('')
    const [nama, setNama] = useState('')
    const [jurusan, setJurusan] = useState('')
    const [prodi, setProdi] = useState('')
    const [tugas, setTugas] = useState('')
    const [partisipasiMahasiswa, setPartisipasiMahasiswa] = useState()
    const {id} = useParams()
    const {dataLogin} = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    let {dataInSave, dataPengabdian} = useSelector(tes => tes.saveAddDataReducer)
    let {dataInSaveAnggota} = useSelector(tes => tes.saveAddDataReducer)
    const [idUserForEdit, setIdUserForEdit] = useState()
    const [roleId, setRoleId] = useState()
    const [listName, setListName] = useState([])

    

    const hendleSubmitAnggotaPenelitianMahasiswa = (nimParam) => {
        if (popUpUsulan === "EditPenelitian" || popUpUsulan === "EditPengabdian") {
            let newValue = {
                nim: nim,
                nameUser: nama,
                jurusan: jurusan,
                prodi: prodi,
                tugas: tugas
            }
            
            dispatch(EditDataAnggotaMahasiswa(newValue))

        }else if (popUpUsulan === "TambahPenelitian" || popUpUsulan === "TambahPengabdian") {
                
            let newValue = {
                nim: nim,
                nameUser: nama,
                jurusan: jurusan,
                prodi: prodi,
                tugas: tugas
            }


            
            let valueAlert = ""
            
            dataInSaveAnggota.map(data => {
                if (data.nameUser === newValue.nameUser) {
                    return valueAlert = "Nama Mahasiswa Sudah Ditambahkan"
                }
                
            })
            
            
            if (valueAlert === "Nama Mahasiswa Sudah Ditambahkan") {
                alert(valueAlert)
            }else{
                dispatch(saveDataAnggotaMahasiswa(newValue))
            }
            
        }

        setNim('')
        setNama('')
        setJurusan('')
        setProdi('')
        setTugas('')
    }

    const hendleSubmitAnggotaPenelitianIfCreate = () => {
        if (popUpUsulan === "TambahPenelitian") {
            
            const dataCreatePartisiMahasiswa = {
                idPenelitian: id,
                nim: nim,
                nameUser: nama,
                judulPenelitian: dataInSave.judul,
                jurusan: jurusan,
                prodi: prodi,
                tugasdlmPenlitian: tugas,
                role: 4
            }


            axios.post(`http://localhost:3005/api/anggotaPenelitian`, dataCreatePartisiMahasiswa, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}} )
            .then((res) => {
                hendleEditPenelitian()
            }).catch((err)=> {
                console.log(err)
                alert(err.response.data.message)
            })

            setNim('')
            setNama('')
            setJurusan('')
            setProdi('')
            setTugas('')
        }else if (popUpUsulan === "TambahPengabdian") {
            
            const dataCreatePartisiMahasiswa = {
                idPengabdian: id,
                nim: nim,
                nameUser: nama,
                judulPengabdian: dataPengabdian.judul,
                jurusan: jurusan,
                prodi: prodi,
                tugasdlmPengabdian: tugas,
                role: 4
            }


            axios.post(`http://localhost:3005/api/anggotaPengabdian`, dataCreatePartisiMahasiswa, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}} )
            .then((res) => {
                hendleEditPengabdian()
            }).catch((err)=> {
                console.log(err)
                alert(err.response.data.message)
            })

            setNim('')
            setNama('')
            setJurusan('')
            setProdi('')
            setTugas('')
            
        }else if (popUpUsulan === "EditPengabdian") {
            const dataUpdatePartisipasiPengabdianMahasiswa = {
                tugasdlmPengabdian: tugas
            }

            axios.patch(`http://localhost:3005/api/anggotaPengabdian/${idUserForEdit}`, dataUpdatePartisipasiPengabdianMahasiswa, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPengabdian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })

            setIdUserForEdit()
            setNim('')
            setNama('')
            setJurusan('')
            setProdi('')
            setTugas('')
        }else{
            const dataUpdatePartisipasiPenelitianMahasiswa = {
                tugasdlmPenlitian: tugas
            }

            axios.patch(`http://localhost:3005/api/anggotaPenelitian/${idUserForEdit}`, dataUpdatePartisipasiPenelitianMahasiswa, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPenelitian()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })

            setIdUserForEdit()
            setNim('')
            setNama('')
            setJurusan('')
            setProdi('')
            setTugas('')
        }
    }

    const hendleEditAnggotaPenelitianMahasiswa =async (nim) => {
        if(pathname === `/data-penelitian/Edit/${id}`){
            axios.get(`http://localhost:3005/api/anggotaPenelitian/${nim}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setIdUserForEdit(res.data.data.id)
                if (res?.data?.data?.user?.jurusan?.name) {
                    setJurusan(res.data.data.user.jurusan.name)
                }
                if (res?.data?.data?.user?.prodi?.name) {
                    setProdi(res.data.data.user.prodi.name)
                }

                if (res?.data?.data?.user?.nim) {
                    setNim(res.data.data.user.nim)
                }
                setNama(res.data.data.nameUser)
                setTugas(res.data.data.tugasdlmPenlitian)
            })
        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            axios.get(`http://localhost:3005/api/anggotaPengabdian/${nim}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setIdUserForEdit(res.data.data.id)
                if (res?.data?.data?.user?.jurusan?.name) {
                    setJurusan(res.data.data.user.jurusan.name)
                }
                if (res?.data?.data?.user?.prodi?.name) {
                    setProdi(res.data.data.user.prodi.name)
                }

                if (res?.data?.data?.user?.nim) {
                    setNim(res.data.data.user.nim)
                }
                setNama(res.data.data.nameUser)
                setTugas(res.data.data.tugasdlmPengabdian)
            })
        } else if (pathname === `/data-penelitian/Add` || pathname === `/data-pengabdian/Add`) {
            const DataEdit = await dataInSaveAnggota.filter((data) => data.nim === nim )
    
            setNim(DataEdit[0].nim)
            setNama(DataEdit[0].nameUser)
            setJurusan(DataEdit[0].jurusan)
            setProdi(DataEdit[0].prodi)
            setTugas(DataEdit[0].tugas)
        }
    }

    const hendleCloseAnggotaPeneltianMahasiswa = () => {
        setNim('')
        setNama('')
        setJurusan('')
        setProdi('')
        setTugas('')

    }
    
    const hendleDeleteAnggotaPenelitianMahasiswa = (nim) => {
        if (pathname === `/data-penelitian/Edit/${id}`) {
            axios.delete(`http://localhost:3005/api/anggotaPenelitian/${nim}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPenelitian()
            }).catch((err)=> {
                console.log(err)
                alert(err.response.data.message)
            })
        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            axios.delete(`http://localhost:3005/api/anggotaPengabdian/${nim}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                hendleEditPengabdian()
            }).catch((err)=> {
                console.log(err)
                alert(err.response.data.message)
            })
        } else if (pathname === `/data-penelitian/Add` || pathname === `/data-pengabdian/Add`) {
            dispatch(DeleteDataAnggotaMahasiswa(nim))
        }
    }


    // Edit Partisipasi Mahasiswa Penelitian
    const hendleEditPenelitian = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        setRoleId(decode.roleId)

        await axios.get(`http://localhost:3005/api/penelitian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            axios.get(`http://localhost:3005/api/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiMahasiswa(res.data.data[1])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }

    // Edit Paritisi Mahasiswa Pengabdian
    const hendleEditPengabdian = async () => {
        const decode = jwt(dataLogin.dataLogin.token)

        setRoleId(decode.roleId)

        await axios.get(`http://localhost:3005/api/pengabdian/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            axios.get(`http://localhost:3005/api/anggotaPengabdian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPartisipasiMahasiswa(res.data.data[1])
            }).catch((error) => {
                console.log(error)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSearchName = (e) => {
        axios.get(`http://localhost:3005/api/users?name=${e.target.value}&Role=4`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setListName(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const hendleSearchNidn = (name) => {
        setListName([])

        setNama(name)
        
        axios.get(`http://localhost:3005/api/users?name=${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            if (res?.data?.data[0]?.nim !== null) {
                setNim(res.data.data[0]?.nim)
            }

            if (res?.data?.data[0]?.jurusan.name !== null) {
                setJurusan(res.data.data[0]?.jurusan.name)
            }
            
            if (res?.data?.data[0]?.prodi?.name !== null) {
                setProdi(res.data.data[0]?.prodi?.name)
            }
            
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {

        if (pathname === `/data-penelitian/Edit/${id}`) {
            hendleEditPenelitian()
        }else if (pathname === `/data-pengabdian/Edit/${id}`) {
            hendleEditPengabdian()
        }
    },[])

    return (
        <div>
            <div className={`${(poupAddAnggotaMahasiswa === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
            </div>
            <div className={style.conTable}>
                <div className={style.buttonCreate}>
                {/* {roleId !== 1 && ( */}
                {(pathname === `/data-penelitian/Add` || pathname === `/data-penelitian/Edit/${id}`) && (
                    <input type="button" className={style.userAddButton} onClick={() => `${setPoupAddAnggotaMahasiswa('1')} ${setPopUpUsulan('TambahPenelitian')}`} value="Tambah Data" />
                    )}
                {(pathname === `/data-pengabdian/Add` || pathname === `/data-pengabdian/Edit/${id}`) && (
                    <input type="button" className={style.userAddButton} onClick={() => `${setPoupAddAnggotaMahasiswa('1')} ${setPopUpUsulan('TambahPengabdian')}`} value="Tambah Data" />
                )}
                {/* )} */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nim</th>
                            <th>Nama Anggota</th>
                            <th>Jurusan</th>
                            <th>Prodi</th>
                            <th>Tugas</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(pathname === `/data-penelitian/Edit/${id}` || pathname === `/data-pengabdian/Edit/${id}`) && (
                        partisipasiMahasiswa?.map((data,key) => {
                            return (
                                console.log(partisipasiMahasiswa),
                                <tr key={key}>
                                    <td>{key += 1}</td>
                                    <td>{data?.user?.nim}</td>
                                    <td>{data.nameUser}</td>
                                    <td>{data?.user?.jurusan?.name}</td>
                                    <td>{data?.user?.prodi?.name}</td>
                                    <td>{pathname === `/data-penelitian/Edit/${id}` ? data.tugasdlmPenlitian : data.tugasdlmPengabdian}</td>
                                    <td>
                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaPenelitianMahasiswa(data.id)} ${setPoupAddAnggotaMahasiswa('1')} ${pathname === `/data-penelitian/Edit/${id}` ? setPopUpUsulan('EditPenelitian') : setPopUpUsulan('EditPengabdian')} }`}>edit</span>
                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteAnggotaPenelitianMahasiswa(data.id)}>delete</span>
                                        {/* <span className={`${style.iconOptions} material-symbols-outlined`}>more_vert</span> */}
                                    </td>
                                </tr>
                            )
                        })
                        )}
                    {(pathname === "/data-penelitian/Add" || pathname === "/data-pengabdian/Add") && (
                        dataInSaveAnggota?.map((data,key) => {
                            return (
                                <tr key={key}>
                                    <td>{key += 1}</td>
                                    <td>{data.nim}</td>
                                    <td>{data.nameUser}</td>
                                    <td>{data.jurusan}</td>
                                    <td>{data.prodi}</td>
                                    <td>{data.tugas}</td>
                                    <td>
                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${hendleEditAnggotaPenelitianMahasiswa(data.nim)} ${setPoupAddAnggotaMahasiswa('1')} ${pathname === `/data-penelitian/Edit/${id}` ? setPopUpUsulan('EditPenelitian') : setPopUpUsulan('EditPengabdian')}`}>edit</span>
                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteAnggotaPenelitianMahasiswa(data.nim)}>delete</span>
                                        {/* <span className={`${style.iconOptions} material-symbols-outlined`}>more_vert</span> */}
                                    </td>
                                </tr>
                            )
                        })
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
            {poupAddAnggotaMahasiswa === "1" && (
                <>
                    <div className={style.containerPopUp}>
                        <div className={style.contentTitle}>
                            {popUpUsulan === "TambahPenelitian" && (
                                <p>Create Anggota Penelitian Mahasiswa</p>
                                )}
                            {popUpUsulan === "EditPenelitian" && (
                                <p>Edit Anggota Penelitian Mahasiswa</p>
                                )}
                            {popUpUsulan === "TambahPengabdian" && (
                                <p>Create Anggota Pengabdian Mahasiswa</p>
                                )}
                            {popUpUsulan === "EditPengabdian" && (
                                <p>Edit Anggota Pengabdian Mahasiswa</p>
                                )}
                            <span className={`material-symbols-outlined`} onClick={() => `${setPoupAddAnggotaMahasiswa("0")} ${hendleCloseAnggotaPeneltianMahasiswa()} ${setPopUpUsulan('EditPenelitian')}`}>close</span>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Nama</label>
                            <input type="text" disabled={pathname === `/data-penelitian/Edit/${id}` && popUpUsulan === "EditPenelitian" ? "disable" : ""} value={nama} placeholder='Search Name' onChange={(e) => `${setNama(e.target.value)} ${hendleSearchName(e)}`}/>
                            <ul className={style.listName}>
                                {listName?.length !== 0 && (
                                    listName.map((data, key) => {
                                        return (
                                            <li key={key} onClick={(e) => `${hendleSearchNidn(e.target.innerText)}`}>{data.name}</li>
                                        )
                                    })
                                )}
                            </ul>
                        </div>
                        <div className={style.itemPopUp}>
                            <label htmlFor="">Nim</label>
                            <input type="number" disabled={pathname === `/data-penelitian/Edit/${id}` && popUpUsulan === "EditPenelitian" ? "disable" : ""} value={nim} onChange={(e) => setNim(e.target.value)} />
                        </div>
                        <div className={style.conSelect}>
                            {(jurusan?.length !== 0 && jurusan !== undefined) ? 
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Jurusan</label>
                                    <select name="" id="" value={jurusan} onChange={(e) => setJurusan(e.target.value)}>
                                        <option value={jurusan}>{jurusan}</option>
                                    </select>
                                </div>
                            : ""
                        }
                            {(prodi?.length !== 0 && prodi !== undefined) ? 
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Program Studi</label>
                                    <select name="" id=""  value={prodi} onChange={(e) => setProdi(e.target.value)}>
                                        <option value={prodi}>{prodi}</option>
                                    </select>
                                </div>
                            : ""
                            }
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
                            <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianIfCreate()} ${setPoupAddAnggotaMahasiswa("0")}`}/>
                        )}
                        {pathname === `/data-penelitian/Add` && (
                            <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianMahasiswa()} ${setPoupAddAnggotaMahasiswa("0")}`}/>
                        )}
                        {pathname === `/data-pengabdian/Edit/${id}` && (
                            <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianIfCreate()} ${setPoupAddAnggotaMahasiswa("0")}`}/>
                        )}
                        {pathname === `/data-pengabdian/Add` && (
                            <input type="button" value="Submit" onClick={() => `${hendleSubmitAnggotaPenelitianMahasiswa()} ${setPoupAddAnggotaMahasiswa("0")}`}/>
                        )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TableAnggotaPenelitianMahasiswa