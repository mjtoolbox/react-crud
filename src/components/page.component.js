import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

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

  render() {
    return (
      <MaterialTable
        title='Editable Example'
        columns={this.state.columns}
        data={this.state.actors}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.actors];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, actors });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, actors });
              }, 600);
            })
        }}
      />
    );
  }
}
