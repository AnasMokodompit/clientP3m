export const saveAddPdf = (data) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: "SAVE_ADD_PDF", payload: data})
    }
}

export const DeleteDataPdf = (id) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_DELETE_PDF", payload: id})
    }
}

export const EditDataPdf = (data) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_UPDATE_PDF", payload: data})
    }
}

export const ResetDatSavePdf = () => {
    return (dispatch) => {
        dispatch({ type: "RESET_DATA"})
    }
}