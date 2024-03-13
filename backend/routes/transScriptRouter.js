const router = require('express').Router();
const fs = require('fs');
const generateTranscript = require('../controller/transcriptController');
const qna = require('../controller/qnaController');


router.route('/transcript').post(generateTranscript);
router.route('/qna').post(qna);

module.exports = router;