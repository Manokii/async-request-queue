import { LinkedList } from "./linked-list";

export class AsyncRequestQueue {
  queue: LinkedList<() => Promise<void> | void>;
  maxRunningTask: number;
  pending: number;

  constructor(maxRunningTask: number) {
    this.queue = new LinkedList();
    this.maxRunningTask = maxRunningTask;
    this.pending = 0;
  }

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve) => {
      this.queue.pushFront(() => {
        this.pending++;
        try {
          const result = task();
          resolve(result);
        } catch (e) {
          console.log(e);
        } finally {
          this.#next();
        }
      });
      this.#run();
    });
  }

  #next() {
    this.pending--;
    this.#run();
  }

  #run() {
    if (this.pending < this.maxRunningTask && this.queue.length > 0) {
      const task = this.queue.popBack();
      task?.();
    }
  }
}
