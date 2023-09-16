import axios from "axios";


const registerEmail = (email, password) => {
    let login = {email, password}
    return(dispatch) => {
        axios.post(`http://localhost:3005/api/users/login`, login)
        .then((response) => {
            dispatch({type: 'SET_DATA_LOGIN', payload: {dataLogin: response.data.data}})
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }
}

export default registerEmail