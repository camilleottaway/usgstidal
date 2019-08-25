mkdir -p $HOME/usr
wget "https://nodejs.org/dist/v10.14.1/node-v10.14.1-linux-x64.tar.xz"
tar xf node-v10.14.1-linux-x64.tar.xz 
cp -r ./node-v10.14.1-linux-x64 $HOME/usr
wget "https://download.docker.com/linux/ubuntu/dists/zesty/pool/stable/amd64/docker-ce_17.06.0~ce-0~ubuntu_amd64.deb"
dpkg -x docker-ce_17.06.0~ce-0~ubuntu_amd64.deb $HOME
echo 'for d in ~/usr/*/bin; do PATH="$d:$PATH"; done' >>~/.bash_profile
echo 'for d in ~/usr/*/bin; do PATH="$d:$PATH"; done' >>~/.bashrc
source ~/.bash_profile
source ~/.bashrc
rm node-v10.14.1-linux-x64.tar.xz
rm -rf node-v10.14.1-linux-x64
rm docker-ce_17.06.0~ce-0~ubuntu_amd64.deb