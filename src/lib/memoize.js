module.exports = (fn) => {
    let lastCall;
    let lastResult;
    let lastCtxt;

    // equals :: Array a, b => a, b -> Boolean
    const equals = (lastCall, currentCall) => {
        if (lastCall.length !== currentCall.length) {
            return false;
        }

        for (let i = 0, l = lastCall.length; i < l; i++) {
            if (lastCall[i] !== currentCall[i]) {
                return false;
            }
        }

        return true;
    };

    return function (...args) {
        if (lastCtxt === this && lastCall && equals(lastCall, args)) {
            return lastResult;
        }

        lastCall = args;
        lastCtxt = this;
        lastResult = fn.apply(lastCtxt, lastCall);

        return lastResult;
    };
};
