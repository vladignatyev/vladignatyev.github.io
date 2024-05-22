
function setColor(scheme, skipHandler) {
  if (scheme && scheme != 0) {
    $('body').addClass('scheme');
    $('body').addClass(`scheme-${scheme}`);
  }
  else {
    $('body').removeClass('scheme');
    $('body').removeClass('scheme-1');
    $('body').removeClass('scheme-2');
    $('body').removeClass('scheme-3');
  }

  if (!skipHandler) JSInterface.levelStateUpdate(getStateSnapshot());
}

function changeColors() {
  if (!$('body').hasClass('scheme')) {
    setColor(1);
  } else if ($('body').hasClass('scheme-1')) {
    setColor();
    setColor(2);
  } else if ($('body').hasClass('scheme-2')) {
    setColor();
    setColor(3);
  } else if ($('body').hasClass('scheme-3')) {
    setColor();
  }

  JSInterface.colorChanged();
}

function getCurrentColor() {
  if (!$('body').hasClass('scheme')) {
    return 0;
  } else if ($('body').hasClass('scheme-1')) {
    return 1;
  } else if ($('body').hasClass('scheme-2')) {
    return 2;
  } else if ($('body').hasClass('scheme-3')) {
    return 3;
  }
}
