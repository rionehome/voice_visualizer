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

var msg_history = [];
rosnodejs.initNode('/visualizer')
    .then((rosNode) => {
      let sub = rosNode.subscribe('/sound_system/log/heard', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I heard: [' + data.data + ']');
          var message_data = {
            id: 'other-message',
            msg_data: data.data
          }
          msg_history.push(message_data);
          io.emit('message', message_data);  // 送信
        }
      );
      let sub2 = rosNode.subscribe('/sound_system/log/spoke', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I spoke: [' + data.data + ']');
          var message_data = {
            id: 'message',
            msg_data: data.data
          }
          msg_history.push(message_data);
          io.emit('message', message_data);  // 送信
        }
      );

      io.on('connection', (socket) => {
        console.log('connected');
        io.emit('message_update', msg_history);
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