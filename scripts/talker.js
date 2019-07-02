#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

function talker() {
  rosnodejs.initNode('/talker_node')
    .then((rosNode) => {
      // Create ROS publisher on the 'chatter' topic with String message
      let pub = rosNode.advertise('/chatter', std_msgs.String);
      let count = 0;
      const msg = new std_msgs.String();
      // Define a function to execute every 100ms
      setInterval(() => {
        msg.data = 'hello world ' + count;
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info('I said: [' + msg.data + ']');
        ++count;
      }, 1000);
    });
}

if (require.main === module) {
  // Invoke Main Talker Function
  talker();
}