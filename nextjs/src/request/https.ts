import axios from 'axios'

const httpBaseUrl = process.env.VERCEL_URL

const http = axios.create({
  baseURL: httpBaseUrl,
  timeout: 10000,
})

export { http }
