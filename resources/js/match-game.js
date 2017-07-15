var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $("#game"));
});

/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
  var unplaced = new Array();
  for (var i = 1; i <= 8; i++) {
    unplaced.push(i);
    unplaced.push(i);
  }

  var placed = new Array;
  while (unplaced.length > 0) {
    var index = Math.floor(Math.random() * unplaced.length);
    placed.push(unplaced[index]);
    unplaced.splice(index, 1);
  }

  return placed;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  $game.data("flipped", []);
  var colors = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data("flipped", false);
    $card.data("color", colors[cardValues[i] - 1]);
    $card.data("value", cardValues[i]);
    $game.append($card);
  };
  $(".card").click(function() {
    MatchGame.flipCard($(this), $("#game"))
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if (!($card.data("flipped"))) {
    $card.css("background-color", $card.data("color"));
    $card.text($card.data("value"));
    $card.data("flipped", true);
    $game.data("flipped").push($card);
    if ($game.data("flipped").length === 2) {
      if ($game.data("flipped")[0].data("value") === $game.data("flipped")[1].data("value")) {
        $game.data("flipped")[0].css("color", "rgb(204, 204, 204)");
        $game.data("flipped")[0].css("background-color", "rgb(153, 153, 153)");
        $game.data("flipped")[1].css("color", "rgb(204, 204, 204)");
        $game.data("flipped")[1].css("background-color", "rgb(153, 153, 153)");
      } else {
        var card1 = $game.data("flipped")[0];
        var card2 = $game.data("flipped")[1];
        window.setTimeout(function() {
          card1.data("flipped", false);
          card1.css("background-color", "rgb(32, 64, 86)");
          card1.text('');
          card2.data("flipped", false);
          card2.css("background-color", "rgb(32, 64, 86)");
          card2.text('');
        }, 350);
      }
      $game.data("flipped", []);
    }
  }
  return;
}
