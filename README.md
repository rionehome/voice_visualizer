# voice visualizer
this is a sample code for visualize result of voice recognition and response


![Screenshot from 2019-07-04 12-01-46](https://user-images.githubusercontent.com/36945685/64902611-4da49f80-d6e5-11e9-9753-ca9d44842514.png)

## setup
```
$ cd ~/catkin_ws/src
$ git clone https://github.com/rionehome/voice_visualizer.git
$ cd ./voice_visualizer
$ npm install
```

## run

```
#terminal A (main server)
$ roslaunch voice_visualizer node_sample.launch
```

open your web browser(http://localhost:3000) and run 
```
#terminal C
$ rostopic pub /sound_system/log/heard std_msgs/String "data: 'hello1'" -1
```

## Node
**`name` /visualizer**

### Subscribe Topic

* **`/sound_system/log/heard`** 音声認識結果（ std_msgs/String ）

* **`/sound_system/log/spoke`** 発話ログ ( std_msgs/String )


### Publish Topic
* **`/order_input`** 手入力文字列（ std_msgs/String ）