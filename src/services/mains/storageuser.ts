/**
 * @description 存储用户回答。
 * @Author: 李雪茹
 */
import lsjRequest from '..'

/**
 * @description 存储用户的回答。
 * @param {string} replied 用户回答
 * @param {string} question_id 问题id
 * @param {string} user_id 用户id
 * @method post
 */
export function LXRStorageUserRequest(replied: string, question_id: number,user_id:string) {
  return lsjRequest.post({
    url: '/storageuser',
    data: { replied, question_id,user_id }
  })
}
