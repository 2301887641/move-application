/**
 * Created by qiangbi on 17-7-27.
 */
// 本地配置变量
import Config from './base.js'
// ajax请求
import Axios from 'axios'
// 路由跳转
import route from '../router'
// element组件
import Ele from 'element-ui'
Axios.defaults.baseURL = Config.login
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.defaults.withCredentials = true
  let Http = function() {
    // 配置文件信息
    this.conf = Config
    // ajax get请求  get带参数和header头 axios.get(`http://***/api/v1/public/homepage`, {params: params,headers:{"sn":"201021622343"}})
    this.get = (url, callback, config = '') => {
      // let _this = this
      Axios.get(url, config).then((response) => {
        // 正确接收到响应后我们的所有数据都在data里面
        this.callbackFunc(response, callback)
      }).catch((error) => {
        if (error) {
          // this.errorMessage()
        }
      })
    }
    // ajax post请求
    this.post = (url, data, callback, config = '') => {
      Axios.post(url, data, config).then((response) => {
        this.callbackFunc(response, callback)
      }).catch((error) => {
        if (error) {
          // this.errorMessage()
        }
      })
    }
    // ajax put请求
    this.put = (url, data, callback, config = '') => {
      Axios.put(url, data, config).then((response) => {
        this.callbackFunc(response, callback)
      }).catch((error) => {
        if (error) {
          this.errorMessage()
        }
      })
    }
    // ajax delete请求
    this.delete = (url, callback, config = '') => {
      // let _this = this
      Axios.delete(url, config).then((response) => {
        // 正确接收到响应后我们的所有数据都在data里面
        this.callbackFunc(response, callback)
      }).catch((error) => {
        if (error) {
          // this.errorMessage()
        }
      })
    }
    // 未登录get信息
    this.unauthGet = (url, callback, config = '') => {
      Axios.get(url, config).then((responent) => {
        // 正确接收到响应后我们的所有数据都在data里面
        callback(responent.data)
      }).catch((error) => {
        if (error) {
          callback(-1, error)
        }
      })
    }
    // 未登录post
    this.unauthPost = (url, data, callback, config = '') => {
      Axios.post(url, data, config).then((responent) => {
        // 正确接收到响应后我们的所有数据都在data里面
        callback(responent.data)
      }).catch((error) => {
        if (error) {
          callback(-1, error)
        }
      })
    }
    this.callbackFunc = (response, callback) => {
      if (response.data.status === 500) {
        response.data.msg && Ele.Message.error(response.data.msg)
      } else if (response.data.status === 200) {
        !callback(response.data) && response.data.msg && Ele.Message.success(response.data.msg)
      }
    }
    // 错误路由跳转
    this.errorMessage = () => {
      route.replace('/')
      Ele.Message.error('登录超时,请重新登录')
    }
    // promise 格式同步输出
    this.syncMenu = (headers) => {
      return new Promise(function(resolve, reject) {
        Axios.get(Config.domain + 'menu', headers).then((response) => {
          resolve(response.data)
          // state.commit('setMenus', response.data)
        }).catch((error) => {
          if (error) {
            // this.errorMessage()
          }
        })
      })
    }
  }
export default Http
