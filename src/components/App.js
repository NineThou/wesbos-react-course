import React from 'react';
import Order from './Order';
import Inventory from './Inventory';
import Header from './Header';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		//getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}

	//firebase
	componentWillMount() {
		//firebase
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
		//localStorage
		localStorage.getItem(`order-${this.props.params.storeId}`) && this.setState({
			order: JSON.parse(localStorage.getItem(`order-${this.props.params.storeId}`)),
		})
	}
	//remove binding with firebase
	componentWillUnmount() {
		base.removeBinding(this.ref);
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

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes}
		fishes[key] = null;
		this.setState({
			fishes
		});
	}

	removeFromOrder(key) {
		const order = {...this.state.order}
		delete order[key];
		this.setState({
			order
		});
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}
	
	loadSamples() {
		this.setState({
			fishes: sampleFishes,
		});
	}

	addToOrder(key) {
		//take a copy of state
		const order = {...this.state.order};
		//update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		//update our state
		this.setState({ order });
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
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					addFish={this.addFish} 
					loadSamples={this.loadSamples}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
				/>
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;