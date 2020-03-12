#!/bin/sh
cd /Users/apple/Documents/gitgarden/Blog-NodeJs/node-blog/logs
cp access.log $(date +%d-%m-%Y).access.log
echo "" > access.log