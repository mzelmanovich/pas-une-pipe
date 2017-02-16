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
        this.total = 0;
        this.lastAreaPercent = 0;
    }
    enableTracking(target) {
        Object.defineProperty(target, 'pupTracking', {
            enumerable: false,
            value: { states: [] }
        });
    }
    handleVisChange(change) {
        const newChange = {};
        const target = change.target;
        newChange.ratio = change.intersectionRatio;
        newChange.time = this.visWatcher.createdAt + change.time;
        newChange.area = change.intersectionRect.height * change.intersectionRect.width;
        if (!target.pupTracking) {
            this.enableTracking(target);
        }
        target.pupTracking.states.push(newChange);

        let state = target.pupTracking.states;
        let length = state.length;
        
        if (length > 1) {
            let delta = state[length-1].area - state[length-2].area;
            state[length-1].runningTotal = state[length-2].runningTotal + delta;
            if (state[length-1].runningTotal != 0) {
                state[length-1].percentChange = 100 * (delta/state[length-1].runningTotal);
            }
            else {
                state[length-1].percentChange = 100;
            }
        } else {
            //First state instance
            state[length-1].percentChange = 0;
            // target.pupTracking.total = 0;
            state[length-1].runningTotal = state[length-1].area;
        }
        console.log(state);
        
    }

    handleNodeAdded(el) {
        this.visWatcher.watch(el);
    }

    start() {
        this.visWatcher.watchCurrent();
        this.nodeWatcher.start();
    }
}