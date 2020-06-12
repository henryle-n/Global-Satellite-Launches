#!/bin/sh

git add .
git commit -am %1
git push
echo Press Enter...
read