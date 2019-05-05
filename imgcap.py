import cv2
import numpy as np
import requests
import os

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

img_counter = 0

while True:
    ret, frame = cam.read()
    cv2.imshow("test", frame)
    if not ret:
        break
    k = cv2.waitKey(1)

    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE pressed
        # Changed so that saves to same file -> go slow
        img_name = "opencv_frame_{}.png".format(img_counter)
        cv2.imwrite(img_name, frame)
        print("{} written!".format(img_name))

        files = {'file': open(img_name, 'rb')}
        requests.post('http://localhost:8088/api/Upload/', files=files)

cam.release()

cv2.destroyAllWindows()
