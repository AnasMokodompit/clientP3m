import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidenar"
import style from './Profile.module.css'
import img from '../../tes.jpg'
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import jwt from 'jwt-decode'
import axios from "axios"
import { useLocation } from "react-router-dom"
import dateFormat from "dateformat"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';





function Profile() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const [userName, setUserName] = useState('') 
    const [name, setName] = useState('') 
    const [nidn, setNidn] = useState('') 
    const [nim, setNim] = useState('') 
    const [jurusan, setJurusan] = useState('')
    const [prodi, setProdi] = useState('') 
    const [noTlp, setNoTlp] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordOne, setNewPasswordOne] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('') 
    const [jenjangPendidikan, setJenjangPendidikan] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [jabatanKampus, setJabatanKampus] = useState('')
    const [sinta, setSinta] = useState('')
    const [tempatLahir, setTempatLahir] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')
    const [alamat, setAlamat] = useState('') 
    const [id, setId] = useState('')
    const [roleId, setRoleId] = useState('')
    const [dataJurusan, setDataJurusan] = useState([])
    const [dataProdi, setDataProdi] = useState([])
    const [idJurusan, setIdJurusan] = useState('')
    const [idProdi, setIdProdi] = useState('')
    const [picture,setPicture] = useState({})

    const [navbarComponen, setNavbarComponen] = useState('dataDiri')
    const [statusProfileSaya, setStatusProfileSaya] = useState('showProfile') 

    
    const hendleCekUser = () => {
        const decode = jwt(dataLogin.dataLogin.token)
        setRoleId(decode.roleId)

        axios.get(`http://localhost:3005/api/users/${decode.id}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {

            if (res?.data?.data?.jurusan?.name) {
                
                axios.get(`http://localhost:3005/api/prodi?nameJurusan=${res.data.data.jurusan.name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                    setDataProdi(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })
            }

            console.log(res.data.data)

            setRoleId(res.data.data?.roleId)
            setId(res.data.data?.id)
            setUserName(res.data.data?.username)
            setName(res.data.data?.name)
            if (res?.data?.data?.nidn) {
                setNidn(res.data.data?.nidn)
            }
            if (res?.data?.data?.nim) {
                setNim(res.data.data?.nim)
            }
            if (res?.data?.data?.nomor_tlp) {
                setNoTlp(res.data.data?.nomor_tlp)
            }
            if (res.data.data?.jabtan_kampus) {
                setJabatanKampus(res.data.data?.jabtan_kampus)
            }
            // setPassword(res.data.data?.password)
            if (res.data.data?.email) {
                setEmail(res.data.data?.email)
            }
            if (res.data.data?.jurusan?.name) {
                setIdJurusan(res.data.data?.jurusan?.id)
                setJurusan(res.data.data?.jurusan?.name)
            }
            if (res.data.data?.prodi?.name) {
                setIdProdi(res.data.data?.prodi?.id)
                setProdi(res.data.data?.prodi?.name)
            }
            if (res.data.data?.jnsKelaminName) {
                setJenisKelamin(res.data.data?.jnsKelaminName)
            }
            setPicture(res.data.data?.profile_picture)
            if (res.data.data.alamat) {
                setAlamat(res.data.data.alamat)
            }
            if (res.data.data?.jabatan_fungsional) {
                setJabatan(res.data.data?.jabatan_fungsional)
            }
            if (res.data.data?.pendidikan_terakhir) {
                setJenjangPendidikan(res.data.data?.pendidikan_terakhir)
            }
            if (res.data.data?.sinta) {
                setSinta(res.data.data?.sinta)
            }
            if (res.data.data?.tempat_lahir) {
                setTempatLahir(res.data.data?.tempat_lahir)
            }
            console.log(res.data.data.tanggalLahir)
            if (res?.data?.data?.tanggalLahir) {
                setTanggalLahir(dateFormat(res.data.data.tanggalLahir, "yyyy-mm-dd"))
            }



        }).catch((err) => {
            console.log(err)
        })

        axios.get(`http://localhost:3005/api/jurusan`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataJurusan(res.data.data)
        }).catch((err) => {
            console.log(err)
        })


    }


    const uploadPicture = (e) => {

        setPicture({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        })
    }

    const hendleUbahUser = () => {

        const formData = new FormData();


        console.log(idJurusan)
        formData.append('name', name)
        formData.append('nomor_tlp', noTlp)
        formData.append('email', email)
        formData.append('username', userName)
        roleId === 4 ? formData.append('nim', nim) : formData.append('nidn', nidn)
        formData.append('jurusanId', idJurusan)
        formData.append('prodiId', idProdi)
        formData.append('roleId', roleId)
        if (jenisKelamin) {
            formData.append('jnsKelaminName', jenisKelamin)
        }
        formData.append('profile_picture', picture?.pictureAsFile)
        formData.append('jabatan', jabatan)
        formData.append('pendidikanTerakhir', jenjangPendidikan)
        formData.append('sinta', sinta)
        if (tanggalLahir) {
            formData.append('tanggalLahir', new Date(tanggalLahir).toISOString())
        }
        formData.append('tempatLahir', tempatLahir)
        formData.append('alamat', alamat)

        formData.append('password', password)
        formData.append('newPassword', newPassword)
        formData.append('newPasswordOne', newPasswordOne)
        
        
        axios.patch(`http://localhost:3005/api/users/${id}`, formData, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            hendleCekUser()
            
            setStatusProfileSaya("showProfile")

            setName('')
            setNoTlp('')
            setEmail('')
            setUserName('')
            setNidn('')
            setNidn('')
            setIdJurusan('')
            setIdProdi('')
            setRoleId('')
            setJenisKelamin('')
            setJabatan('')
            setJenjangPendidikan('')
            setSinta('')
            setTanggalLahir('')
            setTanggalLahir('')
            setPassword('')
            setNewPassword('')
            setNewPasswordOne('')

        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else{
                toast(err.response.data.message)
            }
            // hendleCekUser()
        })

    }

    const hendelGetProdiByJurusan = (name) => {
        if (name) {      
            axios.get(`http://localhost:3005/api/prodi?nameJurusan=${name}`, {headers : { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setDataProdi(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const hendleIdJurusan = (e) => {
        const index = e.selectedIndex;
        const el = e.childNodes[index]
        const option =  el.getAttribute('id'); 

        setIdJurusan(option)
    }

    const hendleIdProdi = (e) => {
        const index = e.selectedIndex;
        const el = e.childNodes[index]
        const option =  el.getAttribute('id'); 

        console.log(option)
        setIdProdi(option)
    }


    useEffect(() => {
        hendleCekUser()
        
    }, [])
    
    return (
        <div>
            {console.log(password)}
            <div className={style.container}>
            <Sidebar/>
                <div className={style.kanan}>
                    <Navbar/>
                    <div className={style.content}>
                        <ToastContainer/>
                        <span className={style.title}>
                            Profile Saya
                        </span>
                        <div className={style.userShow}>
                            {statusProfileSaya === 'editProfileSaya' && (
                               <>
                                <div className={style.userEditImg}>
                                    {console.log(picture)}
                                    {picture !== null && (
                                        <div>
                                            <img src={picture?.picturePreview ? picture.picturePreview : picture} alt="" />
                                        </div>
                                    )}
                                    {picture === null && (
                                        <div>
                                            <span className={`${style.iconImg} material-symbols-outlined`}>person</span>
                                        </div>
                                    )}
                                    <label htmlFor="file">Pilih Gambar</label>
                                    <span className={style.peringantanImg}>Besar File: Maxsimum 5MB. Extensi file yang diperbolehkan: JPG, PNG, JPEG</span>
                                    <input className={style.inputUserImg} type="file" id="file" onChange={uploadPicture}/>
                                </div>
                                <form className={`${style.formUser} ${style.edit}`} action="">
                                    <div className={style.navbarComponent}>
                                        <div className={style.navbar}>
                                            <div className={navbarComponen === 'dataDiri' ? style.navbarActive : style.nonNavbarActive} onClick={() => setNavbarComponen("dataDiri")} >DATA DIRI</div>
                                            <div className={navbarComponen === 'ubahPassword' ? style.navbarActive : style.nonNavbarActive} onClick={() => setNavbarComponen("ubahPassword")} >UBAH PASSWORD</div>
                                        </div>
                                        <div className={style.button}>
                                            <input type="button" value="Back" onClick={() => setStatusProfileSaya('showProfile')} />
                                            <div className={style.save} onClick={() => hendleUbahUser()}>
                                                <span className={`${style.iconSave} material-symbols-outlined`}>save</span>
                                                <span>Save</span>
                                            </div>
                                        </div>
                                    </div>
                                    {navbarComponen === "dataDiri" && (
                                        <div>
                                            <div className={style.conItem}>
                                                <div className={`${style.userShowItemLeft}`}>
                                                    <label htmlFor="">Username <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputLeft} value={userName} onChange={(e) => setUserName(e.target.value)} type="text" />
                                                </div>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">Name <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputRight} value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                                </div>
                                            </div>
                                            <div className={style.conItem}>
                                                <div className={style.userShowItemLeft}>
                                                    {roleId === 4 ? 
                                                        <>
                                                            <label htmlFor="">NIM <span className={style.wajib}>*</span></label>
                                                            <input className={style.inputLeft} value={nim} onChange={(e) => setNim(e.target.value)} type="text" />
                                                        </>
                                                    :   
                                                        <>
                                                            <label htmlFor="">NIDN <span className={style.wajib}>*</span></label>
                                                            <input className={style.inputLeft} value={nidn} onChange={(e) => setNidn(e.target.value)} type="text" />
                                                        </>
                                                }
                                                </div>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">No HP <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputRight}  value={noTlp} onChange={(e) => setNoTlp(e.target.value)} type="number" />
                                                </div>
                                            </div>
                                            <div className={` ${style.conItem}  ${style.select}`}>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">Jurusan<span className={style.wajib}>*</span></label>
                                                    <select name="" id="" value={jurusan} onChange={(e) => `${setJurusan(e.target.value)} ${hendleIdJurusan(e.target)}`}  onClick={(e) => hendelGetProdiByJurusan(e.target.value)}>
                                                        <option>-- Pilih Jurusan --</option>
                                                        {dataJurusan !== 0 && (
                                                            dataJurusan.map((data,key) => {
                                                                return (
                                                                    <option id={data.id} key={key} value={data.name}>{data.name} </option>
                                                                )
                                                            })
                                                        )}
                                                    </select>
                                                </div>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">Program Studi <span className={style.wajib}>*</span></label>
                                                    <select name="" id="" value={prodi} onChange={(e) => `${setProdi(e.target.value)} ${hendleIdProdi(e.target)} `}>
                                                        <option>-- Pilih Prodi --</option>
                                                        {dataProdi.length !== 0 && (
                                                            dataProdi.map((data, key) => {
                                                                return (
                                                                    <option id={data.id} key={key} value={data.name}>{data.name}</option>
                                                                )
                                                            })
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={style.conItem}>
                                                <div className={style.userShowItemLeft}>
                                                    <label htmlFor="">Email <span className={style.wajib}>*</span></label>
                                                    <input className={`${style.inputLeft} ${style.validasiInput}`} value={email} onChange={(e) => setEmail(e.target.value)} required pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" type="email" />
                                                    <span className={style.errorMessage}>Format Email Tidak Sesuai</span>
                                                </div>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">Jenjang Pendidikan<span className={style.wajib}>*</span></label>
                                                    <select name="" className={style.inputRight} id="" value={jenjangPendidikan} onChange={(e) => setJenjangPendidikan(e.target.value)}  onClick={(e) => hendelGetProdiByJurusan(e.target.value)}>
                                                        <option>-- Pilih Jenjang Pendidikan --</option>
                                                        <option value="S1">Sarjana</option>
                                                        <option value="S2">Magister</option>
                                                        <option value="S3">Doktor</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {roleId !== 4 && (    
                                                <div className={style.conItem}>
                                                    <div className={style.userShowItemLeftBig}>
                                                        <label htmlFor="">Jabatan Fungsional<span className={style.wajib}>*</span></label>
                                                            <select name="" className={style.inputLeft} id="" value={jabatan} onChange={(e) => setJabatan(e.target.value)}  onClick={(e) => hendelGetProdiByJurusan(e.target.value)}>
                                                            <option>-- Pilih Jabatan Fungsional --</option>
                                                            <option value="Asisten Ahli">Asisten Ahli</option>
                                                            <option value="Lektor">Lektor</option>
                                                            <option value="Lektor Kepala">Lektor Kepala</option>
                                                            <option value="Profesor">Profesor</option>
                                                        </select>
                                                    </div>
                                                    <div className={style.userShowItemSmall}>
                                                        <label htmlFor="">Score Sinta <span className={style.wajib}>*</span></label>
                                                        <input className={style.inputRight} value={sinta} onChange={(e) => setSinta(e.target.value)} type="text" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className={style.conItem}>
                                                <div className={style.userItemJklm}>
                                                    <span htmlFor="">Jenis Kelamin <span className={style.wajib}>*</span></span>
                                                    <input type="radio" name="L" value="L" checked={jenisKelamin === 'L'} id="L" onChange={() => setJenisKelamin("L")}/><label htmlFor="L">Laki-laki</label>
                                                    <input type="radio" name="P" value="P" checked={jenisKelamin === 'P'} id="P" onChange={() => setJenisKelamin("P")} /><label htmlFor="P">Perempuan</label>
                                                </div>
                                                <div className={style.userShowTempatLahir}>
                                                    <label htmlFor="">Tempat Lahir <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputLeftLahir} value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)} type="text" />
                                                </div>
                                                <div className={style.userShowTanggalLahir}>
                                                    <label htmlFor="">Tanggal Lahir <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputRightLahir} value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} type="date" />
                                                </div>
                                            </div>
                                            <div className={style.conItem}>
                                                <div className={style.userItemAlmt}>
                                                    <label htmlFor="">Alamat Lengkap <span className={style.wajib}>*</span></label>
                                                    <textarea name="" id="" value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
                                                </div>
                                            </div> 
                                        </div>
                                    )}
                                    {navbarComponen === "ubahPassword" && (
                                        <div>
                                            <div className={style.conItem}>
                                                <div className={`${style.userShowItemLeft}`}>
                                                    <label htmlFor="">Password Sekarang <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputLeft} onChange={(e) => setPassword(e.target.value)} type="password" />
                                                </div>
                                            </div>
                                            <div className={style.conItem}>     
                                                <div className={style.userShowItemLeft}>
                                                    <label htmlFor="">Password Baru <span className={style.wajib}>*</span></label>
                                                    <input className={style.inputLeft} onChange={(e) => setNewPassword(e.target.value)} type="password" />
                                                </div>
                                                <div className={style.userShowItem}>
                                                    <label htmlFor="">Ulangi Password Baru <span className={style.wajib}>*</span></label>
                                                    <input className={`${style.inputRight} ${style.validasiInput}`} onChange={(e) => setNewPasswordOne(e.target.value)}required={newPassword.length !== 0 ? true : false} pattern={newPassword} type="password" />
                                                    <span className={style.errorMessage}>Password Tidak Sesuai dengan Password Baru</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}   
                                </form>
                               </>
                            )}
                            {statusProfileSaya === "showProfile" && (
                                <>
                                <div className={style.userShowImg}>
                                {console.log(picture == {})}

                                    {picture !== null && (
                                        <div>
                                            <img src={picture?.picturePreview ? picture.picturePreview : picture} alt="" />
                                        </div>
                                    )}
                                    {picture === null && (
                                        <div>
                                            <span className={`${style.iconImg} material-symbols-outlined`}>person</span>
                                        </div>
                                    )}
                                </div>
                                <form className={`${style.formUser} ${style.show}`} action="">
                                    <div className={style.topShowUser}>
                                        <div>
                                            <p>{name}</p>
                                            <p>{jabatan}</p>
                                        </div>
                                        <div onClick={() => setStatusProfileSaya("editProfileSaya")} className={style.buttonUbahData}>
                                            <span>Ubah Data</span>
                                        </div>
                                    </div>
                                    <div className={style.contentShowUser}>
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Username</span>
                                                </div>
                                                <p>{userName}</p>
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Name</span>
                                                </div>
                                                <p>{name}</p>
                                            </div>
                                        </div>
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    {roleId === 4 ? 
                                                        <span>NIM</span>
                                                    :   
                                                        <span>NIDN</span>
                                                    }
                                                </div>
                                                {roleId === 4 ?
                                                    <p>{nim}</p>    
                                                    :
                                                     <p>{nidn}</p>
                                                }
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Nomor Handphone</span>
                                                </div>
                                                <p>{noTlp}</p>
                                            </div>
                                        </div>
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Jurusan</span>
                                                </div>
                                                <p>{jurusan}</p>
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Program Studi</span>
                                                </div>
                                                <p>{prodi}</p>
                                            </div>
                                        </div>
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Email</span>
                                                </div>
                                                <p>{email}</p>
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Jenjang Pendidikan</span>
                                                </div>
                                                <p>{jenjangPendidikan}</p>
                                            </div>
                                        </div>
                                        {roleId !== 4 && (
                                            <div className={style.showItemUser}>
                                                <div className={style.itemshowUser}>
                                                    <div>
                                                        <span className="material-symbols-outlined">expand_content</span>
                                                        <span>Jabatan Fungsional</span>
                                                    </div>
                                                    <p>{jabatan}</p>
                                                </div>
                                                <div className={style.itemshowUser}>
                                                    <div>
                                                        <span className="material-symbols-outlined">expand_content</span>
                                                        <span>Score Sinta</span>
                                                    </div>
                                                    <p>{sinta}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Jenis Kelamin</span>
                                                </div>
                                                {jenisKelamin !== null ?
                                                    <p>{`${jenisKelamin === "P" ? "Perempuan" : "Laki-laki"}`}</p>
                                                    : 
                                                    <p></p>
                                                }
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Tempat Lahir</span>
                                                </div>
                                                <p>{tempatLahir}</p>
                                            </div>
                                        </div>
                                        <div className={style.showItemUser}>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Alamat</span>
                                                </div>
                                                <p>{alamat}</p>
                                            </div>
                                            <div className={style.itemshowUser}>
                                                <div>
                                                    <span className="material-symbols-outlined">expand_content</span>
                                                    <span>Tanggal Lahir</span>
                                                </div>
                                                <p>{tanggalLahir}</p>
                                            </div>
                                        </div>
                                        {roleId !== 4 && (
                                            <div className={style.showItemUser}>
                                                <div className={style.itemshowUser}>
                                                    <div>
                                                        <span className="material-symbols-outlined">expand_content</span>
                                                        <span>Jabatan Kampus</span>
                                                    </div>
                                                    <p>{jabatanKampus}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form> 
                                </>
                            )}
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile