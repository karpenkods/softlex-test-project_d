import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppGetTasks, AppSetToken } from './Redux/reducer'
import Admin from './Components/Admin/Admin'
import Task from './Components/Task/Task'
import Navbar from './Components/Navbar/Navbar'
import Loader from './Components/Loader/Loader'
import Forms from './Components/Forms/Forms'
import arr_down from './assets/img/sort_down.svg'
import './App.scss'

const App = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.reducer.tasks)
  const isFetching = useSelector((state) => state.reducer.isFetching)
  const token = useSelector((state) => state.reducer.token)
  const allTaskCount = useSelector((state) => state.reducer.allTaskCount)
  const [isOpenAddTask, setIsOpenAddTask] = useState(false)
  const [isOpenAdmin, setIsOpenAdmin] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [sort, setSort] = useState({
    field: 'id',
    direction: 'asc',
  })
  let countPages = null
  let pages = null
  let arrayNum = []

  const openModalAdmin = () => {
    document.body.classList.add('hidden__admin')
    setIsOpenAdmin(true)
  }

  const openModalAddTask = () => {
    document.body.classList.add('hidden__addTask')
    setIsOpenAddTask(true)
  }

  const changeSort = (field) => {
    if (sort.field !== field)
      setSort({ ...sort, field: field, direction: 'asc' })
    else if (sort.field === field && sort.direction === 'asc')
      setSort({ ...sort, direction: 'desc' })
    else if (sort.field === field && sort.direction === 'desc')
      setSort({ ...sort, direction: 'asc', field: 'id' })
  }

  if (allTaskCount) {
    countPages = Math.ceil(allTaskCount / 3)
    for (let i = 1; i <= countPages; i++) arrayNum.push(i)
    pages = arrayNum.map((el) => (
      <button
        key={el}
        className={`tasks__pageButton ${
          pageNum === el && 'tasks__pageButton--active'
        }`}
        onClick={() => setPageNum(el)}
      >
        {el}
      </button>
    ))
  }

  useEffect(() => {
    dispatch(AppGetTasks(sort.field, sort.direction, pageNum))
  }, [sort, pageNum, dispatch])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) dispatch(AppSetToken(token))
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <div className="tasks">
        <div className="container">
          <h1 className="tasks__title">Задачи</h1>
          {!isFetching && tasks && tasks.length > 0 && (
            <div className="tasks__sortWrapper">
              <span className="tasks__sortText">Сортировка:</span>
              <button
                className={`tasks__sortButton ${
                  sort.field === 'id' && 'tasks__sortButton--active'
                }`}
                onClick={() => changeSort('id')}
              >
                Номер задачи
                <img
                  src={arr_down}
                  alt="Сортировка по возрастанию"
                  className={`tasks__sortArrow ${
                    sort.field === 'id' &&
                    sort.direction === 'desc' &&
                    'tasks__sortArrow--up'
                  }`}
                />
              </button>
              <button
                className={`tasks__sortButton ${
                  sort.field === 'username' && 'tasks__sortButton--active'
                }`}
                onClick={() => changeSort('username')}
              >
                Имя
                <img
                  src={arr_down}
                  alt="Сортировка по возрастанию"
                  className={`tasks__sortArrow ${
                    sort.field === 'username' &&
                    sort.direction === 'desc' &&
                    'tasks__sortArrow--up'
                  }`}
                />
              </button>
              <button
                className={`tasks__sortButton ${
                  sort.field === 'email' && 'tasks__sortButton--active'
                }`}
                onClick={() => changeSort('email')}
              >
                Почта
                <img
                  src={arr_down}
                  alt="Сортировка по возрастанию"
                  className={`tasks__sortArrow ${
                    sort.field === 'email' &&
                    sort.direction === 'desc' &&
                    'tasks__sortArrow--up'
                  }`}
                />
              </button>
              <button
                className={`tasks__sortButton ${
                  sort.field === 'status' && 'tasks__sortButton--active'
                }`}
                onClick={() => changeSort('status')}
              >
                Статус
                <img
                  src={arr_down}
                  alt="Сортировка по возрастанию"
                  className={`tasks__sortArrow ${
                    sort.field === 'status' &&
                    sort.direction === 'desc' &&
                    'tasks__sortArrow--up'
                  }`}
                />
              </button>
            </div>
          )}
          {!isFetching && tasks && tasks.length > 0 ? (
            tasks.map((el) => (
              <Task
                key={el.id}
                id={el.id}
                name={el.username}
                email={el.email}
                status={el.status}
                description={el.text}
              />
            ))
          ) : isFetching ? (
            <span className="tasks__loader">
              <Loader />
            </span>
          ) : (
            <span className="tasks__empty">Задач нет</span>
          )}
          {!isFetching && tasks && tasks.length > 0 && (
            <div className="tasks__pagesWrapper">{pages}</div>
          )}
          <button className="tasks__adminBtn" onClick={openModalAddTask}>
            Добавить задачу
          </button>
          {isOpenAddTask && <Forms open={setIsOpenAddTask} />}
          {!token && (
            <div>
              <button className="tasks__adminBtn" onClick={openModalAdmin}>
                Вход для администратора
              </button>
              <p className="tasks__description">
                Чтобы изменять задачи, а также принимать/отменять выполнение
                задач, войдите в учётную запись администратора.
              </p>
            </div>
          )}
          {!token && isOpenAdmin && <Admin open={setIsOpenAdmin} />}
        </div>
      </div>
    </div>
  )
}

export default App
