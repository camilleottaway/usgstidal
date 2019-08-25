


# Docker Steps

### Build
```
docker build -t gcr.io/${PROJECT_ID}/usgstidal:v1 .
```
### Run


```
docker run -e usgstidalapiadminkey='PUTPASSWORDHERE' --rm -p 8080:8080 gcr.io/${PROJECT_ID}/usgstidal:v1
```
Where PUTPASSWORDHERE is the apikey.

### Deploy (google cloud)

```
kubectl run usgstidal-deploy-1 --image=gcr.io/${PROJECT_ID}/usgstidal:v1 --port 8080 -e usgstidalapiadminkey='PUTPASSWORDHERE'
```


# Setup

Set env var for admin privlages

```
export usgstidalapiadminkey="123"
```


# Inteface

TODO type out calls


# References

https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app