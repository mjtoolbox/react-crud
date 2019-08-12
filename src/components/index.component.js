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
  componentDidUpdate() {
    axios
      .get('http://localhost:8080/actors')
      .then(response => {
        this.setState({ actors: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    fetch('http://localhost:8080/actors')
      .then(response => response.json())
      .then(mydata => {
        // schedules an update to a component's state object, when the statechanges, re-render
        this.setState({ actors: mydata });
      })
      .catch(console.log);
    // axios
    //   .get('http://localhost:8080/actors')
    //   .then(response => {
    //     this.setState({ actors: response.data });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
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
