import axios from 'axios'


const  instance = axios.create({
    baseURL : "https://backend.polbol.in/backend"
})

export default instance;