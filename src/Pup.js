import ElWatcher from './ElWatcher.js';
import ElVisible from './ElVisible.js';
import Emitter from './Emitter.js';
import LinkedList from './LinkedList.js';

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
        this.king = null;
        this.list = new LinkedList();
        this.counter = 0;

    }

    getAreas() {
        this.list.iterate(x => console.log(x, x.pupTracking.states[x.pupTracking.states.length - 1].area));
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
        newChange.time = change.time;
        newChange.area = change.intersectionRect.height * change.intersectionRect.width;
        if (!target.pupTracking) {
            this.enableTracking(target);
        }
        target.pupTracking.states.push(newChange);

        let states = target.pupTracking.states;

        let delta = states[states.length - 1].area - (states[states.length - 2] ? states[states.length - 2].area : 0);

        this.total += delta;
        states[states.length - 1].percentChange = 100 * (delta / this.total);

        if (states[states.length - 1].area > 0 && !this.list.searchValue(target)) {
            this.list.addToTail(target);
        } else if (states[states.length - 1].area <= 0 && this.list.searchValue(target)) {
            this.list.deleteValue(target);

        }
        this.king = this.list.printList();

    }

    handleNodeAdded(el) {
        this.visWatcher.watch(el);
    }

    start() {
        this.visWatcher.watchCurrent();
        this.nodeWatcher.start();
    }

    getTimeWhen(precent) {
        let runningTotal = 0;
        let time;
        this.list.iterate(value => {
            console.log(value, this.total);
            const states = value.pupTracking.states;
            runningTotal += Math.round(states[states.length - 1].area / this.total);
            if (!time && runningTotal >= precent) {
                time = states[states.length - 1].time;
            }
        });
        return time;
    }
}