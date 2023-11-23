import Vuex from 'vuex';

// Import your store modules
import * as module1 from './module1';

const store = () =>
  new Vuex.Store({
    modules: {
      module1,
    },
  });

export default store;
