import React from 'react';
import Header from './Header';
import Order from "./Order";
import Inventory from "./Inventory";


class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

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


  render() {

    return (

      <div className='catch-of-the-day'>
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Inventory addFish={this.addFish} />
        <Order />
      </div>

    )

  }

}

export default App;