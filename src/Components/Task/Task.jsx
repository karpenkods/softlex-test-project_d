import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppChange } from '../../Redux/reducer'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import './Task.scss'
import '../Input/Input.scss'
import pencil from '../../assets/img/pencil.svg'

const Task = ({ id, name, email, status, description }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.reducer.token)
  const [isEdit, setIsEdit] = useState(false)
  const initDesc = useRef(description)

  const validate = Yup.object().shape({
    description: Yup.string().required(),
    statusForm: Yup.boolean(),
  })

  const statusText =
    status === 0
      ? 'задача не выполнена'
      : status === 1
      ? 'задача не выполнена, отредактирована админом'
      : status === 10
      ? 'задача выполнена'
      : 'задача отредактирована админом и выполнена'

  const changeText = ({ description, statusForm }) => {
    let helperStatus

    if (status === 1 || status === 11) {
      if (statusForm) helperStatus = 11
      else helperStatus = 1
    } else if (description === initDesc.current) {
      if (statusForm) helperStatus = 10
      else helperStatus = 0
    } else {
      if (statusForm) helperStatus = 11
      else helperStatus = 1
    }

    dispatch(AppChange(description, helperStatus, token, id))
    setIsEdit(false)
  }

  return (
    <div
      className={`taskItem ${
        status === 10 || status === 11 ? 'taskItem__access' : ''
      }`}
    >
      <Formik
        initialValues={{
          statusForm: status === 0 || status === 1 ? false : true,
          description: description,
        }}
        validationSchema={validate}
        onSubmit={(values) => changeText(values)}
      >
        {({ submitForm }) => (
          <Form>
            <span className="taskItem__text">
              <strong>Номер задачи:</strong> {id}
            </span>
            <span className="taskItem__text">
              <strong>Имя:</strong> {name}
            </span>
            <span className="taskItem__text">
              <strong>e-mail:</strong> {email}
            </span>
            <span className="taskItem__text">
              <strong>Статус:</strong> {statusText}{' '}
              {token && (
                <Field
                  name="statusForm"
                  type="checkbox"
                  className="taskItem__checkBox"
                  onClick={submitForm}
                />
              )}
            </span>
            <span className="taskItem__text">
              {isEdit ? (
                <div>
                  <Field
                    name="description"
                    component="textarea"
                    className="inputItem__inputArea inputItem__input taskItem__textArea"
                  />
                  <button type="submit" className="taskItem__button">
                    Изменить
                  </button>
                </div>
              ) : token ? (
                <div>
                  {description}
                  <button
                    className={`taskItem__editBtn ${
                      status === 10 || status === 11 ? 'taskItem__del' : ''
                    }`}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsEdit(true)
                    }}
                  >
                    <img
                      src={pencil}
                      alt="Редактировать"
                      className="taskItem__editImg"
                    />
                  </button>
                </div>
              ) : (
                description
              )}
            </span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Task
