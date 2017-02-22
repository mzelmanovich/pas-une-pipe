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
    searchValue(searchValue) {
        var place = this.head;
        while(place) {
            // console.log(place.value == searchValue);
            if (place.value == searchValue) {
                return place;
            }
            place = place.next;
        }
        return null;
    }
    deleteValue(deleteValue) {
        var place = this.head;
        while(place) {

            if (place.value == deleteValue) {
                if (place == this.head) {
                    this.removeHead();
                } else if (place == this.tail) {
                    this.removeTail();
                } else {
                    if (place.previous) place.previous.next = place.next;
                    if (place.next && place.previous) place.next.previous = place.previous;
                }
            }
            place = place.next;
        }
        return null;
    }
    printList() {
        var place = this.head;
        var largest = this.head;
        console.log("Printing List");
        while(place) {
            console.log("HTML");
            console.log(place.value);
            console.log("Area");
            console.log(place.value.pupTracking.states[place.value.pupTracking.states.length - 1].area);
            if (largest.value.pupTracking.states[largest.value.pupTracking.states.length - 1].area < place.value.pupTracking.states[place.value.pupTracking.states.length - 1].area) {
                largest = place;
            }
            place = place.next;
        }
        if (largest != -1) {
            console.log("King:");
            console.log(largest.value);
            console.log(largest.value.pupTracking.states[largest.value.pupTracking.states.length - 1].area);
        }
    }

    searchForward(searchValue) {
        let searchFnc = typeof searchValue === 'string' ? (value) => value === searchValue : searchValue;
        let recursiveFunc = (node) => {
            
            if (node) {
                console.log(node.value);
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
    size() {
        var current = this.head;
        var counter = 0;
        while (current) {
            current = current.next;
            counter++;
        }
        return counter;
    }

}