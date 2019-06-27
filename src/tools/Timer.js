export default class Timer {
  constructor () {
    this._seconds = 0
    this._intervalId = null
    this.getSeconds = () => {
      return this._seconds
    }
    this.clear = () => {
      this._seconds = 0
      clearInterval(this._intervalId)
    }
    this.clearInterval = () => clearInterval(this._intervalId)
    this.init = () => setInterval(() => ++this._seconds, 1000)
    this.setInterval = (intervalId) => { this._intervalId = intervalId }
  }
  minutes () {
    return parseInt(this.getSeconds() / 60)
  }
  seconds () {
    return this.getSeconds() % 60
  }
  stop () {
    this.clear()
  }
  pause () {
    this.clearInterval()
  }
  start () {
    this.clear()
    const intervalId = this.init()
    this.setInterval(intervalId)
  }
}
