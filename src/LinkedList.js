class LLNode {
    constructor(item) {
        this.value = item;
    }

    remove() {
        if (this.previous) {
            this.previous.next = this.next;
        }
        if (this.next) {
            this.next.previous = this.previous;
        }
    }
}

export default class LinkedList {
    addToTail(item) {
        const node = new LLNode(item);
        if (this.tail) {
            this.tail.next = node;
            node.previous = this.tail;
        }
        this.tail = node;
        if (!this.head) {
            this.head = this.tail;
        }
    }
    removeHead() {
        if (this.head) {
            var currentHead = this.head;
            this.head = currentHead.next;
            if (!currentHead.next) {
                this.tail = null;
            }
            if (this.head) {
                this.head.previous = null;
            }
            return currentHead.value;
        }
    }
    removeTail() {
        if (this.tail) {
            var currentTail = this.tail;
            this.tail = currentTail.previous;
            if (!currentTail.previous) {
                this.head = null;
            }
            if (this.tail) {
                this.tail.next = null;
            }
            return currentTail.value;
        }
    }
    addToHead(item) {
        var node = new Node(item);
        if (this.head) {
            this.head.previous = node;
            node.next = this.head;
        }

        this.head = node;

        if (!this.tail) {
            this.tail = this.head;
        }
    }

    searchForward(searchValue) {
        let searchFnc = typeof searchValue === 'string' ? (value) => value === searchValue : searchValue;
        let recursiveFunc = (node) => {
            if (node) {
                return searchFnc(node.value) ? node : recursiveFunc(node.next);
            }
            return null;
        };
        return recursiveFunc(this.head);
    }

    searchBackward(searchValue) {
        let searchFnc = typeof searchValue === 'string' ? (value) => value === searchValue : searchValue;
        let recursiveFunc = (node) => {
            if (node) {
                return searchFnc(node.value) ? node : recursiveFunc(node.previous);
            }
            return null;
        };
        return recursiveFunc(this.tail);
    }


}