import { requestUrl } from '@/service/axios'

const ball = {
    getBallList(){
        return requestUrl('get', '/order/lastList')
    },
    startOrder(){
        return requestUrl('get', '/start/order')
    },
    endOrder(){
        return requestUrl('get', '/stop/order')
    },
    cancelOrder(uid){
        return requestUrl('get', `/cancelBall/${uid}`)
    }
}

export default ball