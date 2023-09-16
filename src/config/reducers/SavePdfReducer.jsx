const initialstate = {
    optionsPdf: []
}


export const dataPdf = (state= initialstate , action) => {
    switch (action.type) {
        case 'SAVE_ADD_PDF':
            console.log(action)
            return {
                ...state,
                optionsPdf: [...state.optionsPdf, action.payload]
            };
        case 'SAVE_DELETE_PDF':
            console.log(action)
            return {
                ...state,
                optionsPdf: state.optionsPdf.filter((data) => data.id !== action.payload)
            };
        case 'SAVE_UPDATE_PDF':
            const indexUpdatePdf = state.optionsPdf.findIndex(todo => todo.id == action.payload.id)

            const newArrayPdf = [...state.optionsPdf]

            if (newArrayPdf[indexUpdatePdf].picturePreview) {
                newArrayPdf[indexUpdatePdf].pictureAsFile = action.payload.pictureAsFile 
            }
            
            newArrayPdf[indexUpdatePdf].picturePreview = action.payload.picturePreview 
            newArrayPdf[indexUpdatePdf].namePdf = action.payload.namePdf 


            return {
                ...state,
                optionsPdf: newArrayPdf
            };
        case 'RESET_DATA':
            return {
                ...state,
                optionsPdf: []
            };
        default:
            return state
    }
}