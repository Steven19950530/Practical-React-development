import React from 'react';

import { getFunName } from '../helpers';
import '../css/style.css';

class StorePicker extends React.Component {

    goToStore(e)  {
        e.preventDefault();
        const storeId = this.storeInput.value
        this.context.router.transitionTo(`/store/${storeId}`)
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

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;