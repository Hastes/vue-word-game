export default class Generator {
  constructor (min, max) {
    let _numbers = this.shuffle(this.getStartNumbers(min, max))
    this.getRandomNumber = () => _numbers.pop()
  }
  getStartNumbers (min, max) {
    const arraylength = max - min
    return Array.apply(null, { length: arraylength }).map((i, index) => index + min)
  }
  shuffle (array) {
    return array.sort((a, b) => Math.random() - 0.5)
  }
}
