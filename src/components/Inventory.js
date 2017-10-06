import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);

    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = { ...fish, [e.target.name]: e.target.value };
    this.props.updateFish(key, updatedFish);
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log in with Github
        </button>
      </nav>
    );
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          defaultValue={fish.name}
          placeholder="Fish name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          defaultValue={fish.price}
          placeholder="Fish price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          defaultValue={fish.status}
          placeholder="Fish status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          defaultValue={fish.desc}
          placeholder="Fish desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          defaultValue={fish.image}
          placeholder="Fish image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
      </div>
    );
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({
      uid: null
    });
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }
    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', snapshot => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>;
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>
            Sorry, you aren't the owner of this store!
            {logout}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(this.renderInventory)}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSamples}>Load Samples fishes</button>
        </div>
      );
    }
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  storeId: React.PropTypes.string.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  deleteFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
