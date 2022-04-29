import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppAddTask } from '../../Redux/reducer'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../Input/Input'
import '../Admin/Admin.scss'
import '../../index.scss'

const Forms = ({ open }) => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.reducer.isFetching)
  const taskError = useSelector((state) => state.reducer.errorsAddForm)

  const SchemaForm = Yup.object().shape({
    description: Yup.string().required('Обязательное поле'),
    name: Yup.string().required('Обязательное поле'),
    email: Yup.string().email('Неверный email').required('Обязательное поле'),
  })

  const addTask = ({ email, name, description }) => {
    dispatch(AppAddTask(name, email, description))
  }

  const closeAddTask = () => {
    document.body.classList.remove('hidden__addTask')
    open(false)
  }

  return (
    <div className="admin__wrapper">
      <div className="admin__modal">
        <h2 className="admin__title">Новая задача</h2>
        <Formik
          initialValues={{ email: '', name: '', description: '' }}
          validationSchema={SchemaForm}
          onSubmit={(values, { resetForm }) => {
            addTask(values)
            resetForm()
            open(false)
          }}
        >
          {({ values, errors }) => (
            <Form>
              <Input
                name="Имя"
                type="text"
                inputName="name"
                error={errors.name || taskError.username}
              />
              <Input
                name="e-mail"
                type="text"
                inputName="email"
                error={errors.email || taskError.email}
              />
              <Input
                name="Задача"
                component="textarea"
                inputName="description"
                error={errors.description || taskError.text}
              />
              <button
                type="submit"
                className="admin__button"
                disabled={
                  errors.name ||
                  errors.email ||
                  errors.description ||
                  isFetching
                }
              >
                Создать
              </button>
            </Form>
          )}
        </Formik>
        <button className="admin__close" onClick={closeAddTask}>
          <div className="admin__closeRect"></div>
          <div className="admin__closeRect"></div>
        </button>
      </div>
    </div>
  )
}

export default Forms
