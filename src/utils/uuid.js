import { v4 as uuidv4 } from 'uuid'
export const getUid = () => {
    let uuid = localStorage.getItem('TEMPID')
    if(!uuid){
        uuid = uuidv4()
        localStorage.setItem('TEMPID',uuid)
    }
    return uuid
}