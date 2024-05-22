function disableNonHintTiles() {
  for (var i = 0, i1 = LEVEL.gridSize; i < i1; i++)
    for (var j = 0, j1 = LEVEL.gridSize; j < i1; j++) {
      if (!$(`#xy-${i}-${j}`).hasClass('hint')) {
        $(`#xy-${i}-${j}`).off('click');
      }
    }
}



function disableButton(el) {
  $(el).off('click').attr('disabled', 'disabled');
}
function enableButton(el) {
  $(el).removeAttr('disabled');
}
