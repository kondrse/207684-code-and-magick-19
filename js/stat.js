
'use strict';

// Определение локальных констант
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var SUCCESS_TEXT_LINES = ['Ура вы победили!', 'Список результатов:'];
var barWidth = TEXT_WIDTH - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  var maxTime = getMaxElement(times);

  for (var j = 0; j < SUCCESS_TEXT_LINES.length; j++) {
    ctx.fillText(SUCCESS_TEXT_LINES[j], CLOUD_X + TEXT_WIDTH, CLOUD_Y + (j + 1) * (GAP + FONT_GAP), TEXT_WIDTH + (TEXT_WIDTH * (j + 1)));
  }

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';

    var playerHeight = (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillText(players[i], (CLOUD_X - barWidth + (TEXT_WIDTH + barWidth) * (i + 1)), CLOUD_HEIGHT, barWidth);
    ctx.fillText(Math.round(times[i]) + '', (CLOUD_X - barWidth + (TEXT_WIDTH + barWidth) * (i + 1)), CLOUD_HEIGHT - playerHeight - GAP - FONT_GAP - FONT_GAP, barWidth);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'blue';
    }

    ctx.fillRect((CLOUD_X - barWidth + (TEXT_WIDTH + barWidth) * (i + 1)), CLOUD_HEIGHT - FONT_GAP - GAP, barWidth, -playerHeight);
  }
};

