import { nanoid } from "nanoid"
export function getNanoid(){
    let NANOID=localStorage.getItem('NANOID')
    if(!NANOID){
        NANOID=nanoid()
        localStorage.setItem('NANOID',NANOID)
    }
    return NANOID
}