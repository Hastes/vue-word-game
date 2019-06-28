export class Letters extends Array {
  static get [Symbol.species] () { return Letters }
  isCorrect () {
    return true
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
