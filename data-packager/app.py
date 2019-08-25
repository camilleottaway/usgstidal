import sys
import json
import os
import time
from process_manifest import processManifest
from api_handler import setConfig

apikey = None
apiurl = None
sleepInterval = None
workingDirectory = None

loopForever = True

if (len(sys.argv) != 2):
  print("Missing directory to watch. Call program with a directory to watch like this \"data-watcher.py /path/to/files\"")
  exit()
else:
  workingDirectory = sys.argv[1]


with open(os.path.join(os.path.dirname(__file__), 'config.json')) as json_file:
    data = json.load(json_file)
    apikey = data.get("apikey")
    apiurl = data.get("apiurl")
    setConfig(apikey, apiurl)
    if data.get("sleepInterval"):
      sleepInterval = int(data.get("sleepInterval"))
    else:
      loopForever = False

if not apikey or not apiurl:
  print("Missing API key or API url. Fill out config.json to get this setup")
  exit()

if loopForever:
  while (1):
    processManifest(workingDirectory, apiurl, apikey)
    print("Will check again in " + str(sleepInterval) + " seconds.")
    time.sleep(sleepInterval)
else:
  processManifest(workingDirectory, apiurl, apikey)
