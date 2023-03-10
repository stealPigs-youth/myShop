// aixo二次封装
import axios from 'axios'
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
const requests=axios.create({
    baseURL:'/api',
    timeout:5000,
});
requests.interceptors.request.use((config)=>{
    if(localStorage.getItem('NANOID')){
        config.headers.userTempId=localStorage.getItem('NANOID')
    }
    if(localStorage.getItem('TOKEN')){
        config.headers.token=localStorage.getItem('TOKEN')
    }
    nProgress.start()
    return config;
})
requests.interceptors.response.use((res)=>{
    nProgress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error(error))
})
export default requests