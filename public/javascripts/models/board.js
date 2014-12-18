namespace('Boggle.Models')

Boggle.Models.Board = function() {
  this.dice = [
    'AAEEGN', 'ELRTTY', 'AOOTTW', 'ABBJOO',
    'EHRTVW', 'CIMOTU', 'DISTTY', 'EIOSST',
    'DELRVY', 'ACHOPS', 'HIMNQU', 'EEINSU',
    'EEGHNW', 'AFFKPS', 'HLNNRZ', 'DEILRX'
  ],

  this.neighbors = [
    [-1,-1], [ 0,-1], [ 1,-1],
    [-1, 0],          [ 1, 0],
    [-1, 1], [ 0, 1], [ 1, 1]
  ],

  this.board = [],
  this.lastWordCoordinates = [],

  this.shake = function() {
    var rolledDice = _.map(this.dice, function(die) { return die[_.random(5)] })
      , shuffledDice = _.shuffle(rolledDice)

    this.board = _.map(shuffledDice, function(letter, index) {
      var x = index % 4, y = Math.floor(index / 4)
      return { 'coordinate': [x,y], 'letter': letter }
    })
  },

  this.hasWord = function(word) {
    var result = _.find(this.board, function(die) {
      return die.letter === word[0] && this.checkNeighbors(word.slice(1), die.coordinate)
    }, this)
    return (result ? true : false)
  },

  this.checkNeighbors = function(nextLetters, coord, blacklist) {
    if (nextLetters.length === 0) {
      this.lastWordCoordinates = blacklist.concat([coord])
      return true
    }
    blacklist = typeof blacklist !== 'undefined' ? blacklist : []
    var result = _.find(this.neighbors, function(neighbor) {
      var nextCoordinate = [neighbor[0] + coord[0], neighbor[1] + coord[1]]
      return !this.isBlacklisted(blacklist, nextCoordinate) &&
        this.letterAtCoordinate(nextCoordinate) === nextLetters[0] &&
        this.checkNeighbors(nextLetters.slice(1), nextCoordinate, blacklist.concat([coord]))
    }, this)
    return (result ? true : false)
  },

  this.isBlacklisted = function(blacklist, coord) {
    var result = _.find(blacklist, function(coordinate) {
      return coordinate[0] === coord[0] && coordinate[1] === coord[1]
    })
    return (result ? true : false)
  },

  this.letterAtCoordinate = function(coord) {
    var die = _.find(this.board, function(die) {
      return die.coordinate[0] === coord[0] && die.coordinate[1] === coord[1]
    })
    if (die) return die.letter
  },

  this.toJSON = function() {
    return { board: this.board }
  }
}
