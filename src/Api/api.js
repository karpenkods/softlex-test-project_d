import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
})

export const API = {
  getAllTasks(field, direction, page) {
    return instance
      .get('', {
        params: {
          developer: 'KarpenkoDmitrii',
          sort_field: field,
          sort_direction: direction,
          page: page,
        },
      })
      .then((res) => res.data)
  },

  createTask(username, email, text) {
    let form = new FormData()
    form.append('username', username)
    form.append('email', email)
    form.append('text', text)
    return instance
      .post('create?developer=KarpenkoDmitrii', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },

  login(username, password) {
    let form = new FormData()
    form.append('username', username)
    form.append('password', password)
    return instance
      .post('login?developer=KarpenkoDmitrii', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },

  change(text, status, token, id) {
    let form = new FormData()
    form.append('token', token)
    form.append('text', text)
    form.append('status', status)
    return instance
      .post(`edit/${id}?developer=KarpenkoDmitrii`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },
}
