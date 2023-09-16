const initialstate = {
    dataSimpanAnggotaDosen: [],
}

export const partisiDosen = (state= initialstate , action) => {

    switch (action.type) {
        case 'SAVE_ADD_DATA_ANGGOTA_DOSEN':
            return {
                ...state,
                dataSimpanAnggotaDosen: [...state.dataSimpanAnggotaDosen, action.payload]
            };
        case 'EDIT_DATA_ANGGOTA_DOSEN':
            const indexDosen = state.dataSimpanAnggotaDosen.findIndex(todo => todo.nameUser === action.payload.nameUser)

            const newArrayDosen = [...state.dataSimpanAnggotaDosen]
            
            newArrayDosen[indexDosen].jabatan = action.payload.jabatan
            newArrayDosen[indexDosen].tugas = action.payload.tugas


            return {
                ...state,
                dataSimpanAnggotaDosen: newArrayDosen
            };
        case 'DELETE_DATA_ANGGOTA_DOSEN':
            return {
                ...state,
                dataSimpanAnggotaDosen: state.dataSimpanAnggotaDosen.filter((data) => data.nameUser !== action.payload)
            };
        case 'RESET_DATA':
            return {
                ...state,
                dataSimpanAnggotaDosen: []
            };
        default:
            return state
    }
}