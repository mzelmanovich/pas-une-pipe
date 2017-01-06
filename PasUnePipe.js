let PasUnePipe = function(threshold) {
    this.viewObservers = [];
    this.functions = [];
    this.viewObserver = new IntersectionObserver(change => this.execFunctions(change), {
        threshold: threshold
    });

    this.nodeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(el => el instanceof HTMLElement ? this.observeView(el) : null)
        });
    });
}

PasUnePipe.prototype.start = function() {
    let elements = document.body.getElementsByTagName('*');
    for (let el of elements) {
        this.observeView(el);
    }
    this.bodyObserver = this.nodeObserver.observe(document.body, { attributes: false, childList: true, characterData: false });
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