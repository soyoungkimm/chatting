const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  renderMain, renderRoom, createRoom, enterRoom, removeRoom, sendChat, sendGif,
} = require('../controllers');

const router = express.Router();

router.get('/', renderMain); // main

router.get('/room', renderRoom); // room 생성 페이지 render

router.post('/room', createRoom); // create

router.get('/room/:id', enterRoom); // 방 들어감

// router.delete('/room/:id', removeRoom); // 방 삭제

router.post('/room/:id/chat', sendChat); // 채팅 보냄

module.exports = router;
