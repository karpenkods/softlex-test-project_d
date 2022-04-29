import { API } from '../Api/api'

const APP_SET_ALL_TASKS = 'APP_SET_ALL_TASKS'
const APP_SET_TASK = 'APP_SET_TASK'
const APP_SET_ERROR_ADD_FORM = 'APP_SET_ERROR_ADD_FORM'
const APP_SET_IS_FETCHING = 'APP_SET_IS_FETCHING'
const APP_SET_ERROR_LOGIN = 'APP_SET_ERROR_LOGIN'
const APP_SET_TOKEN = 'APP_SET_TOKEN'
const APP_SET_CHANGE = 'APP_SET_CHANGE'

let initialState = {
  isFetching: false,
  tasks: [],
  token: null,
  allTaskCount: null,
  errorsAddForm: {},
  errorsLogin: {},
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_ALL_TASKS:
      return {
        ...state,
        tasks: action.data.tasks,
        allTaskCount: +action.data.total_task_count,
      }
    case APP_SET_TASK:
      console.log(action.data)
      const newArrayAdd = [...state.tasks]
      if (newArrayAdd.length < 3) newArrayAdd.push(action.data)
      const newCount = ++state.allTaskCount
      return { ...state, tasks: newArrayAdd, allTaskCount: newCount }
    case APP_SET_ERROR_ADD_FORM:
      return { ...state, errorsAddForm: action.data }
    case APP_SET_IS_FETCHING:
      return { ...state, isFetching: action.data }
    case APP_SET_ERROR_LOGIN:
      return { ...state, errorsLogin: action.data }
    case APP_SET_TOKEN:
      return { ...state, token: action.data }
    case APP_SET_CHANGE:
      const index = state.tasks.findIndex((el) => el.id === action.data.id)
      const newArray = [...state.tasks]
      newArray[index].text = action.data.text
      newArray[index].status = action.data.status
      return { ...state, tasks: newArray }
    default:
      return state
  }
}
export const AppSetAllTasks = (data) => ({
  type: APP_SET_ALL_TASKS,
  data,
})

export const AppSetTask = (data) => ({
  type: APP_SET_TASK,
  data,
})

export const AppSetErrorAddForm = (data) => ({
  type: APP_SET_ERROR_ADD_FORM,
  data,
})
export const AppSetErrorLogin = (data) => ({
  type: APP_SET_ERROR_LOGIN,
  data,
})

export const AppSetFetching = (data) => ({
  type: APP_SET_IS_FETCHING,
  data,
})

export const AppSetToken = (data) => ({
  type: APP_SET_TOKEN,
  data,
})
export const AppSetChange = (data) => ({
  type: APP_SET_CHANGE,
  data,
})
export const AppGetTasks = (field, direction, page) => async (dispatch) => {
  try {
    dispatch(AppSetFetching(true))
    const data = await API.getAllTasks(field, direction, page)
    if (data.status === 'ok') dispatch(AppSetAllTasks(data.message))
    dispatch(AppSetFetching(false))
  } catch (error) {}
}

export const AppAddTask = (username, email, text) => async (dispatch) => {
  try {
    dispatch(AppSetFetching(true))
    const data = await API.createTask(username, email, text)
    if (data.status === 'ok') dispatch(AppSetTask(data.message))
    else if (data.status === 'error') dispatch(AppSetErrorAddForm(data.message))
    dispatch(AppSetFetching(false))
  } catch (error) {}
}

export const AppLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(AppSetFetching(true))
    const data = await API.login(username, password)
    dispatch(AppSetErrorLogin({}))
    if (data.status === 'ok') {
      dispatch(AppSetToken(data.message.token))
      localStorage.setItem('token', data.message.token)
    } else if (data.status === 'error') dispatch(AppSetErrorLogin(data.message))

    dispatch(AppSetFetching(false))
  } catch (error) {}
}

export const AppChange = (text, status, token, id) => async (dispatch) => {
  try {
    const data = await API.change(text, status, token, id)
    if (data.status === 'ok') dispatch(AppSetChange({ text, status, id }))
    else if (data.status === 'error' && data.message === 'Токен истёк')
      localStorage.removeItem('token')
  } catch (error) {}
}

export default AppReducer
