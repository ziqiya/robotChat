const chatData = {
  state: '',
  reducers: {
    setData: (prev, next) => {
      return next;
    },
  },
  effects: () => ({
    // async fetchData(state, payload, actions) {
    //   const data = await new Promise(resolve => {
    //     resolve(123);
    //   });
    //   actions.setData(data);
    // },
  }),
};

export default chatData;
