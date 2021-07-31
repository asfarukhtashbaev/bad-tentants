import React, { useState, useContext } from 'react';
import {Animated} from "react-animated-css";
import './App.css';
import logo from './logo.png'
import profilePhoto from './images/Vector.png'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserBlock from './components/user-page';
import {Link} from "react-router-dom"
import UsersContext from './context';







function App() {
  const [visible, setVisible] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [click, setClick] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [showmodal, setShowModal] = useState(false)
  
  const users = useContext(UsersContext)

  const renderUsers = users.filter(val=> {
    if (click === false) {
      return null
    } else if (
      val.name.toLowerCase().includes(searchItem.toLowerCase()) || 
      val.lastName.toLowerCase().includes(searchItem.toLowerCase()) ||
      val.gender[0].toLowerCase().includes(searchItem.toLowerCase()) ||
      val.gender[1].toLowerCase().includes(searchItem.toLowerCase()) ||
      val.birthDate.toLowerCase().includes(searchItem.toLowerCase()) && click === true
  ){
    return val
  }
  }).map(function(item, index){
    return(
      <div key={index} className="user-block">
        <img src={item.avatar} alt="" className="user-image" />
        <div className="user-block__text">
          <h3 key={item.id} className="user-title">{item.name} {item.lastName}</h3>
          <h3 className="user-adress">Адрес: {item.location}</h3>
            <h3 className="user-description__title">Описание:</h3>
            <p className="user-description">{item.description}</p>
        </div>
        <Link className="user-block__button" to={`/profile/${item.id}`}>View profile</Link>
      </div>
    )
  })

  return (
    <Router>
      <div className="App">
        <Animated animationIn="fadeIn" animationOut="fadeOut" animateOnMount={false} isVisible={showmodal}>
          <div className="modal">
            <form action="" className="form">
              <button className="modal-exit" onClick={(e) => {
                  e.preventDefault()
                  setShowModal(!showmodal)
                }}>
                <i class="fas fa-times"></i>
              </button>
              <h3>Регистрация на сайте BadTentants</h3>
              <label htmlFor="">Имя</label>
              <input type="text" />
              <label htmlFor="">Почтовый ящик</label>
              <input type="text" />
              <label htmlFor="">Пароль</label>
              <input type="password" />
              <div className="option">
                <h3 className="option-title">Кто вы ?</h3>
                <button onClick={(e) => {
                  e.preventDefault()
                }}>Арендодатель</button>
                <button onClick={(e) => {
                  e.preventDefault()
                }}>Клиент</button>
              </div>
              <button className="registration">Зарегистрироваться</button>
            </form>
          </div>
        </Animated>
        <header className="header">
          <navbar className="header__navbar">
            <div className="container">
              <div className="header__row">
                <Link to="/">
                  <img src={logo} alt="" className="logo" />
                </Link>
                {!showmodal? <ul className="header__list">
                  <li className="header__list--item"><a href="" className="header__link">RU</a></li>
                  <li className="header__list--item"><a href="" className="header__link">ENG</a></li>
                </ul>: null }
                <div className="header__nav--info">
                    <div className="User-area">
                      <div className="User-avtar">
                        <span></span>
                        <img src={profilePhoto} className="user-avatar" onClick={() => {
                          setShowUserInfo(!showUserInfo)
                        }} />
                      </div>
                        <Animated animationIn="fadeIn" animationOut="flipOutX" animateOnMount={false} isVisible={showUserInfo}>
                          <ul className="User-Dropdown">
                            <li><button onClick={() => {
                              setShowModal(!showmodal)
                              setShowUserInfo(false)
                              setVisible(false)
                            }}>Регистрация</button></li>
                            <li><button onClick={() => {
                              setShowModal(!showmodal)
                              setShowUserInfo(false)
                              setVisible(false)
                            }}>Вход</button></li>
                          </ul>
                        </Animated>
                    </div>
                </div>
              </div>
              <div className="header__body">
                {!visible? <form action="" className="search__form">
                  <input type="text" className="search__input" placeholder="Искать по имени" />
                  <button className="search__button">
                    <i class="fas fa-search"></i>
                  </button>
                </form>: null}
                <div className="elastic__search">
                  <h1 className="elastic__search--title">Не знаете у кого покупать?</h1>
                  <span className="elastic__search--subtitle">
                    Не бойтесь
                  </span>
                  <button className="elastic__search--button" onClick={() => {
                    setVisible(true)
                    setShowUserInfo(false)
                  }}>
                    Гибкий поиск
                  </button>
                </div>
              </div>
            </div>
          </navbar>
        </header>
              <Switch>
                <Route exact path="/">
                  <Animated animationIn="zoomInLeft" animationOut="zoomOutLeft" animateOnMount={false} isVisible={visible}>
                    <main className="main">
                      <div className="container">
                        <div className="main-text">
                          <h3>Гибкий поиск</h3>
                          <button onClick={() => {
                            setVisible(!visible)
                          }}>
                          <i class="fas fa-times"></i>
                          </button>
                        </div>
                        <form action="" className="elastic-search">
                          <input type="text" placeholder ="Имя" className="elastic__search--input" onChange={(e) => {
                            setSearchItem(e.target.value)
                            setClick(false)
                          }} />
                          <input type="text" placeholder ="Фамилия" className="elastic__search--input" onChange={(e) => {
                            setSearchItem(e.target.value)
                            setClick(false)
                          }} />
                          <input type="text" placeholder ="Пол" className="elastic__search--input" onChange={(e) => {
                            setSearchItem(e.target.value)
                            setClick(false)
                          }} />
                          <input type="text" placeholder ="Год рождения" className="elastic__search--input" onChange={(e) => {
                            setSearchItem(e.target.value)
                            setClick(false)
                          }} />
                          <button onClick={(e) => {
                            e.preventDefault()
                            setClick(true)
                          }}>Найти</button>
                        </form>
                        <div className="user-items">
                            {renderUsers}
                        </div>
                      </div>
                    </main>
                  </Animated>
                </Route>
                <Route path="/profile/:id">
                    <UserBlock users={users}/>
                </Route>
              </Switch>
      </div>
    </Router>
  );
}

export default App;
