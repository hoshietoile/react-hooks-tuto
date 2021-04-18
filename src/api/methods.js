import api from './index'

class Api {
  constructor() {
    this.api = api
    this.imageResource = '/api/images'
  }

  storeImage(payload) {
    return api.post(this.imageResource, payload)
  }
}
export default Api
