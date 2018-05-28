import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import DAppItems from './DAppItems';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    // this.trustClient = new TrustClient();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: event.target.value,
    });
    console.log(event.target.value);
  }

  render() {
    const elements = this.state.data || [];
    const items = this.props.item;
    console.log(items);
    const { query } = this.state;
    const filteredDapp = elements.filter(dapp => dapp.category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return (
      <div>
        <div className="searchBar">
          <form>
            <input
              placeholder="Search for dapp"
              query={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
        <div className="DApps">
          {filteredDapp.map(element => (
            <div key={element.category._id}>
              <Link to={`category/${element.category._id}`}>
                <h2 className="categories">{element.category.name}</h2>
              </Link>
              <DAppItems key={element} items={element.results} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
