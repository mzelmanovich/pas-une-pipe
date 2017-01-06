let PasUnePipe = function(threshold) {
    this.viewObservers = [];
    this.functions = [];
    this.viewChanges = [];
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
    let elements = document.body.getElementsByTagName('*');
    for (let el of elements) {
        this.observeView(el);
    }
    this.bodyObserver = this.nodeObserver.observe(document.body, { subtree: true, attributes: false, childList: true, characterData: false });
    return this;
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
    if (viewChanges) {
        this.init(viewChanges);
    }
}

pupState.prototype.init = function(viewChanges) {
    viewChanges.forEach(el => this.addEvent.call(this, el));
    return this;
}

pupState.prototype.addEvent = function(el) {
    if (this.elementKeys.indexOf(el.target) > -1) {
        this.indexedStates[this.elementKeys.indexOf(el.target)].push(el);
    } else {
        this.elementKeys.push(el.target);
        this.indexedStates[this.elementKeys.indexOf(el.target)] = [el];
    }
}

pupState.prototype.getStates = function(el) {
    return this.indexedStates[this.elementKeys.indexOf(el)];
}

pupState.prototype.calculateEndState = function(reducer, initState) {
    return this.indexedStates.reduce((previous, current) => reducer(previous, current[current.length - 1]), initState);
}


let state = new pupState();

let listener = (event) => {
    state.addEvent(event);
};
let test = new PasUnePipe([0.5]).addListener(listener).start();

let testArea = function() {
    return state.calculateEndState((previous, current) =>
        (current.intersectionRect.height * current.intersectionRect.width) + previous, 0)
}

// TODO: Add image validation logic using natural Height and Width;
// -a image that hasn't loaded yet might not matter if the expected size doesn't impact 80% loaded mark
// wait for .5s of no dom mutations to apply deduction logic 
// deduction logic: remove last loaded elements until ~20% taken away, timestamp of last removed is visComplete 