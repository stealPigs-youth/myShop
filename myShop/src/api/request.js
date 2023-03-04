// aixo二次封装
import axios from 'axios'
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
const requests=axios.create({
    baseURL:'/api',
    timeout:5000,
});
requests.interceptors.request.use((config)=>{
    if(store.state.detail.NANOID){
        config.headers.userTempId=store.state.detail.NANOID
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