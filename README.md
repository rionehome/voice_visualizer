# voice visualizer
this is a sample code for visualize result of voice recognition and response

## setup
```
$ cd ~/catkin_ws/src
$ git clone https://github.com/rionehome/voice_visualizer.git
$ cd ~/catkin_ws && catkin_make
```

## run

```
#terminal A (main server)
$ roslaunch voice_visualizer node_sample.launch

#terminal B
$ roslaunch voice_visualizer sample_response.launch
```

open your web browser(http://localhost:3000) and run 
```
#terminal C
$ rostopic pub /chatter std_msgs/String "data: 'hello1'" -1
```

## Node
**`name` /visualizer**

### Subscribe Topic

* **`/sound_system/log/heard`** 音声認識結果（ std_msgs/String ）

* **`/sound_system/log/spoke`** 発話ログ ( std_msgs/String )


### Publish Topic
