import React from 'react'
import './Navbar.scss'
import d from '../../assets/img/d.png'

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__leftBlock">
          <img className="nav__logo" src={d} alt="logo" />
          <h1 className="nav__heading">Project_D</h1>
        </div>
        <p className="nav__description">
          Тестовое задание для кандидата на роль Frontend-разработчика в
          компанию Softlex
        </p>
      </div>
    </nav>
  )
}

export default Navbar
