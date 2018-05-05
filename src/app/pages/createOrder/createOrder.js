import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      savingForm: false,
      obsFormItem: '',
      obsFormValue: '',
      fastItemInputCode: '',
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onSaveOrder = this.onSaveOrder.bind(this);
    this.onObsFormClick = this.onObsFormClick.bind(this);
  }

  onFormChange(data) {
    this.setState({
      form: Object.assign({}, this.state.form, data),
    });
  }

  onObsFormClick(e) {
    e.preventDefault();

    this.setState({
      menuItems: this.state.menuItems.map((i, k) => {
        if (k === this.state.obsFormItem) {
          return {
            ...i,
            notes: this.state.obsFormValue,
          };
        }

        return i;
      }),
      obsFormValue: '',
      obsFormItem: '',
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
      step: 1,
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
        ...validateRules(['min:1'], data.menuItems),
      ],
    };


    if (Object.keys(errors).some(key => errors[key].length)) {
      this.setState({
        errors,
      });

      return;
    }

    this.setState({
      savingForm: true,
    });
    this.props.createOrder(data).then(() => {
      this.setState({
        form: {
          number: '',
          clientName: '',
          address: '',
          paymentMethod: '',
          change: '',
        },
        menuItems: [],
        savingForm: false,
      });
    });
  }

  getCategoryItems(categoryId) {
    return this.props.menuItems.data.filter(i => i.menuCategory === categoryId);
  }

  getMenuItemName(menuItemId) {
    return this.props.menuItems.data.filter(i => i._id === menuItemId)[0].name || '';
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

  addItemByCode(code) {
    this.setState({
      errors: Object.assign({}, this.state.errors, {
        menuItems: [],
      }),
    });

    const menuItems = [...this.state.menuItems];

    const filteredItens = this.props.menuItems.data
      .filter(i => i.number === Number(code));

    if (filteredItens.length) {
      menuItems.push({
        menuItem: filteredItens[0]._id,
      });
      this.setState({
        menuItems,
        fastItemInputCode: '',
      });
    } else {
      this.setState({
        errors: Object.assign({}, this.state.errors, {
          menuItems: [
            'Código inexistente.',
          ],
        }),
      });
    }
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

  removeMenuItemByIndex(index) {
    const menuItems = [...this.state.menuItems];

    menuItems.some((i, k) => {
      if (k === index) {
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
        <div className="position-absolute">
          <Link className="lead" to="/">Voltar</Link>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="text-capitalize font-weight-bold">Novo Pedido</h2>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="login-form">
              <div className="row">
                <div className="col-sm-6">
                  { buildFormGroup('Número', {
                    type: 'number',
                    value: this.state.form.number,
                    error: this.state.errors.number,
                    onInput: e => this.onFormChange({ number: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Nome do Cliente', {
                    type: 'text',
                    value: this.state.form.clientName,
                    error: this.state.errors.clientName,
                    onInput: e => this.onFormChange({ clientName: e.target.value }),
                  }) }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  { buildFormGroup('Endereço', {
                    type: 'text',
                    value: this.state.form.address,
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
                    value: this.state.form.paymentMethod,
                    error: this.state.errors.paymentMethod,
                    onChange: e => this.onFormChange({ paymentMethod: e.target.value }),
                  }) }
                </div>
                <div className="col-sm-6">
                  { buildFormGroup('Troco', {
                    type: 'number',
                    value: this.state.form.change,
                    error: this.state.errors.change,
                    onInput: e => this.onFormChange({ change: e.target.value }),
                  }) }
                </div>
              </div>

              <hr />

              <p className="text-secondary">Pedido</p>
              <ul className="mb-3">
                {this.state.menuItems.map((i, k) => (
                  <li
                    className="d-flex flex-column mb-2"
                    key={`_${k + 1}`}
                  >
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      {this.getMenuItemName(i.menuItem)}
                      <div className="d-flex">
                        <button
                          className="btn btn-outline-primary btn-sm mr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ obsFormItem: k, obsFormValue: i.notes ? i.notes : '' });
                          }}
                        >
                          OBS
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            this.removeMenuItemByIndex(k);
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                    {
                      this.state.obsFormItem === k ?
                        <div className="input-group mt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Observação"
                            value={this.state.obsFormValue}
                            onChange={e => this.setState({ obsFormValue: e.target.value })}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-primary"
                              onClick={this.onObsFormClick}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({ obsFormItem: '', obsFormValue: '' });
                              }}
                            >
                              x
                            </button>
                          </div>
                        </div> :
                        <small className="pl-2">{i.notes}</small>
                    }
                  </li>
                ))}
              </ul>

              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-outline-primary btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        errors: Object.assign({}, this.state.errors, {
                          menuItems: [],
                        }),
                        modal: true,
                      });
                    }}
                  >
                    Lista de Itens
                  </button>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Código"
                    value={this.state.fastItemInputCode}
                    onInput={e => this.setState({ fastItemInputCode: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.keyCode !== 13) return;
                      this.addItemByCode(e.target.value);
                    }}
                  />
                </div>
              </div>
              {
                this.state.errors.menuItems && this.state.errors.menuItems.length ?
                  <small className="text-danger">{this.state.errors.menuItems[0]}</small> : null
              }

              <hr />

              <button
                type="submit"
                className="btn btn-block btn-primary mb-2"
                onClick={this.onSaveOrder}
                disabled={this.state.savingForm}
              >
                Salvar
              </button>
            </div>
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
