#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

var express = require("express");
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname))

rosnodejs.initNode('/visualizer')
    .then((rosNode) => {
      let sub = rosNode.subscribe('/sound_system/log/heard', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I heard: [' + data.data + ']');
          io.emit('other-message', data.data);  // 送信
        }
      );
      let sub2 = rosNode.subscribe('/sound_system/log/spoke', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I spoke: [' + data.data + ']');
          io.emit('message', data.data);  // 送信
        }
      );

      io.on('connection', (socket) => {
        console.log('connected');
        socket.on('message', (msg) => {
          console.log("from input: "+msg);
          io.emit('message', msg);
        });
      });
    
      http.listen(PORT, () => {
        console.log("Node.js is listening to PORT:" + PORT);
      });
    });

app.get("/", function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});