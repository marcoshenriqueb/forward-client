import auth from './auth';
import business from './business';
import businessAreas from './businessAreas';
import menuCategories from './menuCategories';
import menuItems from './menuItems';
import motoboys from './motoboys';
import orders from './orders';
import paymentMethods from './paymentMethods';

export default {
  ...auth,
  ...business,
  ...businessAreas,
  ...menuCategories,
  ...menuItems,
  ...motoboys,
  ...orders,
  ...paymentMethods,
};
