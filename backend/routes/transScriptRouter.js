const router = require('express').Router();
const fs = require('fs');
const generateTranscript = require('../controller/transcriptController');
const qna = require('../controller/qnaController');


router.route('/transcript').get(generateTranscript);
router.route('/qna').get(qna);

module.exports = router;