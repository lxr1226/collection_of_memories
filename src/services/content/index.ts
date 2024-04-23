import lsjRequest from '..'

export function ZHQgetgrade(grade: string) {
    const token = localStorage.getItem('token');
    return lsjRequest.get({
        headers: {
            'token': token // 将请求头内容传递给后端
        },
        url: `/grade?grade=${grade}`,
    })
}
export function ZHQgetSelextid(id: string) {
    const token = localStorage.getItem('token');
    return lsjRequest.get({
        headers: {
            'token': token // 将请求头内容传递给后端
        },
        url: `/Selextid?id=${id}`,
    })
}
export function ZHQRevise(requestData:{ replied: string, questionId:number, userId:string }) {
    const token = localStorage.getItem('token');
    return lsjRequest.post({
        headers: {
            'token': token // 将请求头内容传递给后端
        },
        url: `/revise`,
        data:requestData
    })
}
export function ZHQstoragesystem(requestData:{ replied: string, user_id:string, question_id:number }) {
    const token = localStorage.getItem('token');
    return lsjRequest.post({
        headers: {
            'token': token // 将请求头内容传递给后端
        },
        url: `/storagesystem`,
        data:requestData
    })
}
