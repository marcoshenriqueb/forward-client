import store from './../store';

export default {
  getPaymentMethodId(name) {
    console.log(9, name);
    const result = store.getstate().paymentMethods.paymentMethods.data.filter(m => (
      m.name.toLowerCase() === name.toLowerCase()
    ));

    console.log(10, name);
    return result.length ? result[0]._id : '';
  },
};
