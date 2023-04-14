var express = require('express');
var EnglishWords = require('an-array-of-english-words');
var router = express.Router();

const makeWordList = (answerLength) => {
  return EnglishWords.filter(d => (/^[a-z]*$/.test(d) && d.length === answerLength));
}

const makeAnswer = (wordList) => {
  const n = Math.floor(Math.random() * wordList.length);
  return wordList[n];
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to React Word Game service' });
});


router.get('/answer', (req, res) => {
  const length = parseInt(req.query.length);
  if (!isNaN(length)) {
    const wordList = makeWordList(length);
    res.send(makeAnswer(wordList));
  } else {
    throw new Error("Could not parse number parameter");
  }
});

router.get('/checkGuess', (req, res) => {
  const guess = req.query.guess;
  const length = guess.length;
  if (!isNaN(length)) {
    const wordList = makeWordList(length);
    res.send(wordList.includes(guess));
  } else {
    res.send(false);
  }
});



module.exports = router;
