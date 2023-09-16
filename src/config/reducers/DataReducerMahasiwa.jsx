const initialstate = {
    dataInSave: null,
    dataPengabdian: null,
    dataInSaveAnggota: [],
}

export const saveAddDataReducer = (state= initialstate , action) => {

    switch (action.type) {
        case 'SAVE_ADD_DATA':
            return {
                ...state,
                dataInSave: action.payload
            };
        case 'SAVE_ADD_DATA_PENGABDIAN':
            return {
                ...state,
                dataPengabdian: action.payload
            };
        case 'SAVE_ADD_DATA_ANGGOTA_MAHASISWA':
            return {
                ...state,
                dataInSaveAnggota: [...state.dataInSaveAnggota, action.payload]
            };
        case 'EDIT_DATA_ANGGOTA_MAHASISWA':
            const index = state.dataInSaveAnggota.findIndex(todo => todo.nim === action.payload.nim)

            console.log(action)

            const newArray = [...state.dataInSaveAnggota]
            
            newArray[index].nim = action.payload.nim
            newArray[index].nama = action.payload.nama
            newArray[index].jurusan = action.payload.jurusan
            newArray[index].prodi = action.payload.prodi
            newArray[index].tugas = action.payload.tugas


            return {
                ...state,
                dataInSaveAnggota: newArray
            };
        case 'DELETE_DATA_ANGGOTA_MAHASISWA':
            return {
                ...state,
                dataInSaveAnggota: state.dataInSaveAnggota.filter((data) => data.nim !== action.payload)
            };
        case 'RESET_DATA':
            return {
                ...state,
                dataInSaveAnggota: []
            };
        default:
            return state
    }
}