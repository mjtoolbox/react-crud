import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      first_name: '',
      last_name: ''
    };
  }
  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(
      `The values are ${this.state.first_name}, ${this.state.last_name}`
    );
    const obj = {
      firstName: this.state.first_name,
      lastName: this.state.last_name
    };

    axios.post('http://localhost:8080/actors', obj).then(res => {
      console.log(res.data);
      this.props.history.push('/index');
    });
    this.setState({
      id: '',
      first_name: '',
      last_name: ''
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Actor</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>First Name: </label>
            <input
              type='text'
              className='form-control'
              value={this.state.first_name}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className='form-group'>
            <label>Last Name: </label>
            <input
              type='text'
              className='form-control'
              value={this.state.last_name}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Add Actor'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
