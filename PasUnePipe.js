let = null;
let PasUnePipe = function(threshold) {
    this.viewObservers = [];
    this.functions = [];
    this.viewChanges = [];
    this.state = new pupState();
    this.timeOut = null;
    this.waiting = true;
    this.calculatedState = null;
    //used to look at changes to elements in view port
    this.viewObserver = new IntersectionObserver(changes => changes.forEach(change => this.execFunctions(change)), {
        threshold: threshold
    });

    //changes to dom. Then feeds those changes into viewObserver for processing.
    //Set to only care about HTMLElements
    this.nodeObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(el => el instanceof HTMLElement ? this.observeView(el) : null)
        });
    });
}

PasUnePipe.prototype.start = function() {
    this.addListener(this.listener());
    let elements = document.body.getElementsByTagName('*');
    for (let el of elements) {
        this.observeView(el);
    }
    this.bodyObserver = this.nodeObserver.observe(document.body, { subtree: true, attributes: false, childList: true, characterData: false });
    return this;
}

PasUnePipe.prototype.listener = function() {
    return (event) => {
        let start = this.getNumberOfElements();
        this.state.addEvent(event);
        let end = this.getNumberOfElements();
        if (start < end) {
            this.resetTimeOut();
        }
    }
}

PasUnePipe.prototype.resetTimeOut = function() {
    if (this.timeOut) {
        this.timeOut();
    }
    let toFnc = () => {
        if (this.timeOut) {
            this.timeOut();
        }
        if (this.waiting) {
            this.waiting = false;
            this.calculatedState = this.state.findVisiblyCompleteThreshold(0.8);
            console.log(this.calculatedState);
            ryansVar = this.calculatedState.array[this.calculatedState.arraylength - 1].time;
        }
    }

    let time = setTimeout(toFnc, 500);
    this.timeOut = () => clearTimeout(time);

}

PasUnePipe.prototype.getNumberOfElements = function() {
    return this.state.elementKeys.length;
}

PasUnePipe.prototype.observeView = function(el) {
    this.viewObservers.push(this.viewObserver.observe(el));
    return this.viewObservers;
}

PasUnePipe.prototype.addListener = function(func) {
    this.functions.push(func);
    return this;
}

PasUnePipe.prototype.execFunctions = function(change) {
    if (this.functions.length < 1) {
        console.log(change);
        return this;
    }
    for (let fnc of this.functions) {
        fnc(change);
        return this;
    }
}

PasUnePipe.prototype.addViewChange = function(ent) {
    return () => {
        this.viewChanges = this.viewChanges.concat(ent);
        return this;
    };
}



let pupState = function(viewChanges) {
    this.elementKeys = [];
    this.indexedStates = [];
    this.timeLine = [];
    if (viewChanges) {
        this.init(viewChanges);
    }
}

pupState.prototype.lastElementAddedAt = function() {
    let state = this.getVisableEndState();
    return state[state.length - 1] ? state[state.length - 1].time : null;
};



pupState.prototype.init = function(viewChanges) {
    viewChanges.forEach(el => this.addEvent.call(this, el));
    return this;
}

pupState.prototype.addEvent = function(el) {
    this.timeLine.push(el);
    let timeLineIndex = this.timeLine.length - 1;
    let index = this.elementKeys.indexOf(el.target);
    if (index > -1) {
        this.indexedStates[index].push(timeLineIndex);
        return this;
    } else {
        this.elementKeys.push(el.target);
        this.indexedStates[this.elementKeys.length - 1] = [timeLineIndex];
        return this;
    }
}

pupState.prototype.getStates = function(el) {
    return this.indexedStates[this.elementKeys.indexOf(el)];
}

pupState.prototype.reduceEndstate = function(reducer, initState) {
    return this.indexedStates.reduce((previous, current) => reducer(previous, this.timeLine[current[current.length - 1]]), initState);
}

pupState.prototype.getVisableEndState = function() {
    return this.reduceEndstate((previous, current) => previous.concat(current), []).filter(el => el.intersectionRatio > 0).sort((aState, bState) => aState.time - bState.time);
}

pupState.prototype.getVisableArea = function(state) {
    return state.intersectionRect.height * state.intersectionRect.width;
}
pupState.prototype.getArea = function() {
    return this.reduceEndstate((previous, current) =>
        this.getVisableArea(current) + previous, 0)
}

pupState.prototype.findVisiblyCompleteThreshold = function(num, init) {
    init = init || 0;
    let area = this.getArea();
    let endState = this.getVisableEndState();
    return endState.reduceRight((prev, current, index) => {
        if (prev.precent < (1 - num)) {
            prev.timeIndex = index;
            prev.precent += this.getVisableArea(current) / area;
        }
        return prev;
    }, { timeIndex: null, precent: init, array: endState })
}



let test = new PasUnePipe([0.5]).start();
// TODO: Add image validation logic using natural Height and Width;
// -a image that hasn't loaded yet might not matter if the expected size doesn't impact 80% loaded mark
// wait for .5s of no dom mutations to apply deduction logic 
// deduction logic: remove last loaded elements until ~20% taken away, timestamp of last removed is visComplete