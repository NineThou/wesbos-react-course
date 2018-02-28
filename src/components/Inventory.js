import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
	constructor() {
		super()
		
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			uid: null,
			owner: null
		}
	}

	componentDidMount() {
		base.onAuth((user) => {
			if(user) {
				this.authHandler(null, { user });
			}
		})
	}

	handleChange(e, key) {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name] : e.target.value 
		}
		this.props.updateFish(key, updatedFish);	
	}
	
	authenticate(provider) {
		console.log(`log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}
	
	logout() {
		base.unauth();
		this.setState({ uid: null });
	}

	authHandler(err, authData) {
		if(err) {
			console.error(err);
			return;
		}
		//grab the store info
		const storeRef = base.database().ref(this.props.storeId);

		//query the firebase once for the store data
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			//claim it as our own if there is no owner already
			if(!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				})
			}
			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			}); 
		});
	}

	renderLogin() {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage store inventory</p>
				<button className="github" onClick={() => this.authenticate('github')} >Log in with github</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with facebook</button>
			</nav>
		)
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
		const logout = <button onClick={this.logout}>Log Out!</button>
		//check if they are no logged in
		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		//check if they are the owner of the store
		if(this.state.uid !== this.state.owner) {
			return(
				<div>
					<p>Sorry you aren not the owner</p>
					{logout}
				</div>
			)
		}
		return (
			<div>
				<h2>Inventory</h2>
				{logout}
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
	addFish: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}

export default Inventory; 