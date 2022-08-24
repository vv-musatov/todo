import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import ToDoUserList from './components/ToDoUser';
import Menu from './components/Menu'
import Footer from './components/Footer';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'todoUsers': []
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
  }

  render() {
    return (
      <div>
        <Menu />
        <ToDoUserList todoUsers={this.state.todoUsers} />
        <Footer />
      </div>
    )
  }
}

export default App;
