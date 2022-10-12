import React from 'react';
import axios from 'axios';
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
import ProjectForm from './components/ProjectForm';


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

  // create_project(name, repository, users) {
  create_project(props) {
    const headers = this.get_headers()
    props.users = [props.users,]
    axios.post('http://127.0.0.1:8000/api/projects/', { ...props }, { headers }).then(
      response => {
        this.setState({ projects: [...this.state.projects, response.data] })
      }
    ).catch(error => console.log(error))
    // const data = { name: name, repository: repository, users: users }
    // axios.post('http://127.0.0.1:8000/api/projects/', data, { headers }).then(
    //   response => {
    //     // this.load_data()
    //     let new_project = response.data
    //     const users = this.state.todoUsers.filter((item) => item.id === new_project.users)
    //     new_project.users = users
    //     this.setState({ projects: [...this.state.projects, new_project] })
    //   }
    // ).catch(error => console.log(error))
  }

  delete_project(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers }).then(
      response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }
    ).catch(error => console.log(error))
  }

  delete_todo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers }).then(
      response => {
        this.setState({ todos: this.state.todos.filter((item) => item.id !== id) })
      }
    ).catch(error => console.log(error))
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
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
        <div className='App'>
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
              <ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)} />
            } />
            {/* <Route path='/projects/create' element={
              <ProjectForm todoUsers={this.state.todoUsers} create_project={(name, repository, users) => this.create_project(name, repository, users)} />
            } /> */}
            <Route path='/projects/create' element={
              <ProjectForm users={this.state.todoUsers} create_project={(props) => this.create_project(props)} />
            } />
            <Route path='/todos' element={
              <ToDoList todos={this.state.todos} delete_todo={(id) => this.delete_todo(id)} />
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
