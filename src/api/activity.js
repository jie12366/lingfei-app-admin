import {
    requestUrl
} from '@/service/axios'

const activity = {
    publishActivity(data) {
        return requestUrl('post', '/activity', {
            title: data.title,
            zone: data.zone,
            date: data.date,
            picture: data.picture,
            content: data.content
        })
    },
    updateActivity(data) {
        return requestUrl('put', '/activity', {
            title: data.title,
            zone: data.zone,
            date: data.date,
            picture: data.picture,
            content: data.content,
            aid: data.aid
        })
    },
    getActivity(){
        return requestUrl('get', '/activity')
    },
    getActivityById(id){
        return requestUrl('get', `/activity/${id}`)
    },
    getMaxId() {
        return requestUrl('get', '/maxId')
    },
    deleteActivity(id) {
        return requestUrl('delete', `/activity/${id}`)
    }
}

export default activity