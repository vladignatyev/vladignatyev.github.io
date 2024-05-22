


var LEVEL = {};
const o = 2;

function buildGrid(w, h) {
  var html = "";
  for (var i = 0; i < h; i++) {
    html = html + '<div class="row row-' + w + '">';
    for (var j = 0; j < w; j++) {
      html = html + '<div id="xy-' + j + '-' + i + '" class="grid grid-' + w + ' red"></div>';
    }
    html = html + '</div>';
  }
  return html;
}

function setState(i, j, state, dir) {
  var el = $('#xy-' + i + '-' + j);

  if (el.hasClass('red')) {
    el.removeClass('red');
  }
  if (el.hasClass('green')) {
    el.removeClass('green');
  }
  el.removeClass('rotate-hor');
  el.removeClass('rotate-ver');
  el.removeClass('rotate-dia');

  el.addClass(['rotate-hor', 'rotate-ver', 'rotate-dia', ][(Math.random() * 4)|0]);

  el.data('state', state);

  el.removeClass('td-1');
  el.removeClass('td-2');
  el.removeClass('td-3');
  el.removeClass('td-4');

  el.addClass(state);
  el.addClass('td-' + (Math.floor(Math.random() * 4.0 + 1.0) | 0));
}

function getState(i,j) {
  var el = $('#xy-' + i + '-' + j);
  return el.data('state');
}

function flipState(i, j, dir) {
  var el = $('#xy-' + i + '-' + j);
  var state = el.data('state');
  if (state == 'red') {
    setState(i, j, 'green', dir);
  } else if (state == 'green') {
    setState(i, j, 'red', dir);
  }
}

function getXYFromData(el) {
  var ch = el.id.split('-');
  return [ch[1], ch[2]];
}

function traverse(x, y) {
  for (var i = 0, m = LEVEL['gridSize']; i < m; i++) { // traverse
    flipState(i, y, i < x? 'left': 'right');
    flipState(x, i, i < y? 'top': 'bottom');
  }
  flipState(x, y, 'center');
}

function checkSolution() {
  var red = true;
  for (var i = 0; i < LEVEL['gridSize']; i++)
    for (var j = 0; j < LEVEL['gridSize']; j++)
      red = red && (getState(i, j) === 'red' || getState(i, j) === 'noop' );

  var green = true;
  for (var i = 0; i < LEVEL['gridSize']; i++)
    for (var j = 0; j < LEVEL['gridSize']; j++)
      green = green && (getState(i, j) === 'green'  || getState(i, j) === 'noop' );

  return green || red;
}

function load(LEVEL) {
  for (var col = 0; col < LEVEL['gridSize']; col++){
    for (var row = 0; row < LEVEL['gridSize']; row++){
      var mapVal = LEVEL['map'][LEVEL['gridSize'] * row + col];
      if (mapVal == 0) {
        setState(col, row, 'red')
      } else if (mapVal == 1) {
        setState(col, row, 'green')
      } else if (mapVal == 2) {
        setState(col, row, 'noop')
      } else {
        console.error(LEVEL);
        throw "Loading error."
      }
    }
  }

  for (var i = 0; i < LEVEL['turns'].length; i++) {
    var x = LEVEL['turns'][i][0];
    var y = LEVEL['turns'][i][1];
    traverse(x, y);
  }
}

function parseLevelPresets() {
  var maps4 = [];
  for (var k = 0, l = PRESETS.length; k < l; k++) {
    const preset = PRESETS[k];
    const level = [];
    for (var m = 0, l2 = preset.length; m < l2; m++) {
      if (preset[m] == 'o') level.push(o)
      else level.push(0);
    }
    maps4.push(level);
  }
  return maps4;
}

function generateLevel() {
  var maps4 = parseLevelPresets();

  var map = maps4[levelNumToPreset(currentLevelNum)[1]];

  var size = Math.sqrt(map.length) | 0;

  do {
    var turns = [];

    for (var i = 0; i < 3; i++) {
      while(true){
        var x = Math.floor(Math.random() * size) | 0;
        var y = Math.floor(Math.random() * size) | 0;
        var t = '' + x + ',' + y;
        if (turns.indexOf(t) < 0 && map[x + y * size] != o) {
          turns.push(t);
          break;
        }
      }
    }

    for (var i = 0, l = turns.length; i < l; i++) {
      var xy = turns[i].split(',');
      turns[i] = [xy[0] | 0, xy[1] | 0];
    }

    LEVEL = {
      "gridSize": size,
      "turns": turns,
      "map": map
    };

  } while(checkSolution() == true);
}

function gridClickHandler(e) {
  var xy = getXYFromData(e.target);
  if (getState(xy[0], xy[1]) === 'noop') return;

  if($(e.target).hasClass('hint')) {
    $(e.target).removeClass('hint');
    $(e.target).off('click');
  }

  traverse(xy[0], xy[1]);

  if (checkSolution()) {
    if (isOnBoarding) {
      setTimeout(onboardingStepCompleteHandler, 800);
    } else {
      setTimeout(levelCompleteHandler, 800);
    }
  } else {
    JSInterface.levelStateUpdate(getStateSnapshot());
  }
}

function levelCompleteHandler() {
  playWinAnimation();
  JSInterface.levelEnded();

  currentLevelNum += 1;

  setTimeout(presentCurrentLevel, 500);

}

function restart() {
  load(LEVEL);

  if (typeof window.isOnBoarding === 'undefined' || !window.isOnBoarding ) {
    JSInterface.levelRestart();
  }
}

function playWinAnimation() {
  var winEl = $('<div class="win"><img src="win.svg" /></div>').appendTo($('body'));
  // $('#win').show();
  var anims = ['bounceIn', 'bounceInUp', 'zoomInUp', 'fadeInRight', 'fadeInUp', 'zoomInUp', 'slideInUp'];

  function cleanAnimClasses() {
    winEl.removeClass('animated');
    for (var k = 0, l = anims.length; k < l; k++) winEl.removeClass(anims[k]);
  }

  cleanAnimClasses();

  winEl.addClass('animated');
  winEl.addClass(anims[(Math.random()*anims.length) | 0]);

  function fadeOut() {
    winEl.addClass('fadeOut');
    winEl.addClass('animated');
    winEl.off('animationend', completeFadeout);
  }

  function completeFadeout() {
    cleanAnimClasses();
    winEl.off('animationend');
    winEl.remove();
  }
  function completeAnimation() {
    cleanAnimClasses();
    winEl.off('animationend', completeAnimation);
    setTimeout(fadeOut, 50)
  }

  winEl.off('animationend');
  winEl.on('animationend', completeAnimation);
  setTimeout(function(){winEl.remove();}, 2000);
}

function newLevelHandler() {
  logMsg(`${$('body').width()}`)
  logMsg(`${$('body').height()}`)
  $("#level .wrapper").empty();
  $("#level .wrapper").append(buildGrid(LEVEL['gridSize'], LEVEL['gridSize']));
  $("#level").width(LEVEL['gridSize'] * ($('.grid').width() + 12) + 'px');
  $("#level").height(LEVEL['gridSize'] * ($('.grid').width() + 12) + 'px');
  load(LEVEL);
}

function showHint(skipHandler) {
  restart();

  for (var i = 0, l = LEVEL.turns.length; i < l; i++) {
    const turn = LEVEL.turns[i];
    $(`#xy-${turn[0]}-${turn[1]}`).addClass('hint');
  }

  disableNonHintTiles();
  $('#restartBtn').off('click');

  if (!skipHandler) JSInterface.hintShown();
}

function setup(regen) {
  if (regen) {
    generateLevel();
    newLevelHandler();
  }

  $('.grid').on('click', gridClickHandler);

  enableButton($('#restartBtn'));
  enableButton($('#newLevelBtn'));
  enableButton($('#hintBtn'));
  enableButton($('#colorBtn'));

  $('#restartBtn').off('click');
  $('#newLevelBtn').off('click');
  $('#hintBtn').off('click');
  $('#colorBtn').off('click');

  $('#restartBtn').on('click', () => { restart(); });
  $('#newLevelBtn').on('click', () => { teardown(); setup(true); JSInterface.onLevelReloaded(); });
  $('#hintBtn').on('click', startHintFlow);
  $('#colorBtn').on('click', changeColors);
}

function teardown() {
  $('.grid').off('click');
  $('#restartBtn').off('click');
  $('#newLevelBtn').off('click');
  $('#hintBtn').off('click');
  $('#hintArrow').off('click');

  $('#colorBtn').off('click', changeColors);

  $("#level .wrapper").empty();
}

function gameInit() {
  JSInterface.gameLoaded();
  // generateLevel();
  // console.log(LEVEL);
  // console.log(getStateSnapshot());
  // start(getStateSnapshot());
  startFirstGame();
}

function startHintFlow() {
  $('#hintBtn').off('click');
  // JSInterface.hintTapped();
  showHint();
}

$(document).ready(gameInit);


// Public Interface
function start(rawState) {
  // if (!rawState) {
  //   startOnboarding();
  // } else {

  //    var state = JSON.parse(rawState);

  //    if (state.isOnBoarding) {
  //      startOnboarding();
  //    } else {
  //      setColor(state.colorScheme, true);
  //      LEVEL = state.level;
  //      currentLevelNum = state.currentLevelNum;
  //      teardown();
  //      newLevelHandler();
  //      setup(false);
  //      for (var col = 0; col < LEVEL['gridSize']; col++){
  //        for (var row = 0; row < LEVEL['gridSize']; row++){
  //          setState(col, row, state['currentGrid'][LEVEL['gridSize'] * row + col]);
  //        }
  //      }
  //      JSInterface.levelStarted();
  //    }
  // }
  // JSInterface.levelStateUpdate(getStateSnapshot());
     var state = rawState;

      //  setColor(state.colorScheme, true);
       LEVEL = state.level;
       currentLevelNum = state.currentLevelNum;
      //  teardown();
       newLevelHandler();
       setup(false);
       for (var col = 0; col < LEVEL['gridSize']; col++){
         for (var row = 0; row < LEVEL['gridSize']; row++){
           setState(col, row, state['currentGrid'][LEVEL['gridSize'] * row + col]);
         }
       }
       JSInterface.levelStarted();
  JSInterface.levelStateUpdate(getStateSnapshot());
}


var currentLevelNum = 1;

function startFirstGame() {
  JSInterface.onboardingEnded();
  presentCurrentLevel();
}

function presentCurrentLevel() {
  teardown();
  setup(true);
  JSInterface.levelStarted();
  JSInterface.levelStateUpdate(getStateSnapshot());
}

function getStateSnapshot() {
  let state = {
    'isOnBoarding': isOnBoarding,
    'colorScheme': getCurrentColor(),
    'level': JSON.parse(JSON.stringify(LEVEL)),
    'currentLevelNum': currentLevelNum,
    'currentGrid': new Array(LEVEL['gridSize'] * LEVEL['gridSize'])
  };

  for (var col = 0; col < LEVEL['gridSize']; col++){
    for (var row = 0; row < LEVEL['gridSize']; row++){
      state['currentGrid'][LEVEL['gridSize'] * row + col] = getState(col, row);
    }
  }
  return JSON.stringify(state);
}


function levelNumToPreset(num) {
  var counter = 0;
  for (var i = 0, i1 = PRESETS.length; i < i1; i++) {
    const p = PRESETS[i];
    for (var j = 0; j < LEVELS_COUNT_VS_PRESETS[i]; j++) {
      counter += 1;
      if (counter == num) {
        return [p, i, j];
      }
    }
  }
}

function getBeautifulLevelNum(num) {
  var pij = levelNumToPreset(num)
  return `${pij[1]+1} - ${i+1}`;
}

function showHintDismissed() {
  $('#hintBtn').on('click', startHintFlow);
}
