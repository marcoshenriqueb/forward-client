import auth from './auth';
import businesses from './businesses';
import businessAreas from './businessAreas';
import menuCategories from './menuCategories';
import menuItems from './menuItems';
import motoboys from './motoboys';
import orders from './orders';
import paymentMethods from './paymentMethods';

export default {
  ...auth,
  ...businesses,
  ...businessAreas,
  ...menuCategories,
  ...menuItems,
  ...motoboys,
  ...orders,
  ...paymentMethods,
};
