export const saveDataAnggotaDosen = (data) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_ADD_DATA_ANGGOTA_DOSEN", payload: data})
    }
}

export const EditDataAnggotaDosen = (data) => {
    return (dispatch) => {
        dispatch({ type: "EDIT_DATA_ANGGOTA_DOSEN", payload: data})
    }
}

export const DeleteDataAnggotaDosen = (nim) => {
    return (dispatch) => {
        dispatch({ type: "DELETE_DATA_ANGGOTA_DOSEN", payload: nim})
    }
}

export const ResetDataAnggotaDosen = () => {
    return (dispatch) => {
        dispatch({ type: "RESET_DATA"})
    }
}