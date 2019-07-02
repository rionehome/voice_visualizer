# rosnodejs sample

## setup
```
$ cd ~/catkin_ws/src
$ git clone https://github.com/nakano16180/rosnodejs_sample.git
$ cd ~/catkin_ws && catkin_make
```

## run
example1
```
#terminal A
$ roscore

#terminal B
$ rosrun rosnodejs_sample talker.js

#terminal C
$ rosrun rosnodejs_sample listener.js
```

example2
```
#terminal A
$ roslaunch rosnodejs_sample node_sample.launch

#terminal B
$ roslaunch rosnodejs_sample sample_response.launch
```

open your web browser and run 
```
#terminal C
$ rostopic pub /chatter std_msgs/String "data: 'hello1'" -1
```
