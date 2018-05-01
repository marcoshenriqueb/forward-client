import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './createOrder.styl';
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
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(data) {
    this.setState({
      form: Object.assign({}, this.state.form, data),
    });
  }

  render() {
    return (
      <div className="d-flex flex-column p-4">
        <div className="d-flex justify-content-center mb-4">
          <h1>Novo Pedido</h1>
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
                {this.state.menuItems.map(i => <li>{i._id}</li>)}
              </ul>

              <button className="btn btn-outline-secondary btn-block">Adicionar Itens</button>

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
      </div>
    );
  }
}

CreateOrder.propTypes = {
};

const CreateOrderConnector = connect(() => (
  {

  }
), () => (
  {

  }
))(CreateOrder);

export default CreateOrderConnector;
