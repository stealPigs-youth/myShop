// aixo二次封装
import axios from 'axios'
const requests=axios.create({
    baseURL:'http://localhost:8080/api',
    timeout:5000,
});
requests.interceptors.request.use((config)=>{
    return config;
})
requests.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error('failed'))
})
export default requests