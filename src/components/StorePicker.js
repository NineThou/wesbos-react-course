import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
	goToStore(e) {
		e.preventDefault();
		//grab the text from the box
		//this.storeInput.value;
		//transition to /store/:storeId
		this.context.router.transitionTo(`/store/${this.storeInput.value}`)
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" 
				default value={getFunName()} ref={inp => this.storeInput = inp}/>
				<button type="submit">Visit Store</button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;