import { requestUrl } from '@/service/axios.js'

const info = {
    getUsersInfo(start, size){
        return requestUrl('get',`/users/${start}/${size}`)
    },
    getCompetitionInfo(aid){
        return requestUrl('get',`/competition/${aid}`)
    }
}

export default info