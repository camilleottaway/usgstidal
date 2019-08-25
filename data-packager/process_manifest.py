import os
import json

from api_handler import postManifest
import data_parser

def getManifest(workingDirectory):
    print("Checking " + workingDirectory + " For manifest.json")
    manifestPath = os.path.join(workingDirectory, 'manifest.json')
    if (os.path.isfile(manifestPath)):
        print("Found manifest.json, starting parse...")
        manifest = None
        with open(manifestPath) as json_file:
            manifest = json.load(json_file)
        return manifest

    else:
        print("Did not find manifest.json in " + manifestPath)
        return False


def processManifest(workingPath, apiurl, apikey):
    manifest = getManifest(workingPath)
    if not manifest:
        return
    # Set IDs for data
    id = 0
    for site in manifest['SpatialDomains']:
        site['id'] = id
        id += 1

    for site in manifest['PointLocations']:
        site['id'] = id
        id += 1

    postManifest(manifest)

    # For SpatialDomains
    print("Starting SpatialDomains parse...")
    for site in manifest['SpatialDomains']:
        print("Parsing Site " + site["siteDisplayName"])
        data_parser.parseSpatialSite(site, workingPath)
        
    print("Starting PointLocations parse...")        
    for site in manifest['PointLocations']:
        print("Parsing Site " + site["siteDisplayName"])
        data_parser.parsePointLocations(site, workingPath)

    return
