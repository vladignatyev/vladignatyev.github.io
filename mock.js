const logMsg = (msg) => console.log(msg)

var JSInterface = window.JSInterface || { // Mock
  gameLoaded: function() {logMsg('gameLoaded')},        // +
  onboardingStarted: function() {logMsg('onboardingStarted')}, // +
  // onboardingInterrupt: function() {logMsg('call')},
  onboardingEnded: function() {logMsg('onboardingEnded')}, // +
  onLevelReloaded: function() {},
  colorChanged: function() {},
  levelRestart: function() {},
  levelStarted: function() {logMsg('levelStarted')}, // +
  levelStateUpdate: function(newState) {logMsg('levelStateUpdate')}, // TODO:
  levelEnded: function(newState) {logMsg('levelEnded')},  // TODO:
  turnMade: function(newState) {logMsg('turnMade')},
  hintTapped: function(newState) {logMsg('hintTapped')}, // +
  hintShown: function(newState) {logMsg('hintShown')}, // +
  // promoTapped: function(newState) {logMsg('promoTapped')},
  // promoShown: function(newState) {logMsg('promoShown')},
  // promoEnded: function(newState) {logMsg('promoEnded')},
  // iapTapped: function(newState) {logMsg('iapTapped')},
  // trackEvent: function(eventName, eventArg) {logMsg('trackEvent')}
  // onboardingInterrupt: function() {logMsg('call')},
};
