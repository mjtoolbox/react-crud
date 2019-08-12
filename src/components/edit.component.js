import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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
  componentDidMount() {
    axios
      .get('http://localhost:8080/actors/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data.actorId,
          first_name: response.data.firstName,
          last_name: response.data.lastName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const obj = {
      firstName: this.state.first_name,
      lastName: this.state.last_name
    };
    axios
      .put('http://localhost:8080/actors/' + this.state.id, obj)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/index');
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align='center'>Update Actor</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>ID</label>
            <input
              readOnly
              type='text'
              className='form-control'
              value={this.state.id}
            />
          </div>
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
              value='Update Actor'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
