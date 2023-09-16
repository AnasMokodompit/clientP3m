import { useEffect, useState } from 'react'
import style from './TabelDataPengguna.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'


function TabelDataPengguna() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [dataPengguna, setDataPengguna] = useState([])
    const [popupAddDataPengguna, setPopupAddDataPengguna] = useState('0')
    const [popupDataPengguna, setPopupDataPengguna] = useState('')
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [jabatanKampus, setJabatanKampus] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')
    const [row, setRow] = useState(10)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [jumlahData, setJumlahData] = useState(0)

    const getAllDataPengguna = () => {

        axios.get(`http://localhost:3005/api/users?page=${page}&row=${row}&name=${searchName}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setJumlahData(res.data.data.length)
            setDataPengguna(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleEditDataPengguna = (id) => {
        setId(id)

        axios.get(`http://localhost:3005/api/users/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setUserName(res.data.data.username)
            setName(res.data.data.name)
            setRole(res.data.data.roleId)
            setEmail(res.data.data.email)
            setPassword(res.data.data.password)
            if (res.data.data?.jabtan_kampus) {
                setJabatanKampus(res.data.data?.jabtan_kampus)
            }
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const hendleSubmitDataPengguna = () => {

        const dataUserCreate = {
            username,
            name,
            email,
            password,
            roleId: role
        }

        if (popupDataPengguna === 'TambahDataPengguna') {
            axios.post(`http://localhost:3005/api/users`, dataUserCreate, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {      
                alert(`User Berhasil Ditambahkan`)
                getAllDataPengguna()
            }).catch((err) => {
                alert(`User Gagal Ditambahkan`)
                console.log(err)
            })
        }else if (popupDataPengguna === 'EditDataPengguna') {
            dataUserCreate.jabatan_kampus = jabatanKampus

            axios.patch(`http://localhost:3005/api/users/roleAdmin/${id}`, dataUserCreate, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                alert(`Data User Berhasil Diperbarui`)
                getAllDataPengguna()
            }).catch((err) => {
                if (err.response.data.message) {
                    alert(err.response.data.message)
                }else{
                    alert(`Data User Gagal Diperbarui`)
                }
                console.log(err)
            })
        }


        setUserName('')
        setName('')
        setRole('')
        setEmail('')
        setPassword('')
        setJabatanKampus('')
       
    }
    
    const hendleDeleteDataPengguna = (id) => {
        axios.delete(`http://localhost:3005/api/users/${id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            console.log(res.data.data)
            getAllDataPengguna()
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const hendleCloseDataPengguna = () => {
        setUserName('')
        setName('')
        setRole('')
        setEmail('')
        setPassword('')
        setJabatanKampus('')
    }
    
    useEffect(() => {
        getAllDataPengguna()
    }, [row, page, searchName])
    
    return (
        <>
            <div className={`${(popupAddDataPengguna === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
            </div>
                    <div>
                        <div className={style.conTable}>
                            <div className={style.buttonCreate}>
                                <input type="button" className={style.userAddButton} onClick={() => `${setPopupAddDataPengguna("1")} ${setPopupDataPengguna("TambahDataPengguna")} `} value="Tambah Data" />
                            </div>  
                            <div className={style.buttonSearchAndRow}>
                                <div className={style.entitas}>
                                    <span>Show</span>
                                    <select name="" id="" value={row} onChange={(e) => setRow(e.target.value)}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <span>Entitas</span>
                                </div>
                                <div className={style.navbarHome}>
                                    <div className={`${style.item} ${style.search}`}>
                                        <input type="text" value={searchName} placeholder='Search Name' onChange={(e) => setSearchName(e.target.value)}/>
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                </div>
                            </div>      
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Jurusan</th>
                                        <th>Prodi</th>
                                        <th>Nomor HP</th>
                                        <th>Roles User</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPengguna.length !== 0 && (
                                        dataPengguna.map((data, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{data?.id}</td>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.email}</td>
                                                    <td>{data?.jurusan?.name}</td>
                                                    <td>{data?.prodi?.name}</td>
                                                    <td>{data?.nomor_tlp}</td>
                                                    <td>{data?.role?.name}</td>
                                                    <td>
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => `${setPopupAddDataPengguna("1")} ${hendleEditDataPengguna(data.id)} ${setPopupDataPengguna("EditDataPengguna")}`}>edit</span> 
                                                        <span className={`${style.iconOptions} material-symbols-outlined`} onClick={() => hendleDeleteDataPengguna(data.id)}>delete</span>
                                                        {/* <span className={`${style.iconOptions} material-symbols-outlined`}>more_vert</span> */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                            <div className={style.pagenation}>
                                <span>Showing {jumlahData === 0 ? jumlahData : 1} to {jumlahData} of entries</span>
                                <div className={style.page}>
                                    <span className={`${style.before} material-symbols-outlined`} onClick={() => page === 1 ? page : setPage(page - 1)} >chevron_left</span>
                                    <span className={`${style.number}`}>{page}</span>
                                    <span className={`${style.after} material-symbols-outlined`} onClick={() => setPage(page + 1)}>chevron_right</span>
                                </div>
                            </div>
                        </div>
                        {popupAddDataPengguna === "1" && (
                            <div className={style.containerPopUp}>
                                <div className={style.contentTitle}>
                                    <p>Tambah Akun</p>
                                    <span className={`material-symbols-outlined`} onClick={() => `${setPopupAddDataPengguna("0")} ${hendleCloseDataPengguna()}`}>close</span>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Username</label>
                                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Role User</label>
                                    <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option>-- Pilih Role User --</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Reviewer</option>
                                        <option value="3">Dosen</option>
                                        <option value="4">Mahasiswa</option>
                                    </select>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className={style.itemPopUp}>
                                    <label htmlFor="">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {role == 3 && (
                                    console.log(jabatanKampus),
                                    <div className={style.itemPopUp}>
                                        <label htmlFor="">Jabatan Kampus</label>
                                        <select name="" id="" value={jabatanKampus} onChange={(e) => setJabatanKampus(e.target.value)}>
                                            <option>-- Pilih Jabatan Kampus --</option>
                                            <option value="Kepala Jurusan">Kajur</option>
                                            <option value="Kepala Program Studi">Kaprodi</option>
                                            <option value="Kepala P3M">Kepala P3M</option>
                                        </select>
                                    </div>
                                )}
                                <div className={style.conSubmit}>
                                    <input type="button" value="Submit" onClick={() => `${hendleSubmitDataPengguna()} ${setPopupAddDataPengguna("0")}`}/>
                                </div>
                            </div>
                        )}
                    </div>
        </>
    )
}


export default TabelDataPengguna