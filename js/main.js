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
var TypeOfApartment = {
  PALACE: 'Дворец',
  HOUSE: 'Дом',
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало'
};
// card constants
var isPageActive = false;
var housingFilters = map.querySelectorAll('.map__filter');
var housingFeatures = map.querySelectorAll('input[name=features]');
var mapPinMain = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var adForm = notice.querySelector('.ad-form');
var adFormAvatarBlock = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var adFormAddress = adForm.querySelector('input[name=address]');
var roomsNumber = notice.querySelector('#room_number');
var guestsNumber = notice.querySelector('#capacity');
var MAX_ROOM = 100;
var WITHOUT_GUESTS = 0;

var getRandomElement = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// Проверка на наличие одинаковых элементов
var checkAvailable = function (element, array) {
  for (var i = 0; i < array.length; i++) {
    if (element === array[i]) {
      array.splice(i, 1);
      return 1;
    }
  }
  return 0;
};
// Проверка на наличие одинаковых элементов

var getRandomElements = function (arr) {
  var elementsClone = [];
  var totalElements = [];
  var counter = 1;
  var randomAmount = getRandomNumberInRange(1, arr.length);

  for (var i = 0; i < arr.length; i++) {
    elementsClone.push(arr[i]);
  }
  for (var j = 0; j < randomAmount; j++) {
    var random = Math.round(Math.random() * (arr.length - counter));
    totalElements.push(elementsClone[random]);
    counter += checkAvailable(totalElements[j], elementsClone);
  }

  return totalElements;
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

var getFeatures = function (card, features) {
  var featuresBox = card.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + features[i]);
    feature.textContent = features[i];
    fragment.appendChild(feature);
  }
  return featuresBox.appendChild(fragment);
};

var getPhotos = function (card, photos) {
  var photoCardBox = card.querySelector('.popup__photos');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoCard = document.createElement('img');
    photoCard.src = photos[i];
    photoCard.classList.add('popup__photo');
    photoCard.width = 45;
    photoCard.height = 40;
    photoCard.alt = 'Фотография жилья';

    fragment.appendChild(photoCard);
  }
  return photoCardBox.appendChild(fragment);
};

var renderCard = function (advert) {
  var currentCard = cardTemplate.cloneNode(true);
  var features = currentCard.querySelectorAll('.popup__feature');
  currentCard.querySelector('.popup__title').textContent = advert.offer.title;
  currentCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  currentCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  // Выбираем тип жилья 1 из 4
  currentCard.querySelector('.popup__type').textContent = TypeOfApartment[advert.offer.type.toUpperCase()];
  // Выбираем тип жилья 1 из 4

  currentCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  // Добавляем особенности

  deleteEmptyFeature(features);
  getFeatures(currentCard, advert.offer.features);

  // Добавляем особенности

  currentCard.querySelector('.popup__description').textContent = advert.offer.description;

  // Добавляем фото

  currentCard.querySelectorAll('.popup__photo')[0].remove();
  getPhotos(currentCard, advert.offer.photos);

  // Добавляем фото

  currentCard.querySelector('.popup__avatar').src = advert.author.avatar;

  return currentCard;
};

var addCard = function (advertsCollection) {
  return map.insertBefore(renderCard(advertsCollection[0]), mapFilter);
};

// Отключаем фильтры и поля форм
var disableElements = function (elements) {
  elements.forEach(function (element) {
    element.disabled = true;
    element.style.cursor = 'default';
  });
};

var disableForms = function () {
  disableElements(housingFilters);
  disableElements(housingFeatures);
  adFormAvatarBlock.disabled = true;
  adFormAvatarBlock.style.cursor = 'default';
  disableElements(adFormElements);
};

disableForms();
// Отключаем фильтры и поля форм

// Включаем фильтры и поля форм
var enableElements = function (elements) {
  elements.forEach(function (element) {
    element.disabled = false;
    element.style.cursor = 'pointer';
  });
};

// Включаем фильтры и поля форм

// Активируем главный экран
var activeScreen = function () {
  if (!isPageActive) {
    isPageActive = true;
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableElements(housingFilters);
    enableElements(housingFeatures);
    adFormAvatarBlock.disabled = false;
    adFormAvatarBlock.style.cursor = 'pointer';
    enableElements(adFormElements);
  }
};
// Активируем главный экран

// Высчитываем координаты для адреса
var writeAddress = function (state) {
  if (state) {
    return Math.round(mapPinMain.offsetLeft + (mapPinMain.clientWidth / 2)) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.clientHeight);
  }

  return Math.round(mapPinMain.offsetLeft + (mapPinMain.clientWidth / 2)) + ', ' + Math.round(mapPinMain.offsetTop + (mapPinMain.clientHeight / 2));
};
// Высчитываем координаты для адреса

// Адрес при неативном экране
adFormAddress.value = writeAddress(isPageActive);
// Адрес при неативном экране

// Активируем главный экран
mapPinMain.addEventListener('mousedown', function () {
  activeScreen();
  adFormAddress.value = writeAddress(isPageActive);
});

mapPinMain.addEventListener('keydown', function () {
  activeScreen();
  adFormAddress.value = writeAddress(isPageActive);
});
// Активируем главный экран

// Сравниваем значения полей
var matchRoomsAndGuests = function () {
  var rooms = +roomsNumber.value;
  var guests = +guestsNumber.value;
  if (rooms < guests || rooms === MAX_ROOM && guests !== WITHOUT_GUESTS) {
    return guestsNumber.setCustomValidity('Ошибка: Количество гостей не может быть больше количества комнат!');
  } else {
    return guestsNumber.setCustomValidity('');
  }
};

matchRoomsAndGuests();

roomsNumber.addEventListener('change', function () {
  matchRoomsAndGuests();
});

guestsNumber.addEventListener('change', function () {
  matchRoomsAndGuests();
});
// Сравниваем значения полей

// Включены чтобы travis не ругался
if (isPageActive) {
  addPins(pins);
  addCard(pins);
}
// Включены чтобы travis не ругался
