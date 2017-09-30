import React from 'react';


class AddFishForm extends React.Component {
    createFish(e) {
        e.preventDefault()
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value,
        }
        this.props.addFish(fish)
        this.fishForm.reset()
    }
    render() {
        return (
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Fish name"/>        
                <input ref={(input) => this.price = input} type="text" placeholder="Fish price"/>
                <select ref={(input) => this.status = input} name="" id="">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea ref={(input) => this.desc = input} placeholder="Fish desc"></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="Fish image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm;