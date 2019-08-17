import React, { Component } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import axios from 'axios';

const apiurl = 'http://localhost:8080/actors';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: []
    };
  }

  // Another way of refreshing page, but make sure to check the state change
  componentDidUpdate(prevProps, prevState) {
    axios
      .get(apiurl)
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
      .get(apiurl)
      .then(response => {
        this.setState({ actors: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'actorId',
        width: 100
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        width: 200
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 200
      },
      {
        Header: 'Last Updated',
        accessor: 'lastUpdated',
        width: 300
      }
      // ,
      // {
      //   Header: '',
      //   Cell: row => (
      //     <div>
      //       <button className='btn btn-primary'>Edit</button>{' '}
      //       <button className='btn btn-danger'>Delete</button>
      //     </div>
      //   )
      // }
    ];

    return (
      <ReactTable
        data={this.state.actors}
        columns={columns}
        className='-striped -highlight'
        defaultPageSize={10}
      />
    );
  }
}
