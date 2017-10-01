import React from 'react';
import base from '../base'
import { getFunName } from '../helpers';
import '../css/style.css';

class StorePicker extends React.Component {
    constructor() {
        super()
        this.renderTitles = this.renderTitles.bind(this)
        this.state = {
            titles: ''
        }
    }

    renderTitles(key) {
        return (
            <code key={key}>{key}<br/></code>
        )
    }

    componentWillMount() {
        //TODO: Model differently the database
        this.ref = base.fetch('/', {
            context: this,
            then(titles) {
                this.setState({titles})
            }
        })
    }

    goToStore(e)  {
        e.preventDefault();
        const storeId = this.storeInput.value
        this.context.router.transitionTo(`/store/${storeId}`)
    }

    render() {
        return (
            <div>
                <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                    <h2>Please enter a store</h2>
                    <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
                    <button type="submit">Enter -></button>
                </form>
                <br/>
                <form className="store-selector">
                    <h2>Existing store</h2>
                    <p>Just copy one of these names and paste it above!</p>
                    {Object.keys(this.state.titles).map(this.renderTitles)}
                </form>
            </div>
            
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;