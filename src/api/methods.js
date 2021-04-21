import api from './index'

class Api {
  constructor() {
    this.api = api
    this.imageResource = '/api/images'
  }

  getImages() {
    return api.get(this.imageResource)
  }
  storeImage(payload) {
    return api.post(this.imageResource, payload)
  }
}
export default Api
