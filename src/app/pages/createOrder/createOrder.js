import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './createOrder.styl';
import Modal from './../../components/modal/modal';
import formHelpers from './../../helpers/forms';
import actions from './../../store/actions';

const { createOrder: createOrderAction } = actions;

const { buildFormGroup, validateRules } = formHelpers;

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
      errors: {},
      modal: false,
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onSaveOrder = this.onSaveOrder.bind(this);
  }

  onFormChange(data) {
    this.setState({
      form: Object.assign({}, this.state.form, data),
    });
  }

  onSaveOrder(e) {
    e.preventDefault();
    this.setState({
      errors: {},
    });

    const data = {
      ...this.state.form,
      menuItems: [...this.state.menuItems],
    };

    const errors = {
      number: [
        ...validateRules(['min:1'], Number(data.number)),
      ],
      clientName: [
        ...validateRules(['min:3'], data.clientName),
      ],
      address: [
        ...validateRules(['min:5'], data.address),
      ],
      paymentMethod: [
        ...validateRules(['required'], data.paymentMethod),
      ],
      menuItems: [
        ...validateRules(['required'], data.menuItems),
      ],
    };


    if (Object.keys(errors).some(key => errors[key].length)) {
      this.setState({
        errors,
      });

      return;
    }

    this.props.createOrder(data).then((response) => {
      console.log(response);
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
                    error: this.state.errors.number,
                    onInput: e => this.onFormChange({ number: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Nome do Cliente', {
                    type: 'text',
                    value: this.state.clientName,
                    error: this.state.errors.clientName,
                    onInput: e => this.onFormChange({ clientName: e.target.value }),
                  }) }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  { buildFormGroup('Endereço', {
                    type: 'text',
                    value: this.state.address,
                    error: this.state.errors.address,
                    onInput: e => this.onFormChange({ address: e.target.value }),
                  }) }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  { buildFormGroup('Método de Pagamento', {
                    type: 'select',
                    options: this.props.paymentMethods.data.map(p => (
                      { value: p._id, name: p.name }
                    )),
                    value: this.state.paymentMethod,
                    error: this.state.errors.paymentMethod,
                    onChange: e => this.onFormChange({ paymentMethod: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Troco', {
                    type: 'number',
                    value: this.state.change,
                    error: this.state.errors.change,
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
              {
                this.state.errors.menuItems && this.state.errors.menuItems.length ?
                  <p className="text-danger">Adicione pelo menos 1 item.</p> : null
              }

              <hr />

              <button
                type="submit"
                className="btn btn-block btn-primary mb-2"
                onClick={this.onSaveOrder}
              >
                Salvar
              </button>
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
  paymentMethods: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  createOrder: PropTypes.func.isRequired,
};

const CreateOrderConnector = connect(state => (
  {
    menuCategories: state.menuCategories.menuCategories,
    menuItems: state.menuItems.menuItems,
    paymentMethods: state.paymentMethods.paymentMethods,
  }
), dispatch => (
  {
    createOrder: order => dispatch(createOrderAction(order)),
  }
))(CreateOrder);

export default CreateOrderConnector;
