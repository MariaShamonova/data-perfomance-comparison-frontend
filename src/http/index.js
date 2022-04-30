import axios from 'axios'
import {
  endpoints
} from './endpoints'

const cancelToken = axios.CancelToken
const pending = []

const removePending = (config) => {
  for (const i in pending) {
    if (pending[i].url === config.url) {
      pending[i].f('Request canceled')
    }
  }
}
class HttpClient {
  constructor () {
    this.defaultHeaders = {}
    this.client = axios.create({
      headers: this.defaultHeaders
    })

    this.client.interceptors.request.use(
      config => {
        removePending(config)

        if (config.cancelToken) {
          config.cancelToken = new cancelToken(function executor (c) {
            pending.push({
              url: config.url,
              f: c
            })
          })
        }

        const changeHeaders = {
          ...this.defaultHeaders
        }
        

        return {
          ...config,
          headers: changeHeaders
        }
      },
      err => Promise.reject(err)
    )

    this.client.interceptors.response.use(
      res => {
        return res
      },
      err => {

        return Promise.reject(err)
      }
    )
  }

  formatUrl (url, args) {
    let changeUrl = url

    Object.keys(args).forEach(key => {
      changeUrl = changeUrl.replace(`{${key}}`, args[key])
    })

    return changeUrl
  }

  checkCurrentRequests () {

  }
}

export default new Proxy(
  new HttpClient(), {
    get (target, name) {
      if (endpoints[name] !== undefined) {
        return ({
          params = {},
          data = {},
          args = {},
          cancelToken = null
        } = {}) => {
          return target.client({
            method: endpoints[name].method,
            url: target.formatUrl(endpoints[name].url, args),
            data,
            params,
            cancelToken
          }).then(response => response.data)
        }
      } else {
        return target[name]
      }
    }
  }
)
