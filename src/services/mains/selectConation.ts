/**
 * @description 查询意图。
 * @Author: 李雪茹
 */
import lsjRequest from '..'

/**
 * @description 查询意图。
 * @param null
 * @method get
 */
export function LXRSelectConationRequest() {
  return lsjRequest.get({
    url: '/SelectConation'
  })
}
