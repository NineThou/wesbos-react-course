import React from 'react';
import Order from './Order';
import Inventory from './Inventory';
import Header from './Header';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);

		//getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish){
		//creating new fishes object
		const fishes = {...this.state.fishes};
		//creating timestamp for key
		const timestamp = Date.now();
		//add in our new fish
		fishes[`fish-${timestamp}`] = fish;
		//set state
		this.setState({ fishes });
	}
	
	loadSamples() {
		this.setState({
			fishes: sampleFishes,
		});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{/* Creating a array of keys to iterate throw the object*/}
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} details={this.state.fishes[key]}/>)
						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}

export default App;