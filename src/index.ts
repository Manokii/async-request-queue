import { AsyncRequestQueue } from "./async-request-queue";

async function delayByMs(ms: number, id: string): Promise<number> {
  console.log("queued", id, ms);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("finished", id, ms);
      resolve(ms);
    }, ms);
  });
}

async function main() {
  const q = new AsyncRequestQueue(3);
  q.enqueue(() => delayByMs(1000, "a"));
  q.enqueue(() => delayByMs(3000, "b"));
  q.enqueue(() => delayByMs(1100, "c"));
  q.enqueue(() => delayByMs(10000, "d"));
  const weCanAwait = q.enqueue(() => delayByMs(3000, "e"));
  q.enqueue(() => delayByMs(3000, "f"));
  console.log("awaited", await weCanAwait);
}

main().then();
