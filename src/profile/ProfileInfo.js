import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import RatingBar from './RatingBar';
import Stats from './Stats';
import PropTypes from 'prop-types';

class ProfileInfo extends React.Component {


  getHeader() {
    return (
      <Row className="justify-content-center">
        <Col xs="12" className="text-center align-middle info-screen-title title-text">
          @{this.props.name}
        </Col>
      </Row>
    );
  }

  getHeaderSeparator() {
    return (
      <Row className="justify-content-center">
        <Col md="12" lg="12" xl="12" className="separate-block">
          <div className="separate-line d-none d-md-block"></div>
        </Col>
        <Col md="12" lg="12" xl="12" className="d-none accept-request-title-block">
          <div className="accept-request-title-text">accepting requests</div>
        </Col>
        <Col md="12" lg="12" xl="12" className="d-none no-accept-request-title-block">
          <div className="no-accept-request-title-text">not Accepting requests</div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Col xs="12" md="auto" sm="12" className="item-screen info-screen request-sent contract-block">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="12">
              {this.getHeader()}
              {this.getHeaderSeparator()}
              <RatingBar rating={2}/>
              <Stats
                traderRating={20}
                investorRating={100}
                roi={16}
                moneyInManagement={20000}
              />
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }
}

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired
};


export default ProfileInfo;
