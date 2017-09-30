import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory  extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.renderInventory = this.renderInventory.bind(this)
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key]
        const updatedFish = {...fish, [e.target.name]: e.target.value}
        this.props.updateFish(key, updatedFish)
    }

    renderInventory(key) {
        const fish = this.props.fishes[key]
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" defaultValue={fish.name} placeholder="Fish name" 
                    onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="price" defaultValue={fish.price} placeholder="Fish price" 
                    onChange={(e) => this.handleChange(e, key)} />
                <select type="text" name="status" defaultValue={fish.status} placeholder="Fish status" 
                    onChange={(e) => this.handleChange(e, key)} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" defaultValue={fish.desc} placeholder="Fish desc" 
                    onChange={(e) => this.handleChange(e, key)} ></textarea>
                <input type="text" name="image" defaultValue={fish.image} placeholder="Fish image" 
                    onChange={(e) => this.handleChange(e, key)} />
                <button onClick={() => this.props.deleteFish(key)} >Remove Fish</button>
            </div>
        )
    }
    

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Samples fishes</button>
            </div>
            
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    addFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    deleteFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;