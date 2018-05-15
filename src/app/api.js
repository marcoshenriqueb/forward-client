import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage, // eslint-disable-line
  }));

feathersClient.hooks({
  error(hook) {
    if (hook.error.className === 'not-authenticated') {
      console.log('not-authenticated');
    }
  },
});

export default {
  auth: feathersClient.authenticate,
  logout: feathersClient.logout,
  users: feathersClient.service('users'),
  businesses: feathersClient.service('businesses'),
  businessAreas: feathersClient.service('business-areas'),
  menuCategories: feathersClient.service('menu-categories'),
  menuItems: feathersClient.service('menu-items'),
  motoboys: feathersClient.service('motoboys'),
  orders: feathersClient.service('orders'),
  paymentMethods: feathersClient.service('payment-methods'),
  ifoodAuth: feathersClient.service('ifood-auth'),
  request: axios,
};
