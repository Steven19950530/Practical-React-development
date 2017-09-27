import React from 'react';
import { getFunName } from '../helpers';
import '../css/style.css';

class StorePicker extends React.Component {
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this)
    // }
    goToStore(e)  {
        e.preventDefault();
    }

    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please enter a store</h2>

                <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
                <button type="submit">Enter -></button>
            </form>
        )
    }
}

export default StorePicker;