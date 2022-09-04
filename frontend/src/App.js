import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import ToDoUserList from './components/ToDoUser';
import ProjectList from './components/Project';
import ToDoList from './components/ToDo';
import Menu from './components/Menu'
import Footer from './components/Footer';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'todoUsers': [],
      'projects': [],
      'todos': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/todousers/').then(response => {
      const todoUsers = response.data
      this.setState(
        {
          'todoUsers': todoUsers
        }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
      const projects = response.data
      this.setState(
        {
          'projects': projects
        }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
      const todos = response.data
      this.setState(
        {
          'todos': todos
        }
      )
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <Router>
        <div>
          <Menu />
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
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
