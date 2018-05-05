import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Timer from './../../components/timer/timer';
import './orders.styl';

class Orders extends Component {
  getAreaStep() {
    const result = this.props.businessAreas.data.filter(a => (
      a._id === this.props.match.params.area
    ));

    return result.length ? result[0] : {};
  }

  render() {
    return (
      <div
        className="orders-container d-flex align-items-center justify-content-center"
      >
        <div className="cards-deck deck-container d-flex flex p-3">
          {
            this.props.orders.data
            .filter(o => this.getAreaStep().step === o.step)
            .map((o, k) => (
              <div className="card deck-card mx-2" key={`${k + 1}`}>
                <div className="card-body">
                  <Timer date={o.createdAt} />
                  <p className="card-text">
                    This is a longer card with supporting text below as a natural
                     lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  orders: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      menuItems: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired).isRequired,
  }).isRequired,
  businessAreas: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ area: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

const OrdersConnector = connect(state => (
  {
    orders: state.orders.orders,
    businessAreas: state.businessAreas.businessAreas,
  }
), () => (
  {
  }
))(Orders);

export default OrdersConnector;