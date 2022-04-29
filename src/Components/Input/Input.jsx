import React from 'react'
import { Field } from 'formik'
import './Input.scss'

const Input = ({ name, type, component, inputName, error }) => {
  return (
    <div className="inputItem">
      <div className="inputItem__text">
        <span className="inputItem__name">{name}</span>
        {error && <span className="inputItem__inputError">{error}</span>}
      </div>
      <Field
        type={type}
        name={inputName}
        component={component || 'input'}
        className={`inputItem__input ${
          component === 'textarea' && 'inputItem__inputArea'
        } 
        ${error && 'inputItem__input--error'}`}
      />
    </div>
  )
}

export default Input
