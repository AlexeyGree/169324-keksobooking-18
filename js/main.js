'use strict';

// pin constants
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
// pin constants
// card constants
var mapFilter = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// card constants

var getRandomElement = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomElements = function (arr) {
  var randomAmount = Math.round(Math.random() * (arr.length - 1));
  if (randomAmount === 0 || randomAmount === undefined) {
    randomAmount = Math.round(Math.random() * (arr.length - 1));
  }
  var values = [];
  for (var i = 0; i < randomAmount; i++) {
    var random = Math.round(Math.random() * (arr.length - 1));
    values.push(arr[random]);
    arr.splice(random, 1);
  }
  // if (values[0] === undefined) {
  //   debugger;
  // }
  return values;
};

var generatePins = function (amount) {
  var pins = [];
  for (var i = 0; i < amount; i++) {
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

// Удаляем пустые элементы li
var deleteEmptyFeature = function (features) {
  features.forEach(function (feature) {
    if (!feature.textContent) {
      feature.remove();
    }
  });
};
// Удаляем пустые элементы li

var generateFeature = function (pin, value) {
  var feature;
  switch (value) {
    case 'wifi':
      feature = pin.querySelector('.popup__feature--wifi').textContent = 'wifi';
      break;
    case 'dishwasher':
      feature = pin.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
      break;
    case 'parking':
      feature = pin.querySelector('.popup__feature--parking').textContent = 'parking';
      break;
    case 'washer':
      feature = pin.querySelector('.popup__feature--washer').textContent = 'washer';
      break;
    case 'elevator':
      feature = pin.querySelector('.popup__feature--elevator').textContent = 'elevator';
      break;
    case 'conditioner':
      feature = pin.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
      break;
    default:
      break;
  }
  return feature;
};

var generatePhoto = function (pin, value) {
  var photoCardBox = pin.querySelector('.popup__photos');
  var photoCard = document.createElement('img');
  photoCard.src = value;
  photoCard.classList.add('popup__photo');
  photoCard.width = 45;
  photoCard.height = 40;
  photoCard.alt = 'Фотография жилья';

  photoCardBox.appendChild(photoCard);
};

var renderCard = function (firstPin) {
  var currentCard = cardTemplate.cloneNode(true);
  var features = currentCard.querySelectorAll('.popup__feature');
  currentCard.querySelector('.popup__title').textContent = firstPin.offer.title;
  currentCard.querySelector('.popup__text--address').textContent = firstPin.offer.address;
  currentCard.querySelector('.popup__text--price').textContent = firstPin.offer.price + '₽/ночь';
  // Выбираем тип жилья 1 из 4
  switch (firstPin.offer.type) {
    case 'flat':
      currentCard.querySelector('.popup__type').textContent = 'Квартира';
      break;

    case 'bungalo':
      currentCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;

    case 'house':
      currentCard.querySelector('.popup__type').textContent = 'Дом';
      break;

    case 'palace':
      currentCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
    default:
      break;
  }
  // Выбираем тип жилья 1 из 4

  currentCard.querySelector('.popup__text--capacity').textContent = firstPin.offer.rooms + ' комнаты для ' + firstPin.offer.guests + ' гостей';
  currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + firstPin.offer.checkin + ', выезд до ' + firstPin.offer.checkout;

  // Добавляем особенности
  for (var i = 0; i < firstPin.offer.features.length; i++) {
    generateFeature(currentCard, firstPin.offer.features[i]);
  }
  deleteEmptyFeature(features);
  // Добавляем особенности

  currentCard.querySelector('.popup__description').textContent = firstPin.offer.description;

  // Добавляем фото
  for (var j = 0; j < firstPin.offer.photos.length; j++) {
    generatePhoto(currentCard, firstPin.offer.photos[j]);
  }
  currentCard.querySelectorAll('.popup__photo')[0].remove();
  // Добавляем фото

  currentCard.querySelector('.popup__avatar').src = firstPin.author.avatar;

  return currentCard;
};

var addCard = function (pinsCollection) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(pinsCollection[0]));

  return map.insertBefore(fragment, mapFilter);
};

addPins(pins);
addCard(pins);
map.classList.remove('map--faded');
