const Promise2 = require('./promise-compiled').default;

module.exports = {
  resolve: Promise2.resolve,
  reject: Promise2.reject,
  deferred() {
    let resolve;
    let reject;
    let promise = new Promise2((r, j) => {
      resolve = r;
      reject = j;
    });
    return {
      promise,
      resolve,
      reject,
    };
  },
};
