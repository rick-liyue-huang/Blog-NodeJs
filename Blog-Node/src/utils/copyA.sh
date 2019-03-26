#!/bin/sh
cd /Users/liyue/Documents/gitgarden/Blog-NodeJs/logs
cp access.log $(date +%d-%m-%Y).access.log
echo "" > access.log