import Emitter from './Emitter.js';

export default class ElVisible extends Emitter {
    constructor(...args) {
        super();
        this.intersectionObs = new IntersectionObserver(changes => changes.forEach(change => this.emit('changeDetected', change)), { threshold: args });
    }

    watch(el) {
        this.intersectionObs.observe(el);
    }

    watchCurrent() {
        const currentElements = document.body.getElementsByTagName('*');
        for (let el of currentElements) {
            this.watch(el);
        }
    }


}
