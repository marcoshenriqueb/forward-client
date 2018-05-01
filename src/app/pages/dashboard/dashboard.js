import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './dashboard.styl';

const Dashboard = ({
  businessAreas,
}) => (
  <div className="dashboard-container d-flex flex-column align-items-center justify-content-center">
    {
      businessAreas.data.map(a => (
        <button className="btn btn-outline-primary btn-lg mb-3" key={a.name}>{a.name}</button>
      ))
    }
    <Link to="/novo-pedido">
      <button className="btn btn-outline-success btn-lg mb-3">Novo pedido</button>
    </Link>
  </div>
);

Dashboard.propTypes = {
  businessAreas: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
};

const DashboardConnector = connect(state => (
  {
    businessAreas: state.businessAreas.businessAreas,
  }
))(Dashboard);

export default DashboardConnector;
