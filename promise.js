class Promise2 {

  constructor(fn) {
    this.callbacks = [];
    this.state = 'pending';

    if (typeof fn !== 'function') {
      return new Error('必须是一个函数');
    }
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  static resolve(result) {
    return new Promise2(resolve => {
      resolve(result);
    });
  }

  resolve(result) {
    if (this.state !== 'pending') return;
    this.state = 'fulfilled';
    nextTick(() => {
      this.callbacks.forEach(handler => {
        let x;
        try {
          x = handler[0].call(undefined, result);
        }catch (e) {
          return this.reject(e);
        }
        handler[2].resolveWith(x);
      });
    });
  }

  static reject(reason) {
    return new Promise2((resolve, reject) => {
      reject(reason);
    });
  }

  reject(reason) {
    if (this.state === 'rejected') {

    }
    if (this.state !== 'pending') return;
    this.state = 'rejected';
    nextTick(() => {
      this.callbacks.forEach(handler => {
        let x = '';
        try {
          x = handler[1].call(undefined, reason);
        }catch (e) {
          return this.reject(e);
        }
        handler[2].resolveWith(x);
      });
    });
  }

  then(success, fail) {
    const handlerCollect = [];
    handlerCollect[0] = typeof success === 'function' ? success : value => value;
    handlerCollect[1] = typeof fail === 'function' ? fail : error => { throw error};

    handlerCollect[2] = new Promise2(()=> {});

    this.callbacks.push(handlerCollect);


    return handlerCollect[2];
  }

  resolveWith(x) {
    if (this === x) {
      this.resolveWithItself();
    } else if (x instanceof Promise2) {
      this.resolveWithPromise(x);
    } else if (x instanceof Object) {
      this.resolveWithObject(x);
    }else {
      this.resolve(x);
    }
  }

  resolveWithObject(x) {
    let then;
    try {
      then = x.then;
    } catch (e) {
      this.reject(e);
    }
    if (typeof then === 'function') {
      this.resolveWithThenable(x);
    } else {
      this.resolve(x);
    }
  }

  resolveWithPromise(x) {
    x.then(result => {
      this.resolve(result);
    }, reason => {
      this.reject(reason);
    });
  }

  resolveWithItself() {
    this.reject(new TypeError('不能循环调用'));
  }

  resolveWithThenable(x) {
    try {
      x.then(
        y => {
          this.resolveWith(y);
        },
        r => {
          this.reject(r);
        }
      );
    } catch (e) {
      this.reject(e);
    }
  }
}

export default Promise2;

function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    let counter = 1;
    const observer = new MutationObserver(fn);
    const textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}
