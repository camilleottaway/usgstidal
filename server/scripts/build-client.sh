cd "$(dirname "$0")"
cd ../
rm -rf public
mkdir public
cd ../../client
npm run-script build
cp -r ./build ../server/data-web-api/public