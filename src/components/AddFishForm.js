import React from 'react';

class AddFishForm extends React.Component {
	createFish(event) {
		event.preventDefault();
		const fish = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value
		}
		this.props.addFish(fish);
		this.fishForm.reset();
	}

	render() {
		return (
			<form ref={inp => this.fishForm = inp} className="fish-edit" onSubmit={this.createFish.bind(this)}>
				<input ref={input => this.name = input} type="text" placeholder="Fish Name"/>
				<input ref={input => this.price = input} type="text" placeholder="Fish Price"/>
				<select ref={input => this.status = input}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea ref={input => this.desc = input}  placeholder="Fish Description"></textarea>
				<input ref={input => this.image = input} type="text" placeholder="Fish Image"/>
				<button type="submit">+Add Fish</button>
			</form>
		)
	}
}

export default AddFishForm; 