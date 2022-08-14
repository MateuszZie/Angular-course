export class CounterService {
  private countSum = 0;

  incraseAndLogSwitch(action: string) {
    this.countSum++;
    console.log(action + " switched " + this.countSum + " times");
  }
}
