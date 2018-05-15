import React from 'react';
import Header from './Header';
import Order from "./Order";
import Fish from "./Fish";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }



  addFish = (fish) => {
    // take a copy of existing state
    const fishes = { ...this.state.fishes };
    // add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({
      fishes: fishes
    })
  }

  updateFish = (key, updatedFish) => {
    // take a copy of current state
    const fishes = {...this.state.fishes};
    // update that state
    fishes[key] = updatedFish;
    // set that to state
    this.setState({ fishes: fishes });
  }


  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // either add to order or update # in order
    order[key] = order[key] + 1 || 1;
    // call setState to update state object
    this.setState({
      order: order
    })
  }

  render() {

    return (

      <div className='catch-of-the-day'>
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>

    )

  }

}

export default App;