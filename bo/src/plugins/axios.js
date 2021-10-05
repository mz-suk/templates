// axios interceptor
export default ({ $axios, $config }) => {
  // const localToken = localStorage.getItem('token')
  // if (localToken) $axios.defaults.headers.common['X-AUTH-TOKEN'] = localToken
  // if ($config.axios === undefined) $config.axios = {}
  // $axios.interceptors.request.use(
  //   (config) => {
  //     config.method = config.method || 'post'
  //     config.timeout = config.timeout || 60000
  //     if (config.method === 'post') config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json;charset=utf-8'
  //     config.callback = typeof config.apiCallback === 'function' ? config.apiCallback : null
  //     return config
  //   },
  //   (error) => {
  //     return Promise.reject(error)
  //   },
  // )
  // $axios.interceptors.response.use(
  //   (response) => {
  //     return response.data
  //   },
  //   (error) => {
  //     console.log('error: ', error)
  //     return Promise.reject(error)
  //   },
  // )
}
