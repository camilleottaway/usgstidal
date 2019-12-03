# Dependences 
#### Node.js (for development)
https://nodejs.org/en/


### Python 3 (serverside code)
https://www.python.org/downloads/


### Docker
https://www.docker.com/


# TODO
Add Python 3 setup

### Setup Task Board of some sort



### Implment Gzip (compression) for data

For Windows

From git repo ~\usgstidal (have python installed)
make a file called .env.development in ~\usgstidal\client
make two variables:
    REACT_APP_MAP_KEY=
    REACT_APP_API_URL=
assign the values found in the emails that Caleb sent over. I believe everyone was cc'ed in them but if not, let me know.

make a file called .env.production in ~\usgstidal\client
assign only one variable:
    REACT_APP_MAP_KEY=

From ~\usgstidal
npm install
pip install requests
pip install scipy

From a different terminal window
cd client
npm run build --prod
npm start

cd data-packager
app.py .\datafolder

From a different terminal window
cd server
npm start