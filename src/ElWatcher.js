import Emitter from './Emitter.js';

export default class ElWatcher extends Emitter {
    constructor() {
        super();
        this.mutationObs = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(el => {
                    return el instanceof HTMLElement ? this.emit('elAdded', el) : null;
                });
            });
        });
    }

    start() {
        this.mutationObs.observe(document.body, { subtree: true, attributes: false, childList: true, characterData: false });
    }
}
