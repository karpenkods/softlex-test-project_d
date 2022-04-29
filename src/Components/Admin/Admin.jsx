import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppLogin } from '../../Redux/reducer'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../Input/Input'
import './Admin.scss'

const Admin = ({ open }) => {
  const dispatch = useDispatch()
  const errorlogin = useSelector((state) => state.reducer.errorsLogin)
  const isFetching = useSelector((state) => state.reducer.isFetching)
  const SchemaLogin = Yup.object().shape({
    login: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  })

  const login = ({ login, password }) => dispatch(AppLogin(login, password))

  const closeAdmin = () => {
    document.body.classList.remove('hidden__admin')
    open(false)
  }

  return (
    <div className="admin">
      <div className="admin__wrapper">
        <div className="admin__modal">
          <h2 className="admin__title">Авторизация</h2>
          <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={SchemaLogin}
            onSubmit={(values, { resetForm }) => {
              login(values)
              resetForm()
            }}
          >
            {({ values, errors }) => (
              <Form>
                <Input
                  name="Логин"
                  type="text"
                  inputName="login"
                  error={errors.login || errorlogin.username}
                />
                <Input
                  name="Пароль"
                  type="password"
                  inputName="password"
                  error={errors.password || errorlogin.password}
                />
                <button
                  type="submit"
                  className="admin__button"
                  disabled={errors.login || errors.password || isFetching}
                >
                  Войти
                </button>
              </Form>
            )}
          </Formik>
          <button className="admin__close" onClick={closeAdmin}>
            <div className="admin__closeRect"></div>
            <div className="admin__closeRect"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Admin
