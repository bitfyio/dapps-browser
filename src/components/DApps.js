import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import DAppItems from './DAppItems';
import { TrustClient } from '../network/TrustClient';
import getWeb3 from '../utils/provider';
// import DAppItem from './DAppItem';

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
    console.log(event.target.value);
  }

  render() {
    const elements = this.state.data || [];
    // const item = this.props.item;
    // const items = this.props.items;
    // console.log(item);
    // console.log(items);
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
        <Footer configuration={{ show: (elements.length !== 0) }} />
      </div>
    );
  }
}

export default DApps;
