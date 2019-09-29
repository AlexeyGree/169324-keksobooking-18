'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mockData = {
  AVATAR: ['01', '02', '03', '04', '05', '06', '07', '08'],
  TITLE: ['Квартира 1', 'Квартира 2', 'Квартира 3', 'Квартира 4'],
  ADDRESS: 'x, y',
  PRICE: [500, 700, 900, 1100, 1300],
  TYPE: ['palace', 'flat', 'house', 'bungalo'],
  ROOMS: [1, 2, 3, 4],
  GUESTS: [0, 1, 2, 3, 4, 5, 6],
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTION: ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  Y_MIN: 130,
  Y_MAX: 630
};

var getRandomElement = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getRandomElementInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomArray = function (arr) {
  var random = Math.round(Math.random() * (arr.length - 1));
  var finalArray = [];
  for (var i = 0; i < random; i++) {
    finalArray.push(arr[random]);
  }
  return finalArray;
};

var generatePins = function (pinsAmount) {
  var arr = [];
  // var photoCounter = []; Другой вариант проверки уже выбранной аватарки
  for (var i = 0; i < pinsAmount; i++) {
    var photoNum = getRandomElement(mockData.AVATAR);
    // photoCounter.push(photoNum); Другой вариант проверки уже выбранной аватарки
    for (var j = 0; j < mockData.AVATAR.length; j++) {
      if (photoNum === undefined) {
        photoNum = '01';
      }
      if (photoNum === mockData.AVATAR[j]) {
        mockData.AVATAR.splice(j, 1);
      }
    }
    var x = getRandomElementInRange(0, mapPins.clientWidth);
    var y = getRandomElementInRange(mockData.Y_MIN, mockData.Y_MAX);
    var pin = {
      'author': {
        'avatar': 'img/avatars/user' + photoNum + '.png'
      },

      'offer': {
        'title': getRandomElement(mockData.TITLE),
        'address': x + ', ' + y,
        'price': getRandomElement(mockData.PRICE),
        'type': getRandomElement(mockData.TYPE),
        'rooms': getRandomElement(mockData.ROOMS),
        'guests': getRandomElement(mockData.GUESTS),
        'checkin': getRandomElement(mockData.CHECKIN),
        'checkout': getRandomElement(mockData.CHECKOUT),
        'features': getRandomArray(mockData.FEATURES),
        'description': getRandomElement(mockData.DESCRIPTION),
        'photos': getRandomArray(mockData.PHOTOS)
      },

      'location': {
        'x': x,
        'y': y
      }
    };
    arr.push(pin);
  }
  return arr;
};

var PINS_AMOUNT = 8;
var pins = generatePins(PINS_AMOUNT);

var renderPin = function (pin) {
  var currentPin = pinTemplate.cloneNode(true);

  currentPin.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px; transform: translateX(-25px) translateY(-70px);');
  currentPin.querySelector('img').setAttribute('src', pin.author.avatar);
  currentPin.querySelector('img').setAttribute('alt', pin.offer.title);

  return currentPin;
};

var addPins = function (pinsArr) {
  var fragment = document.createDocumentFragment();
  pinsArr.forEach(function (pin) {
    fragment.appendChild(renderPin(pin));
  });

  return mapPins.appendChild(fragment);
};

addPins(pins);
map.classList.remove('map--faded');
