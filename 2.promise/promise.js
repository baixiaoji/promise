class Promise2 {
  callbacks = [];
  state = 'pending';
  constructor(fn) {
    if (typeof fn !== 'function') {
      return new Error('必须是一个函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(result) {
    if (this.state !== 'pending') return;
    this.state = 'fulfilled';
    setTimeout(() => {
      this.callbacks.forEach(handler => {
        if (typeof handler === 'function') {
          handler[0].call(undefined, result);
        }
      });
    });
  }

  reject(reason) {
    if (this.state !== 'pending') return;
    this.state = 'rejected';
    setTimeout(() => {
      this.callbacks.forEach(handler => {
        if (typeof handler === 'function') {
          handler[1].call(undefined, reason);
        }
      });
    });
  }

  then(success, fail) {
    const handlerCollect = [];
    if (typeof success === 'function') {
      handlerCollect[0] = success;
    }

    if (typeof fail === 'function') {
      handlerCollect[1] = fail;
    }
    if (handlerCollect.length !== 0) {
      this.callbacks.push(handlerCollect);
    }

    return new Promise2(() => {});
  }
}

export default Promise2;
