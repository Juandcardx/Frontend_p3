import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.api-onepiece.com/v2',
})

export default api
