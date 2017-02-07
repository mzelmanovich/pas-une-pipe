export default class Emitter {
    constructor() {
        this.functions = {};
    }

    on(eventName, func) {
        this.functions[eventName] = this.functions[eventName] || [];
        this.functions[eventName].push(func);
    }

    emit(eventName, param) {
        const funcArr = this.functions[eventName] || [];
        funcArr.forEach(func => func(param));
    }


}
