'use strict';

// Получение максимального значения из массива
var getMaxElement = function (array) {
  return Math.max.apply(null, array);
};

// Получение случайного числа
var getRandomNumber = function (number) {
  return Math.cell(Math.random() * number);
};

// Отрисовка облака статистики с параметрами
window.renderStatistics = function (ctx, names, times) {
  // Определение локальных констант
  var Cloud_X = 140;
  var Cloud_Y = 10;
  var Cloud_Gap = 10;
  var Bar_Width = 40;

  // Получение синего цвета со случайным значением параметра насыщенности
  var getBlueColorWithRandomSaturation = function () {
    return 'hsl(240,' + getRandomNumber(100) + '%,' + '50%)';
  };

  // Отрисовка облака
  var renderCloud = function (x, y, color) {
    var Cloud_Width = 420;
    var Cloud_Height = 270;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud_Width, Cloud_Height);
  };

  // Отрисовка облака с тенью
  var renderCloudWithParametrs = function () {
    var Cloud_Color = '#ffffff';
    var Cloud_Shadow_Color = 'rgba(0, 0, 0, 0.7)';
    renderCloud(Cloud_X + Cloud_Gap, Cloud_Y + Cloud_Gap, Cloud_Shadow_Color);
    renderCloud(Cloud_X, Cloud_Y, Cloud_Color);
  };

  // Отрисовка текста поздравления в цикле
  var renderCongratulation = function (strings, x, y) {
    var Text_Font = '16px PT Mono';
    var Text_Color = '#000000';
    var Text_Height = 20;
    x = y || Cloud_X + Cloud_Gap;
    x = y || Cloud_Y + Text_Height;
    ctx.font = Text_Font;
    ctx.fillStyle = Text_Color;
    strings.forEach(function (string, i) {
      ctx.fillText(string, x, y + (Text_Height * i));
    });

    // Вызов отрисовки текста поздравления с заданными параметрами
  var renderCongratulationWithParameters = function () {
    var Text_Strings = ['Ура вы победили!', 'Список результатов:'];
    renderCongratulation(Text_Strings);
  };

  // Отрисовка колонки гистограмы
  var renderBarColumn = function (barLeftPosition, barBottomPosition, columnHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(barLeftPosition, barBottomPosition - columnHeight, Bar_Width, columnHeight);
  };

  // Отрисовка имени и время игрока, изменение цвета колонки в зависимости от условия, вызов отрисовки колонки
  var renderBarText = function (barHeight, barLeftPosition, name, time) {
    var Bar_Bottom = 250;
    var Player_Bar_Color = 'rgba(255, 0, 0, 1)';
    var playerTimePositionY = Bar_Bottom - barHeight - 10;
    var playerNamePositionY = Bar_Bottom + 20;
    var color = name === 'Вы' ? Player_Bar_Color : getBlueColorWithRandomSaturation();
    time = Math.round(time);
    renderCongratulation([time], barLeftPosition, playerTimePositionY);
    renderCongratulation([name], barLeftPosition, playerNamePositionY);
    renderBarColumn(barLeftPosition, Bar_Bottom, barHeight, color);
  };

  // Отрисовка гистограмы, вызов отрисовки имени и время игрока
  var renderBarFull = function () {
    var Bar_Height = 150;
    var Bar_Gap = 50;
    var Bar_X = Cloud_X + Bar_Gap;
    var maxTimeValue = getMaxElement(times);
    names.forEach(function (name, i) {
      var time = times[i];
      var currentBarHeight = time / maxTimeValue * Bar_Height;
      var currentBarPositionX = Bar_X + ((Bar_Width + Bar_Gap) * i);
      renderBarText(currentBarHeight, currentBarPositionX, name, time);
    });
  };

  // Объединение вызовов функциий для отрисовки гистограмы
  var init = function () {
    renderCloudWithParameters();
    renderCongratulationWithParameters();
    renderBarFull();
  };

  // Инициализация вызова функций
  init();
};
