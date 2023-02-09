function getRandomPin() {
  var date = String(new Date().valueOf());

  var strNumber = date[date.length - 2] + date[date.length - 1];

  var temp = String(Math.floor(Number(strNumber) * Math.random() * 100) + 9);

  if (temp < 100) {
    if (temp < 10) {
      return "00" + temp;
    } else {
      return "0" + temp;
    }
  } else {
    return temp;
  }
}

module.exports = getRandomPin;
