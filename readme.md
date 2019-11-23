> Promise, SPEC

## 实现 Promise

实现符合 [`Promise/A+`](https://github.com/promises-aplus/promises-spec) 标准的 promise 实现。


## 测试
- 在 `my-promise.js` 内实现 `resolve`，`reject`，`deferred` 三个方法
    - `resolve(value)`: 返回一个以 `value` resolve 的 promise
    - `reject(value)`: 返回一个以 `value` reject 的 promise
    - `deferred`: 返回一个包含以下三个属性的对象
        - `promise`: 当前处于 pending 状态的 promise
        - `resolve(value)`: 用 `value` resolve 该 promise
        - `reject(value)`: 用 `value` reject 该 promise
- `npm i` 安装完依赖后，在本目录下运行 `npm t` 进行测试，测试通过即完成题目。
- 不要作弊（比如直接使用原生 Promise）。

![image](/uploads/f8e03ffc86f99339ea3f7c3fb60e45bc/image.png)

## 提示
- 测试代码在这里 `./2.promise/node_modules/promises-aplus-tests/lib/tests`
- 建议先读下 spec
- 遇到困难没必要头铁，可以网上找思路
