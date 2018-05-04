import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './orders.styl';
import actions from './../../store/actions';

const {
  fetchOrders: fetchOrdersAction,
} = actions;

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div className="orders-container d-flex flex align-items-center justify-content-center">
        <div className="cards-deck">
          {
            this.props.orders.data.map(o => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{o.name}</h5>
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
  orders: PropTypes.shape([]).isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

const OrdersConnector = connect(state => (
  {
    orders: state.orders.orders,
  }
), dispatch => (
  {
    fetchOrders: () => (
      dispatch(fetchOrdersAction())
    ),
  }
))(Orders);

export default OrdersConnector;
