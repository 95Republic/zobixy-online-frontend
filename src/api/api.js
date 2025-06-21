import axios from "axios";
const local = 'http://localhost:5000'
const production = 'domain name here'
const api = axios.create({
    baseURL : `${local}/api`
})

export default api