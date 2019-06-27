export class Letters extends Array {
  constructor (...items) {
    super(...items)
  }
  isCorrect () {
  }
  map (callback) {
    return new Letters(super.map(callback))
  }
  filter (callback) {
    return new Letters(super.filter(callback))
  }
  sort (callback) {
    return new Letters(super.sort(callback))
  }
}

export class Letter {
  constructor (letter, position, choose = undefined) {
    this.letter = letter
    this.position = position
    this.choose = undefined
    this._correctPosition = false
  }
  isPositionCorrect () {

  }
}
