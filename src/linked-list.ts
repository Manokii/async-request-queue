type LinkedListNode<T> = {
  value: T;
  next?: LinkedListNode<T>;
};

export class LinkedList<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;
  length: number;

  constructor() {
    this.length = 0;
  }

  pushFront(value: T): T {
    const node: LinkedListNode<T> = { value };

    if (!this.head || !this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length++;
    return node.value;
  }

  popBack(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    const node = this.head;
    this.head = this.head.next;
    this.length--;

    if (!this.length) {
      this.tail = undefined;
    }

    return node.value;
  }
}
