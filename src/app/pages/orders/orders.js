import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Timer from './../../components/timer/timer';
import './orders.styl';

class Orders extends Component {
  getMenuItem(id) {
    const result = this.props.menuItems.data.filter(i => i._id === id);

    return result.length ? result[0] : {};
  }

  getAreaStep() {
    const result = this.props.businessAreas.data.filter(a => (
      a._id === this.props.match.params.area
    ));

    return result.length ? result[0] : {};
  }

  render() {
    return (
      <div
        className="orders-container w-100 d-flex align-items-center"
      >
        <div className="cards-deck deck-container d-flex flex p-3">
          {
            this.props.orders.data
            .filter(o => this.getAreaStep().step === o.step)
            .map((o, k) => (
              <div className="card deck-card mx-2" key={`${k + 1}`}>
                <div className="card-header card-header-padding">
                  <h2 className="card-title card-header-title text-center">
                    #{`${o.number} - ${o.clientName}`}
                  </h2>
                  <Timer date={o.counterTimeStart} />
                </div>
                <ul className="cards-body list-group card-menu-items" id="custom-scroll">
                  {
                    this.props.menuCategories.data.map((c, m) => {
                      if (!o.menuItems.map(i => this.getMenuItem(i.menuItem).menuCategory)
                          .includes(c._id)) return null;

                      return (
                        <div key={m.toString()}>
                          <li className="pl-3 pb-2 text-secondary">{c.name}:</li>
                          <ul className="list-group py-1">
                            {
                              o.menuItems.map((i, n) => {
                                const item = this.getMenuItem(i.menuItem);
                                if (item.menuCategory !== c._id) return null;

                                return (
                                  <li className="pl-5 pb-3" key={n.toString()}>
                                    <p className="mb-0 lead font-weight-bold">
                                      {item.name}
                                    </p>
                                    {
                                      i.notes ?
                                        <small className="pl-3 font-weight-bold">
                                          {i.notes}
                                        </small> : null
                                    }
                                  </li>
                                );
                              })
                            }
                          </ul>
                        </div>
                      );
                    })
                  }
                </ul>
                <iframe
                  title="map"
                  frameBorder="0"
                  src={'https://www.google.com/maps/embed/v1/place' +
                  '?key=AIzaSyBgHOp2wZTsCyPWQy1HyrnRFwYKGgQCRVU' +
                  `&q=${encodeURIComponent(o.address)}`}
                />
                <div className="card-footer text-center px-0">
                  <button className="btn btn-outline-primary btn-block btn-md mr-1">
                    Finalizado
                  </button>
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
  menuCategories: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  menuItems: PropTypes.shape({
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
    menuCategories: state.menuCategories.menuCategories,
    menuItems: state.menuItems.menuItems,
  }
), () => (
  {
  }
))(Orders);

export default OrdersConnector;
