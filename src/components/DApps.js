import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import DAppItems from './DAppItems';
import DAppTopCards from './DAppTopCards';
import { TrustClient } from '../network/TrustClient';
import getWeb3 from '../utils/provider';

function Footer() {
  return (
    <div>
      <hr />
      <div className="footer">
        <center>
          We do not control or endorse the Dapps listed,
          simply provide them as a list of convenience for you.
          Please investigate and proceed at your own risk.
        </center>
        <br />
        <center>
          <Link className="contact-us-link" to="/contact-us">
            Contact Us
          </Link>
        </center>
      </div>
    </div>
  );
}

class DApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: '',
    };
    this.trustClient = new TrustClient();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    const network = parseInt(getWeb3().version.network, 10);
    this.trustClient.fetchBootstrap(network).then((response) => {
      this.setState({
        data: response.data.docs,
      });
    });
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
    // console.log(event.target.value);
  }

  render() {
    const elements = this.state.data || [];
    // console.log(elements.results.name);
    const { query } = this.state;
    const categoryID = '5abcceb4682db901241a0636';
    const newDApp = elements.filter(item => item.category._id === categoryID);
    // const othersDApp = elements.filter(item => item.category._id !== categoryID);
    const searchDapp = elements.filter(item =>
      item.category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return (
      <div>
        <div className="SearchBar">
          <form>
            <input
              placeholder="Search for dapp"
              query={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
        <div className="CardSlider">
          {newDApp.map(element => (
            <div key={element.category._id}>
              <Link to={`category/${element.category._id}`}>
                <h2 className="categories">{element.category.name}</h2>
              </Link>
              <DAppTopCards key={element} items={element.results} />
            </div>
          ))}
        </div>
        <div className="DApps">
          {searchDapp.map(element => (
            <div key={element.category._id}>
              <Link to={`category/${element.category._id}`}>
                <h2 className="categories">{element.category.name}</h2>
              </Link>
              <DAppItems key={element} items={element.results} />
            </div>
          ))}
        </div>
        <Footer configuration={{ show: (elements.length !== 0) }} />
      </div>
    );
  }
}

export default DApps;
