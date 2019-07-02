#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

function listener() {
  rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
      let pub = rosNode.advertise('/response', std_msgs.String);
      let count = 1;
      
      let sub = rosNode.subscribe('/chatter', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I heard: [' + data.data + ']');
          const msg = new std_msgs.String();
          msg.data = 'response ' + count;
          // Log through stdout and /rosout
          rosnodejs.log.info('I said: [' + msg.data + ']');
          pub.publish(msg);
          ++count;
        }
      );
    });
}

if (require.main === module) {
  listener();
}