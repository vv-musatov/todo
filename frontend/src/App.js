import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom"
import ToDoUserList from './components/ToDoUser';
import ProjectList from './components/Project';
import ToDoList from './components/ToDo';
import Footer from './components/Footer';
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу: {location.pathname} не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'todoUsers': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data)
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data)
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/todousers/', { headers })
      .then(response => {
        this.setState({ todoUsers: response.data })
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(response => {
        this.setState({ projects: response.data })
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })

    axios.get('http://127.0.0.1:8000/api/todos/', { headers })
      .then(response => {
        this.setState({ todos: response.data })
      }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <Router>
        <div>
          <nav class="menu">
            <ul>
              <li><Link to='/'>Пользователи</Link></li>
              <li><Link to='/projects'>Проекты</Link></li>
              <li><Link to='/todos'>Заметки</Link></li>
              <li>
                {this.is_authenticated() ?
                  <li onClick={() => this.logout()}>Выйти</li> :
                  <Link to='/login'>Войти</Link>
                }
              </li>

            </ul>
          </nav>
          <Routes>
            <Route path='/' element={
              <ToDoUserList todoUsers={this.state.todoUsers} />
            } />
            <Route path='/projects' element={
              <ProjectList projects={this.state.projects} />
            } />
            <Route path='/todos' element={
              <ToDoList todos={this.state.todos} />
            } />
            <Route path='/login' element={
              <LoginForm get_token={(username, password) => this.get_token(username, password)} />
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
