var isOnBoarding = false, onboardingStep = 1;


function startOnboarding() {
  isOnBoarding = true;
  JSInterface.onboardingStarted();
  runOnboardingStep1();
}

function runOnboardingStep1() {
  LEVEL = {
    "gridSize": 5,
    "turns": [[1,1], [3,3]],
    "map": [0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
          ]
  };
  newLevelHandler();
  showHint(true);
  setup();

  disableButton($('#restartBtn'));
  disableButton($('#newLevelBtn'));
  disableButton($('#hintBtn'));
  disableButton($('#colorBtn'));

  disableNonHintTiles();
}

function runOnboardingStep2() {
  onboardingStep = 2;
  LEVEL = {
    "gridSize": 4,
    "turns": [[0,0], [3,3], [3,0]],
    "map": [0,0,0,0,
            0,o,o,0,
            0,o,o,0,
            0,0,0,0]
  };
  newLevelHandler();
  // showHint(true);

  setup();

  $('#hintBtn').off('click');

  disableButton($('#restartBtn'));
  disableButton($('#newLevelBtn'));
  disableButton($('#colorBtn'));

  enableButton($('#hintBtn'));

  $('#hintArrow').show();
  $('#hintBtn, #hintArrow').on('click', () => {
    showHint(true);
    $('#hintArrow').hide();
    $('#hintArrow').off('click');
    disableNonHintTiles();
  });
  // $('#hintArrow').on('click', () => $('#hintBtn').click());
}

function onboardingStepCompleteHandler() {
  teardown();
  if (onboardingStep == 1) {
    presentOnBoardingSplash1();
  } else if (onboardingStep == 2) {
    isOnBoarding = false;
    onboardingStep = 1;

    startFirstGame();
  }
}

function presentOnBoardingSplash1() {
  $('#onboardingSplash1').show();
  $('#onboardingSplash1Next').show();

  $('#onboardingSplash1Next').on('click', () => {
    $('#onboardingSplash1').hide();
    $('#onboardingSplash1Next').hide();
    runOnboardingStep2();
  });
}
