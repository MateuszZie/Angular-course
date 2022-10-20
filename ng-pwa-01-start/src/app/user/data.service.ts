export class DataService {
  getDetails() {
    const myPromise = new Promise((resolve, rejected) => {
      setTimeout(() => {
        resolve("Data");
      }, 2000);
    });
    return myPromise;
  }
}
