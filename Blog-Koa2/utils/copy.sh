#!/bin/sh
cd /Users/mac/Documents/gitgarden/Blog-NodeJs/Blog-Node/logs
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "" > access.log