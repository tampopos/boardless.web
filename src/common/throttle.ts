import { delay } from './async-helper';

export class Throttle {
  constructor(private func: () => void, private interval: number) {}
  private lock = false;
  public execute = async () => {
    if (this.lock) {
      return false;
    }
    this.lock = true;
    await delay(this.interval);
    try {
      this.func();
    } finally {
      this.lock = false;
    }
    return true;
  };
}
export class ThrottleAsync {
  constructor(private func: () => Promise<{}>, private interval: number) {}
  private lock = false;
  public execute = async () => {
    if (this.lock) {
      return false;
    }
    this.lock = true;
    await delay(this.interval);
    try {
      await this.func();
    } finally {
      this.lock = false;
    }
    return true;
  };
}
