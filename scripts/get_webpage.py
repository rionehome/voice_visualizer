#!/usr/bin/env python
#encoding: utf8

import rospy 
import os
import qrcode
from PIL import Image

def kill():
    os.system("kill -KILL " + str(os.getpid()))

rospy.init_node("create_link")

address = os.environ["ROS_MASTER_URI"]
add_sp = address.split(":")
add_sp[-1] = "3000"
page_link = ":".join(add_sp)
print page_link

img = qrcode.make(page_link)
img.show()


rospy.on_shutdown(kill)

rospy.spin()