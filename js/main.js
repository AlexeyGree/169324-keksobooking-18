'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var offerParams = {
  TITLE: ['Квартира 1', 'Квартира 2', 'Квартира 3', 'Квартира 4'],
  PRICE: [500, 700, 900, 1100, 1300],
  TYPE: ['palace', 'flat', 'house', 'bungalo'],
  ROOMS: [1, 2, 3, 4],
  GUESTS: [0, 1, 2, 3, 4, 5, 6],
  TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTION: ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};
var yCord = {
  MIN: 130,
  MAX: 630
};
var numberOfRooms = {
  MIN: 1,
  MAX: 4
};
var numberofGuests = {
  MIN: 0,
  MAX: 10
};
var PINS_AMOUNT = 8;

var getRandomElement = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomElements = function (arr) {
  var random = Math.round(Math.random() * (arr.length - 1));
  var values = [];
  for (var i = 0; i < random; i++) {
    values.push(arr[random]);
  }
  return values;
};

var generatePins = function (amount) {
  var pins = [];
  // var photoCounter = []; Другой вариант проверки уже выбранной аватарки
  for (var i = 0; i < amount; i++) {
    // var avatarNumber = '0' + (i + 1);

    // photoCounter.push(photoNum); Другой вариант проверки уже выбранной аватарки
    // for (var j = 0; j < PINS_AMOUNT; j++) {
    //   if (photoNum === undefined) {
    //     photoNum = '01';
    //   }
    //   if (photoNum === offerParams.AVATAR[j]) {
    //     offerParams.AVATAR.splice(j, 1);
    //   }
    // }
    var x = getRandomNumberInRange(0, mapPins.clientWidth);
    var y = getRandomNumberInRange(yCord.MIN, yCord.MAX);
    var pin = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': getRandomElement(offerParams.TITLE),
        'address': x + ', ' + y,
        'price': getRandomElement(offerParams.PRICE),
        'type': getRandomElement(offerParams.TYPE),
        'rooms': getRandomNumberInRange(numberOfRooms.MIN, numberOfRooms.MAX),
        'guests': getRandomNumberInRange(numberofGuests.MIN, numberofGuests.MAX),
        'checkin': getRandomElement(offerParams.TIMES),
        'checkout': getRandomElement(offerParams.TIMES),
        'features': getRandomElements(offerParams.FEATURES),
        'description': getRandomElement(offerParams.DESCRIPTION),
        'photos': getRandomElements(offerParams.PHOTOS)
      },

      'location': {
        'x': x,
        'y': y
      }
    };
    pins.push(pin);
  }
  return pins;
};

var pins = generatePins(PINS_AMOUNT);

var renderPin = function (pin) {
  var currentPin = pinTemplate.cloneNode(true);
  var image = currentPin.querySelector('img');

  currentPin.style.left = pin.location.x + 'px';
  currentPin.style.top = pin.location.y + 'px';
  currentPin.style.transform = 'translateX(-25px) translateY(-70px)';
  image.src = pin.author.avatar;
  image.alt = pin.offer.title;

  return currentPin;
};

var addPins = function (pinsCollection) {
  var fragment = document.createDocumentFragment();
  pinsCollection.forEach(function (pin) {
    fragment.appendChild(renderPin(pin));
  });

  return mapPins.appendChild(fragment);
};

addPins(pins);
map.classList.remove('map--faded');
