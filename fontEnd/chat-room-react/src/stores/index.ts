import { createStore } from '@ice/store';
import chatData from './chatData';

// const iceStore = new IceStore();
const models = {
  chatData,
};

const store = createStore(models);
console.log('store: ', store);
const { useModel } = store;

// Object.keys(store).forEach(key => {
//   iceStore.registerStore(key, store[key]);
// });

export default store;
