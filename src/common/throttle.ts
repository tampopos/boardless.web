import { delay } from './async-helper';

export class Throttle {
  constructor(private func: () => void, private interval: number) {}
  private lock = false;
  public execute = async () => {
    if (this.lock) {
      return;
    }
    this.lock = true;
    await delay(this.interval);
    try {
      this.func();
    } finally {
      this.lock = false;
    }
  };
}
export class ThrottleAsync<T = void> {
  constructor(private func: () => Promise<T>, private interval: number) {}
  private lock = false;
  public execute = async () => {
    if (this.lock) {
      return;
    }
    this.lock = true;
    await delay(this.interval);
    try {
      return await this.func();
    } finally {
      this.lock = false;
    }
  };
}
