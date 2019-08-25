import csv
import json

# Takes the data from a location's CSV file and stores it in a JSON file
# Handles wind observation data!

# obsData
# fileNames  : noaaID_wind_obs.csv
#   time     : YYYY-MM-DD hh:mm:ss+00:00
#   direction: wind direction [deg]
#   gusts    : wind gusts [m/s]
#   speed    : wind speed [m/s] 

# Note: speed is in m/s, when displayed in graph it is converted to mph

def parse_wind_obs_csv(filePath) :
    csvfile = open(filePath, 'r')
    data = [] # output
    fieldnames = ("time", "direction", "gusts", "speed")
    reader = csv.DictReader(csvfile, fieldnames)

    next(reader)

    return [row for row in reader]      
   