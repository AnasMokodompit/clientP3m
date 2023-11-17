import { useNavigate, useParams } from 'react-router-dom'
import style from './AnggotaPenelitian.module.css'
import TableAnggotaPenelitianMahasiswa from './table/TableAnggotaPenelitianMahasiswa'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AddData, AddDataPengabdian, ResetDataAnggotaMahasiswa } from '../config/actions/DataActionMahasiswa'
import TableAnggotaPenelitianDosen from './table/TableAnggotaPenelitianDosen'
import { useEffect } from 'react';
import { ResetDataAnggotaDosen } from '../config/actions/DataActionDosen';
import { ToastContainer, toast } from "react-toastify"



function AnggotaPenelitian() {
    let {dataInSave, dataPengabdian} = useSelector(tes => tes.saveAddDataReducer)
    let {dataInSaveAnggota} = useSelector(tes => tes.saveAddDataReducer)
    let {dataSimpanAnggotaDosen} = useSelector(tes => tes.partisiDosen)
    const {dataLogin} = useSelector(tes => tes.p3m)
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    // const [popupAddAnngotaPenelitian, setPopupAddAnngotaPenelitian] = useState('0')
    const navigate = useNavigate()
    const {id} = useParams()

    const hendleSubmitPenelitian = () => {

        const formData = new FormData();

        formData.append('judul', dataInSave.judul)
        formData.append('skema', dataInSave.skema)
        formData.append('abstrak', dataInSave.abstrak)
        formData.append('jenisTKT', dataInSave.jenisTKT)
        formData.append('jenisTargetTKT', dataInSave.jenisTargetTKT)
        formData.append('biayaLuaran', dataInSave.biayaLuaran)
        formData.append('bidangFokus', dataInSave.bidangFokus)
        formData.append('lamaKegiatan', dataInSave.lamaKegiatan)
        formData.append('usulan_pdf', dataInSave.pdf.pdfAsFile)

        dataSimpanAnggotaDosen.map((data, i) => {
            formData.append(`DataAnggotaDosen[${i}][nameUser]`, data.nameUser)
            formData.append(`DataAnggotaDosen[${i}][jabatan]`, data.jabatan)
            formData.append(`DataAnggotaDosen[${i}][tugasdlmPenlitian]`, data.tugas)
            formData.append(`DataAnggotaDosen[${i}][statusAkun]`, data.statusAkun)
            formData.append(`DataAnggotaDosen[${i}][statusPartisipasi]`, data.statusPartisipasi)

        })

        dataInSaveAnggota.map((data, i) => {
            formData.append(`DataAnggotaMahasiswa[${i}][nim]`, data.nim)
            formData.append(`DataAnggotaMahasiswa[${i}][nameUser]`, data.nameUser)
            formData.append(`DataAnggotaMahasiswa[${i}][tugasdlmPenlitian]`, data.tugas)
        })


        axios.post(`${process.env.REACT_APP_BASE_API}/penelitian`, formData, {headers : { 'Authorization': `Bearer ${dataLogin.dataLogin.token}`}}    
        ).then((res) => {
            console.log(res.data.data)
            alert('Penelitian Berhasil Ditambahkan')

            dispatch(AddData('', '', '', '', '', '', '', '', ''))
            dispatch(ResetDataAnggotaMahasiswa())
            dispatch(ResetDataAnggotaDosen())

            navigate('/data-penelitian')
            
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else if (err.response.data.code === 404) {
                alert(err.response.data.message)
                // navigate('/data-penelitian')
            }else{
                // toast('Penelitian Gagal Berhasil Ditambahkan')
                alert('Penelitian Gagal Berhasil Ditambahkan')
                // navigate('/data-penelitian')
            }
        })

      
    }

    const hendleSimpanAfterEditPenelitian = () => {


        const formData = new FormData();

        formData.append('judul', dataInSave.judul)
        formData.append('skema', dataInSave.skema)
        formData.append('abstrak', dataInSave.abstrak)
        formData.append('jenisTKT', dataInSave.jenisTKT)
        formData.append('jenisTargetTKT', dataInSave.jenisTargetTKT)
        formData.append('biayaLuaran', dataInSave.biayaLuaran)
        formData.append('bidangFokus', dataInSave.bidangFokus)
        formData.append('lamaKegiatan', dataInSave.lamaKegiatan)
        formData.append('usulan_pdf', dataInSave.pdf.pdfAsFile)

        axios.patch(`${process.env.REACT_APP_BASE_API}/penelitian/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            alert('Penelitian Berhasil DiEdit')

            dispatch(AddData('', '', '', '', '', '', '', '', ''))
            dispatch(ResetDataAnggotaMahasiswa())
            dispatch(ResetDataAnggotaDosen())

            navigate('/data-penelitian')
        }).catch((err)=> {
            if (err?.response?.data?.message) {
                alert(err.response.data.message)
            }else{
                alert('Penelitian Gagal Berhasil DiEdit')
            }
            // navigate('/data-penelitian')
        })


    }


    const hendleSubmitPengabdian = () => {
        const formData = new FormData();

        formData.append('judul', dataPengabdian.judul)
        formData.append('skema', dataPengabdian.skema)
        formData.append('temaBidangFokus', dataPengabdian.temaBidangFokus)
        formData.append('abstrak', dataPengabdian.abstrak)
        formData.append('ruangLingkup', dataPengabdian.ruangLingkup)
        formData.append('bidangFokus', dataPengabdian.bidangFokus)
        formData.append('lamaKegiatan', dataPengabdian.lamaKegiatan)
        formData.append('usulan_pdf', dataPengabdian.pdf.pdfAsFile)

        dataSimpanAnggotaDosen.map((data, i) => {
            formData.append(`DataAnggotaDosen[${i}][nameUser]`, data.nameUser)
            formData.append(`DataAnggotaDosen[${i}][jabatan]`, data.jabatan)
            formData.append(`DataAnggotaDosen[${i}][tugasdlmPengabdian]`, data.tugas)
            formData.append(`DataAnggotaDosen[${i}][statusAkun]`, data.statusAkun)
            formData.append(`DataAnggotaDosen[${i}][statusPartisipasi]`, data.statusPartisipasi)

        })

        dataInSaveAnggota.map((data, i) => {
            formData.append(`DataAnggotaMahasiswa[${i}][nim]`, data.nim)
            formData.append(`DataAnggotaMahasiswa[${i}][nameUser]`, data.nameUser)
            formData.append(`DataAnggotaMahasiswa[${i}][tugasdlmPengabdian]`, data.tugas)
        })

        // for (let val of formData.entries()) {
        //     console.log(val[0]+ ', ' + val[1]); 
        //   }
          


        // return


        axios.post(`${process.env.REACT_APP_BASE_API}/pengabdian`, formData, {headers : { 'Authorization': `Bearer ${dataLogin.dataLogin.token}`}}    
        ).then((res) => {
            console.log(res.data.data)
            alert('Pengabdian Berhasil Ditambahkan')

            dispatch(AddDataPengabdian('', '', '', '', '', '', '', ''))
            dispatch(ResetDataAnggotaMahasiswa())
            dispatch(ResetDataAnggotaDosen())

            navigate('/data-pengabdian')
            
        }).catch((err) => {
            console.log(err)
            if (err.response.data.message[0].msg) {
                toast(err.response.data.message[0].msg)
            }else if (err.response.data.code === 404) {
                alert(err.response.data.message)
                // navigate('/data-pengabdian')
            }else{
                // toast('Pengabdian Gagal Berhasil Ditambahkan')
                alert('Pengabdian Gagal Berhasil Ditambahkan')
                // navigate('/data-pengabdian')
            }
        })
        

    }


    const hendleSimpanAfterEditPengabdian = () => {
        const formData = new FormData();

        formData.append('judul', dataPengabdian.judul)
        formData.append('skema', dataPengabdian.skema)
        formData.append('abstrak', dataPengabdian.abstrak)
        formData.append('ruangLingkup', dataPengabdian.ruangLingkup)
        formData.append('bidangFokus', dataPengabdian.bidangFokus)
        formData.append('lamaKegiatan', dataPengabdian.lamaKegiatan)
        formData.append('usulan_pdf', dataPengabdian.pdf.pdfAsFile)

        axios.patch(`${process.env.REACT_APP_BASE_API}/pengabdian/${id}`, formData, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then(() => {
            alert('Pengabdian Berhasil DiEdit')

            dispatch(AddDataPengabdian('', '', '', '', '', '', '', ''))
            dispatch(ResetDataAnggotaMahasiswa())
            dispatch(ResetDataAnggotaDosen())
            
            navigate('/data-pengabdian')
        }).catch((err)=> {
            if (err?.response?.data?.message) {
                alert(err.response.data.message)
            }else{
                alert('Pengabdian Gagal Berhasil DiEdit')
            }
            navigate('/data-pengabdian')
        })
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className={style.container}>
            {/* <div className={`${(popupAddAnngotaPenelitian === "1") ? style.ForBackBlackPopUp : style.nonForBackBlackPopUp}`}>
            </div> */}
            <div className={style.contentItem}>
            <ToastContainer/>
                {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${id}`) && (
                    <p className={style.jdul}>Team Usulan Penelitian Dosen</p>
                )}
                {pathname === "/data-pengabdian/Add" && (
                    <p className={style.jdul}>Team Usulan Pengabdian Dosen</p>
                )}
                <div className={style.newUserForm}>
                    <TableAnggotaPenelitianDosen/>
                </div>
            </div>
            <div className={style.contentItem}>
                {(pathname === "/data-penelitian/Add" || pathname === `/data-penelitian/Edit/${id}`) && (
                    <p className={style.jdul}>Anggota Penelitian Mahasiswa</p>
                )}
                {pathname === "/data-pengabdian/Add" && (
                    <p className={style.jdul}>Anggota Pengabdian Mahasiswa</p>
                )}
                <div className={style.newUserForm}>
                    <TableAnggotaPenelitianMahasiswa/>
                </div>
            </div>     
            <div className={style.createButtton}>
                {pathname === "/data-penelitian/Add" && (
                    <input type="button" className={style.newUserButtonBack} value="Submit" onClick={hendleSubmitPenelitian} />
                    )}
                {pathname === `/data-penelitian/Edit/${id}` && (
                    <input type="button" className={style.newUserButtonBack} value="Simpan" onClick={hendleSimpanAfterEditPenelitian} />
                )}
                {pathname === "/data-pengabdian/Add" && (
                    <input type="button" className={style.newUserButtonBack} value="Submit" onClick={hendleSubmitPengabdian} />
                    )}
                {pathname === `/data-pengabdian/Edit/${id}` && (
                    <input type="button" className={style.newUserButtonBack} value="Simpan" onClick={hendleSimpanAfterEditPengabdian} />
                )}
            </div>
        </div>
    )
}

export default AnggotaPenelitian