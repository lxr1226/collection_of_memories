/**
 * @description 意图填入。
 * @Author: 李雪茹
 */
import lsjRequest from '..'

/**
 * @description 意图填入。
 * @param {string} conation 意图
 * @param {string} id 用户id
 * @method post
 */
export function LXRConationRequest(conation: string,id:string) {
  // 创建 FormData 实例
  const formData = new FormData();
  
  // 添加数据到 FormData
  formData.append('conation', conation);
  formData.append('id', id);
  return lsjRequest.post({
    url: '/intention',
    data: formData // 使用 FormData 对象作为请求体
  })
}
