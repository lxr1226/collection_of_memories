let BASE_URL = ''
if (import.meta.env.PROD) {
  // 正式环境
  BASE_URL = 'http://47.108.144.113:8906'
} else {
  // 开发环境
  BASE_URL = 'http://47.108.144.113:8906'
}

// 30秒
export const TIME_OUT = 30000

export { BASE_URL }
