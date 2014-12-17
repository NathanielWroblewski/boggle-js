namespace('Boggle.Views')

Boggle.Views.Game = function() {
  this.initialize = function(options) {
    this.el = options.el
    this.$el = $(this.el)
    this.model = options.model
    this.model.shake()
    this.dictionary = options.dictionary
    this.alreadyGuessed = []

    this.setListeners()
  },

  this.setListeners = function() {
    var self = this
    this.$el.find('a').on('mouseenter', function(){
      $(this).animate({fontSize: '+=5px'})
    })
    this.$el.find('a').on('mouseleave', function(){
      $(this).animate({fontSize: '-=5px'})
    })
    this.$el.find('form').on('submit', function(e) {
      e.preventDefault()
      self.submitWord()
    })
  },

  this.template = function(model) {
    var template = ''
    _.each(model.board, function(die) {
      template += '<div>' + die.letter + '</div>'
    })
    return template
  },

  this.submitWord = function() {
    var word = this.$el.find('input[type="text"]').val().toUpperCase()
    this.hideWarnings()
    if (
      this.model.hasWord(word) &&
      this.dictionary.includes(word.toLowerCase()) &&
      this.haventGuessedWord(word)
    ) {
      this.alreadyGuessed.push(word)
      this.incrementScore()
      this.clearWord()
    } else if (!this.model.hasWord(word)) {
      this.$el.find('.not-on-board').show()
    } else if (!this.dictionary.includes(word.toLowerCase())) {
      this.$el.find('.not-in-dictionary').show()
    } else if (!this.haventGuessedWord(word)) {
      this.$el.find('.already-guessed').show()
    }
  },

  this.haventGuessedWord = function(word) {
    var result = _.find(this.alreadyGuessed, function(guessedWord) {
      return word === guessedWord
    })
    return (result ? false : true)
  },

  this.incrementScore = function() {
    $score = this.$el.find('.score')
    var currentScore = Number($score.text()) || 0
    $score.html(currentScore + 100)
  },

  this.hideWarnings = function() {
    this.$el.find('.warning').hide()
  },

  this.clearWord = function() {
    this.$el.find('input[type="text"]').val('')
  },

  this.render = function() {
    $(this.el + ' .board').html(this.template(this.model.toJSON()))
    return this
  }
}
