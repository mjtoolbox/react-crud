import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete('http://localhost:8080/actors/' + this.props.obj.actorId)
      .then(res => console.log('deleted'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.actorId}</td>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>
          <Link
            to={'/edit/' + this.props.obj.actorId}
            className='btn btn-primary'
          >
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
