import ElWatcher from './ElWatcher.js';
import ElVisible from './ElVisible.js';
import Emitter from './Emitter.js';

export default class Pup extends Emitter {
    constructor(start) {
        super();
        this.nodeWatcher = new ElWatcher();
        this.visWatcher = new ElVisible(0.01);
        this.visWatcher.on('changeDetected', change => this.handleVisChange(change));
        this.nodeWatcher.on('elAdded', el => this.handleNodeAdded(el));
        if (start) {
            this.start();
        }
    }

    handleVisChange(change) {
        let newChange = {};
        newChange.ratio = change.intersectionRatio;
        newChange.time = this.visWatcher.createdAt + change.time;
        newChange.target = change.target;
        newChange.area = change.intersectionRect.height * change.intersectionRect.width;

        console.log(newChange, change);
    }

    handleNodeAdded(el) {
        this.visWatcher.watch(el);
    }

    start() {
        this.visWatcher.watchCurrent();
        this.nodeWatcher.start();
    }
}