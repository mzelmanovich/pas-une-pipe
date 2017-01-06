let inViewCallback = function inView(el) {
    el.forEach((change) => {
        console.log(change);
    });
}
// % of element in viewport
let options = {
    threshold: [0.5]
};
let viewObserver = new IntersectionObserver(inViewCallback, options);
let elements = document.body.getElementsByTagName('*');
for (let el of elements) {
    viewObserver.observe(el);
}
let nodeAddedObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(el => el instanceof HTMLElement ? viewObserver.observe(el) : null)
    });
});
var config = { attributes: false, childList: true, characterData: false };
nodeAddedObserver.observe(document.body, config);