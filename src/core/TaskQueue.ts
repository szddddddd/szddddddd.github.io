export class TaskQueue {
  private tail: Promise<void> = Promise.resolve();

  enqueue<Result>(task: () => Result | Promise<Result>): Promise<Result> {
    const result = this.tail.then(task);
    this.tail = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }
}
