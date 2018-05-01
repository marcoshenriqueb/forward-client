import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './dashboard.styl';
import actions from './../../store/actions';

const { logout: logoutAction, fetchOrders: fetchOrdersAction } = actions;

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div className="dashboard-container d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="d-flex">
            {
              this.props.businessAreas.data.map(a => (
                <button
                  className="btn btn-outline-primary btn-lg mr-1"
                  key={a.name}
                >
                  {a.name}
                </button>
              ))
            }
            <Link to="/novo-pedido">
              <button className="btn btn-outline-success btn-lg">Novo pedido</button>
            </Link>
          </div>
          <span onClick={this.props.logout}>Sair</span>
        </div>
        <div className="d-flex flex-column p-3">
          <p className="lead">Pedidos</p>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  businessAreas: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
};

const DashboardConnector = connect(state => (
  {
    businessAreas: state.businessAreas.businessAreas,
  }
), dispatch => (
  {
    logout: () => dispatch(logoutAction()),
    fetchOrders: () => dispatch(fetchOrdersAction()),
  }
))(Dashboard);

export default DashboardConnector;
