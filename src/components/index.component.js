import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: []
    };
  }

  // Another way of refreshing page, but make sure to check the state change
  componentDidUpdate(prevProps, prevState) {
    axios
      .get('http://localhost:8080/actors')
      .then(response => {
        const { actors } = this.state;
        if (actors !== prevState.actors) {
          this.setState({ actors: response.data });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/actors')
      .then(response => {
        this.setState({ actors: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.actors.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align='center'>Actor List</h3>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
