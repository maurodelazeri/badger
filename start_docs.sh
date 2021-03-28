#!/bin/bash
cd /home/zinnion/
mc config host add minio https://storage.zinnion.com $MINIO_ACCESS_KEY $MINIO_SECRET_KEY
mc cp minio/app/$PKG.tar.gz .
tar -zxvf $PKG.tar.gz
#npm i docsify-cli -g
npm install http-server -g
http-server --port 8080 docs/ >> /dev/stdout 2>&1
#docsify serve docs --port 7070 >> /dev/stdout 2>&1
