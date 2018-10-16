class StateProvider {
    constructor(stateProviderNotifier) {
        this._stateProviderNotifier = stateProviderNotifier
    }

    register(fn) {
        this._stateProviderNotifier.add(fn)
    }

    notify(val) {
        this._stateProviderNotifier.notify(val)
    }
}

class StateProviderNotifier {
    constructor() {
        this._callbacks = []
    }

    add(fn) {
        this._callbacks.push(fn)
    }

    notify(val) {
        this._callbacks.forEach(fn => fn(val))
    }
}

const double = val => console.log(val * 2)
const squared = val => console.log(val ^ 2)

const stateProvider = new StateProvider(
    new StateProviderNotifier()
)

stateProvider.register(double)
stateProvider.register(squared)

let itr = 0
setInterval(() => {
    stateProvider.notify(itr++)
}, 1000)

