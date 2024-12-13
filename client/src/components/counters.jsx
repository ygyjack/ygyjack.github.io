import React, { Component } from 'react';
import Counter from './counter';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from './../withRouter';

class Counters extends Component {
  state = {
    counts: []
  };
  handleReset = () => {
    // REMOVE ALL
    // this.setState({counts : []});
    const counts = this.state.counts.map(counter => {
      counter.value = 0;
      return counter;
    });
    this.setState({counts});
  }
  handleAdd = () => {
    let maxId = this.state.counts.length === 0 ? 0 : Math.max(...this.state.counts.map(count => count.id));
    let counts = [...this.state.counts];
    counts.push({ id : ++maxId, value : 0});
    this.setState({counts});
  }
  handleDelete = (counterId) => {
    const counts = this.state.counts.filter(f => (counterId !== f.id));
    this.setState({counts});
  }
  handleDeleteAll = () => {
    this.setState({counts : []});
  }
  handleIncrement = (counter) => {
    const counts = [...this.state.counts];
    const index = counts.indexOf(counter);
    counts[index] = { ...counter };
    counts[index].value++;
    this.setState({counts});
  }
  handleDecrement = (counter) => {
    const counts = [...this.state.counts];
    const index = counts.indexOf(counter);
    counts[index] = { ...counter };
    counts[index].value > 0 && counts[index].value--;
    this.setState({counts});
  }
  render () {
    return (
      <div>
        <div style={{padding:"10px"}}>
          <Button key="reset" onClick={this.handleReset} variant="primary"> <FontAwesomeIcon icon="coffee" rotation={270} /> Reset</Button>
          <Button key="addCounter" onClick={this.handleAdd} variant="success"> <FontAwesomeIcon icon="check-square" /> Add</Button>
          <Button key="deleteAll" onClick={() => this.handleDeleteAll("here")} variant="danger"> <FontAwesomeIcon icon="trash-alt" /> Delete All</Button>
        </div>
        { this.state.counts.map(counter => (
          <div key={counter.id}>
            <Counter
              onDelete={this.handleDelete}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              counter={counter} />
          </div>
          )
        )}
      </div>
    )
  }

}

export default withRouter(Counters);
