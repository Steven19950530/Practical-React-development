import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory  extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Samples fishes</button>
            </div>
            
        )
    }
    
}

export default Inventory;