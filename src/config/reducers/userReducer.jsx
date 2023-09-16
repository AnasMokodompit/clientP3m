const initialstate = {
    dataLogin: null
}

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "SET_DATA_LOGIN":
            return {
                ...state,
                dataLogin: action.payload
            };
        case "GET_DATA_USER":
            return {
                ...state,
                dataUser: action.payload
            };
        default:
            return state
    }
}

export default userReducer