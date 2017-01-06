let PasUnePipe = function(threshold) {
    this.viewObservers = [];
    this.functions = [];
    //used to look at changes to elements in view port
    this.viewObserver = new IntersectionObserver(change => this.execFunctions(change), {
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

let entries = [];
let addEnt = function(ent) {
    entries = entries.concat(ent);
}

let cleanEntries = function() {
    let dictionary = {};
    entries.forEach((el) => {
        if (dictionary[el.target]) {
            dictionary[el.target].push(el);
        } else {
            dictionary[el.target] = [el];
        }
    });
    return dictionary;
}
let test = new PasUnePipe([0.5]).addListener(addEnt).start();