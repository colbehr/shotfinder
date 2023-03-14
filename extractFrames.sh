#!/bin/bash
echo "What video do you want to convert?"
read video
name="${video%.*}"
ffmpeg -skip_frame nokey -i "$video" -vsync vfr -frame_pts true -vf "select='not(mod(n,10))'"  "$name"-%02d.png