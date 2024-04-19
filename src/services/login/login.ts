/**
 * @description 登录页面的请求。
 * @Author: 蒋雯绘
 */
import lsjRequest from '..'

/**
 * @description 点击登录按钮进入系统发起的请求。
 * @param {string} account 账号
 * @param {string} password 密码
 * @method post
 */
export function JWHLoginRequest(account: string, password: string) {
  return lsjRequest.post({
    url: '/login',
    data: { account, password }
  })
}
