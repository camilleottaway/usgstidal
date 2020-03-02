import os

from adapters.wave_mat_parser import parse_wave_mat
from adapters.wind_mat_parser import parse_wind_mat


from api_handler import postSiteData
# TODO: have to implement these in their .py files!

from adapters.water_pred_csv_parser import parse_water_pred_csv
from adapters.water_obs_csv_parser import parse_water_obs_csv
from adapters.wind_pred_csv_parser import parse_wind_pred_csv
from adapters.wind_obs_csv_parser import parse_wind_obs_csv 

# dictionary of supported parsers.
parserCatalog = {
    "wind": {
      ".mat": parse_wind_mat
    },
    "wave": {
      ".mat": parse_wave_mat
    },    
     "tidepred": {
      ".csv": parse_water_pred_csv
    },
    "tideobs": {
      ".csv": parse_water_obs_csv
    },
    "windpred": {
      ".csv": parse_wind_pred_csv
    },
    "windobs": {
      ".csv": parse_wind_obs_csv
    },
    "areawindpressure": {
      ".mat": parse_wind_mat
    }
}

def parsePointLocations(site, workingPath):
  data = {}
  for file in site['data']:
    print("    Uploading " + file['fileName'] + " " * (30 - len( file['fileName'])), end='')
    p = getParser(file['dataType'], file['dataFormat'])
    path = os.path.join(workingPath, file['fileName'])
    
    if os.path.exists(path):
      postSiteData(site['id'], file['dataType'], p(path))
      print(u'\u2713')
    else:
      print("Can't find file " + path)
      print("For site " + site['siteDisplayName'])

  return data


def parseSpatialSite(site, workingPath):
  data = {}
  for file in site['data']:
    print("    Uploading " + file['fileName'] + " " * (30 - len( file['fileName'])), end='')
    p = getParser(file['dataType'], file['dataFormat'])
    path = os.path.join(workingPath, file['fileName'])
    
    if os.path.exists(path):      
      postSiteData(site['id'], file['dataType'], p(path, site['NEpoint'], site['SWpoint']))
      print(u'\u2713')
    else:
      print("Can't find file " + path)
      print("For site " + site['siteDisplayName'])

  return data

def parseAreaWindPressure(site, workingPath):
  data = {}
  for file in site['data']:
    print("    Uploading " + file['fileName'] + " " * (30 - len( file['fileName'])), end='')
    p = getParser(file['dataType'], file['dataFormat'])
    path = os.path.join(workingPath, file['fileName'])
    
    if os.path.exists(path):      
      postSiteData(site['id'], file['dataType'], p(path, site['NEpoint'], site['SWpoint']))
      print(u'\u2713')
    else:
      print("Can't find file " + path)
      print("For site " + site['siteDisplayName'])

  return data

def printSupportedDataTypes():
  print("Supported Types are: ")
  for key in parserCatalog:
    print(key)

def printSupportedDataFormats(dataType):
  print("Supported Types for " + dataType + " are")
  for key in parserCatalog[dataType]:
    print(key)


def getParser(dataType, dataFormat):
  
  dataType = dataType.lower()
  dataFormat = dataFormat.lower()

  dataTypeParsers = parserCatalog.get(dataType)
  if dataTypeParsers == None:
    print("no parser found for datatype: " + dataType)
    printSupportedDataTypes()
    return None

  parser = dataTypeParsers.get(dataFormat)
  if parser == None:
    print("no parser found for datatype: " + dataType + " in format: " + dataFormat)
    printSupportedDataFormats(dataType)
    return None

  return parser
  
def parse(site):
  parser = getParser(site.dataType, site.dataFormat)
  return parser(site.fileName)
