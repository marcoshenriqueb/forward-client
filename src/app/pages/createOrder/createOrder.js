import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './createOrder.styl';
import Modal from './../../components/modal/modal';
import formHelpers from './../../helpers/forms';

const { buildFormGroup } = formHelpers;

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        number: '',
        clientName: '',
        address: '',
        paymentMethod: '',
        change: '',
      },
      menuItems: [],
      error: '',
      modal: false,
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(data) {
    this.setState({
      form: Object.assign({}, this.state.form, data),
    });
  }

  getCategoryItems(categoryId) {
    return this.props.menuItems.data.filter(i => i.menuCategory === categoryId);
  }

  countMenuItems(itemId) {
    let count = 0;
    this.state.menuItems.forEach((i) => {
      if (i.menuItem === itemId) {
        count += 1;
      }
    });

    return count;
  }

  addMenuItem(itemId) {
    const menuItems = [...this.state.menuItems];

    menuItems.push({
      menuItem: itemId,
    });

    this.setState({
      menuItems,
    });
  }

  removeMenuItem(itemId) {
    const menuItems = [...this.state.menuItems];

    menuItems.some((i, k) => {
      if (i.menuItem === itemId) {
        menuItems.splice(k, 1);
        return true;
      }

      return false;
    });

    this.setState({
      menuItems,
    });
  }

  render() {
    return (
      <div className="d-flex flex-column p-4">
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-primary text-capitalize font-weight-bold">Novo Pedido</h2>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="login-form">
              <div className="row">
                <div className="col-sm-6">
                  { buildFormGroup('Número', {
                    type: 'number',
                    value: this.state.number,
                    onInput: e => this.onFormChange({ number: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Nome do Cliente', {
                    type: 'text',
                    value: this.state.clientName,
                    onInput: e => this.onFormChange({ clientName: e.target.value }),
                  }) }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  { buildFormGroup('Endereço', {
                    type: 'text',
                    value: this.state.address,
                    onInput: e => this.onFormChange({ address: e.target.value }),
                  }) }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  { buildFormGroup('Método de Pagamento', {
                    type: 'text',
                    value: this.state.paymentMethod,
                    onInput: e => this.onFormChange({ paymentMethod: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Troco', {
                    type: 'number',
                    value: this.state.change,
                    onInput: e => this.onFormChange({ change: e.target.value }),
                  }) }
                </div>
              </div>

              <hr />

              <ul>
                {this.state.menuItems.map((i, k) => (
                  <li key={`_${k + 1}`}>{i.menuItem}</li>
                ))}
              </ul>

              <button
                className="btn btn-outline-secondary btn-block"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ modal: true });
                }}
              >
                Adicionar Itens
              </button>

              <hr />

              <button
                type="submit"
                className="btn btn-block btn-primary mb-2"
                onClick={this.onLogin}
              >
                Salvar
              </button>
              {
                this.state.error ?
                  <div className="alert alert-danger">
                    {this.state.error}
                  </div> : null
              }
            </form>
          </div>
        </div>
        <Modal
          title="Adicionar Itens"
          show={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          <div className="w-100">
            {
              this.props.menuCategories.data.map(c => (
                <div className="w-100" key={c.name}>
                  <p className="text-secondary mb-1">{c.name}</p>
                  <ul className="list-group mb-4">
                    {
                      this.getCategoryItems(c._id).map(i => (
                        <div className="w-100 d-flex mb-1" key={i.name}>
                          <li
                            className="
                              list-group-item
                              d-flex justify-content-between
                              align-items-center
                              flex-grow-1
                            "
                          >
                            {i.name}
                            <span className="badge badge-primary badge-pill">
                              {this.countMenuItems(i._id)}
                            </span>
                          </li>
                          <button
                            className="btn btn-outline-primary mx-1"
                            onClick={() => this.addMenuItem(i._id)}
                          >
                            Adicionar
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => this.removeMenuItem(i._id)}
                          >
                            Remover
                          </button>
                        </div>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
            <button
              className="btn btn-block btn-primary"
              onClick={() => this.setState({ modal: false })}
            >
              Fechar
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

CreateOrder.propTypes = {
  menuCategories: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  menuItems: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
};

const CreateOrderConnector = connect(state => (
  {
    menuCategories: state.menuCategories.menuCategories,
    menuItems: state.menuItems.menuItems,
  }
), () => (
  {

  }
))(CreateOrder);

export default CreateOrderConnector;
