let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://47.108.144.113:15148/'
} else {
  // 开发环境
  BASE_URL = 'http://47.108.144.113:15148/'
}

// 30秒
export const TIME_OUT = 30000

export { BASE_URL }
