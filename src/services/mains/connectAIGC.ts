/**
 * @description 连接大模型。
 * @Author: 李雪茹
 */
import lxrRequest from '..'

/**
 * @description 连接大模型。
 * @param {string} q 发送的问题
 * @method post
 */
export function LXRConnextAIGCRequest(q: string) {
  return lxrRequest.post({
    url: '/chat',
    data: { q }
  })
}
