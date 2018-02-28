import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
	handleChange(e, key) {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name] : e.target.value 
		}
		this.props.updateFish(key, updatedFish);	
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];
		return(
			<div className="fish-edit" key={key}>
				<input onChange={(e)=>this.handleChange(e, key)} name="name" value={fish.name} type="text" placeholder="Fish Name"/>
				<input onChange={(e)=>this.handleChange(e, key)} name="price" value={fish.price} type="text" placeholder="Fish Price"/>
				<select onChange={(e)=>this.handleChange(e, key)} name="status" value={fish.status} >
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea onChange={(e)=>this.handleChange(e, key)} name="desc" value={fish.desc}  placeholder="Fish Description"></textarea>
				<input onChange={(e)=>this.handleChange(e, key)} name="image" value={fish.image} type="text" placeholder="Fish Image"/>
				<button onClick={() => this.props.removeFish(key)}>Delete Fish</button>
			</div>
		)
	}

	render() {
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory.bind(this))}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	fishes: React.PropTypes.object.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired
}

export default Inventory; 