import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import DAppItem from './DAppItem';

class DAppItems extends React.Component {
  render() {
    const item = this.props.items;
    // console.log(item);
    return (
      <div>
        <Row>
          {item.map((dapp, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <DAppItem item={dapp} key={index} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default DAppItems;
