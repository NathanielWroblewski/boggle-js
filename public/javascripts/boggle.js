$(document).ready(function() {
  var game = new Boggle.Views.Game
  game.initialize({
    el: '#boggle',
    model: new Boggle.Models.Board,
    dictionary: new Boggle.Models.Dictionaries.English
  })
  game.render()

  $(document).on('keyup', function(e) {
    // enter key
    if (e.keyCode === 13) e.preventDefault()
  })
})
