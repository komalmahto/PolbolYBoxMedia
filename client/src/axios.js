import axios from 'axios'


var instance = axios.create({
    baseURL : "http://13.235.90.125:2112"
})

export default instance