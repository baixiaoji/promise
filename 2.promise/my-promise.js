module.exports = {
    resolve: Promise.resolve,
    reject: Promise.reject,
    deferred() {
        let resolve
        let reject
        let promise = new Promise((r, j) => {
            resolve = r
            reject = j
        })
        return {
            promise,
            resolve,
            reject
        }
    },
}
