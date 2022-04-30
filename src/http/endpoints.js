const API_URL = 'http://127.0.0.1:8000'

export const endpoints = {
  generateStudents: {
    method: 'get',
    url: `${API_URL}/test-write`
  },
  getStudents: {
    method: 'get',
    url: `${API_URL}/test-read`
  },
}
