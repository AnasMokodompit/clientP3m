export const AddData = (judul, abstrak, skema, jenisTKT, jenisTargetTKT, biayaLuaran, bidangFokus, lamaKegiatan, pdf) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_ADD_DATA", payload: {judul, abstrak, skema, jenisTKT, jenisTargetTKT, biayaLuaran, bidangFokus, lamaKegiatan, pdf}})
    }
}

export const AddDataPengabdian = (judul, abstrak, skema, temaBidangFokus, bidangFokus, ruangLingkup, lamaKegiatan, pdf)  => {
    return (dispatch) => {
        dispatch({type: "SAVE_ADD_DATA_PENGABDIAN", payload: {judul, abstrak, skema, temaBidangFokus, bidangFokus, ruangLingkup, lamaKegiatan, pdf}})
    }
}

export const saveDataAnggotaMahasiswa = (data) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_ADD_DATA_ANGGOTA_MAHASISWA", payload: data})
    }
}

export const EditDataAnggotaMahasiswa = (data) => {
    return (dispatch) => {
        dispatch({ type: "EDIT_DATA_ANGGOTA_MAHASISWA", payload: data})
    }
}

export const DeleteDataAnggotaMahasiswa = (nim) => {
    return (dispatch) => {
        dispatch({ type: "DELETE_DATA_ANGGOTA_MAHASISWA", payload: nim})
    }
}

export const ResetDataAnggotaMahasiswa = () => {
    return (dispatch) => {
        dispatch({ type: "RESET_DATA"})
    }
}
