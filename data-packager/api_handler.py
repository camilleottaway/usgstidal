import requests
import json

APIKEY = None
APIURL = None

def setConfig(key, url):
  global APIKEY
  global APIURL
  APIKEY = key
  APIURL = url

def postManifest(manifest):
  requests.post(APIURL + "/manifest", json=manifest,
                headers={"Authorization": APIKEY})
  
def postSiteData(id, dataType, data):
  requests.post(APIURL + "/site/" + str(id) + "/" + dataType, json=data,
                headers={"Authorization": APIKEY})
