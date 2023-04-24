const router = require('express').Router();
const fs = require('fs');
const generateTranscript = require('../controller/transcriptController');
const qna = require('../controller/qnaController');
const chat = require('../controller/chatController');


router.route('/transcript').post(generateTranscript);
router.route('/qna').get(qna);
router.route("/chat").get(chat);

module.exports = router;