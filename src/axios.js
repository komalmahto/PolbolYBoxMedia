import axios from 'axios'

// 52.66.203.244:2113
// 13.235.90.125:2112
var instance = axios.create({
    baseURL : "https://polbol.in/backend"
})

export default instance