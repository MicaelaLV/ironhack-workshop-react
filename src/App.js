import React, { Component } from 'react';
import Header from './components/Header/Header';
import UsersList from './components/UsersList/UsersList';
import Spinner from './components/Spinner/Spinner';
import { getUsers } from './helpers/api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      search: "",
      users: [],
      isLoading: false,
    };
  }
  handleSearchInput(event) {
    this.setState({
      search: event.target.value,
    });
  }
  handleClick() {
    this.setState({
      isLoading: true,
    });
    getUsers(this.state.search)
      .then((result) => {
        this.setState({
          users: result.data.items,
          isLoading: false,
        });
      });
  }
  render() {
    return (
      <div>
        <Header title="github search"/>
        <div className="container">
          <div className="row">
            <div className="column column-50 column-offset-25">
              <input onChange={this.handleSearchInput} type="text"/>
              <button onClick={this.handleClick} className="search-button">search</button>
              {this.state.isLoading
                ? <Spinner />
                : <UsersList users={this.state.users} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
