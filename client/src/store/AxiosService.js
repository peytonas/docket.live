import Axios from 'axios'

class AxiosService {
  constructor(path = "") {
    let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/';
    this.resource = Axios.create({
      baseURL: base + path,
      timeout: 8000,
      withCredentials: true
    })
  }

  async get(path = "") {
    let res = await this.resource.get(path)
    return res.data
  }

  async post(payload, path = "") {
    let res = await this.resource.post(path, payload)
    return res.data
  }
  async put(payload, path = "") {
    let res = await this.resource.put(path + payload.id, payload)
    return res.data
  }
  async delete(id, path = "/") {
    let res = await this.resource.delete(path + id)
    return res.data
  }

}

export const PollsResource = new AxiosService("api/polls")
export const QuestionsResource = new AxiosService("api/questions")
export const ResultsResource = new AxiosService("api/results")


export const DynamicResource = (path) => new AxiosService(path)