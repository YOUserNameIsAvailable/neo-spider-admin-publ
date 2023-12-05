# Description: Build script for the project

npm run build
rm -rf ../spiderAdminServer/src/main/resources/static/front/*
cp -r ./build/* ../spiderAdminServer/src/main/resources/static/front/