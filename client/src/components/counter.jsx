import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Counter extends Component {
  // handleIncrement = () => {
  //   this.setState({ value: this.state.value + 1 });
  // }
  // handleDecrement = () => {
  //   this.state.value > 0 && this.setState({ value: this.state.value - 1 });
  // }

  render () {
    //console.warn(this.props.counter);
    return (
      <div>
        <h4>Number #{this.props.counter.id}</h4>
        <ButtonToolbar>
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={() => this.props.onIncrement(this.props.counter)} variant="secondary"> <FontAwesomeIcon icon="plus-square" /> Increment</Button>
            <Button onClick={() => this.props.onDecrement(this.props.counter)} variant="secondary"> <FontAwesomeIcon icon="minus-square" /> Decrement</Button>
          </ButtonGroup>
          <Button onClick={() => this.props.onDelete(this.props.counter.id)} variant="outline-danger"> <FontAwesomeIcon icon="trash-alt" /> Delete</Button>
        </ButtonToolbar>
      </div>
    )
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return classes += this.props.counter.value === 0 ? "warning" : "primary";
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;
