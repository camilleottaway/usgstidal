import csv
import json

# Takes the data from a location's CSV file and stores it in a JSON file
# Handles wind prediction data!

# predData
# fileNames  : noaaID_wind_pred.csv
#   time     : YYYY-MM-DD hh:mm:ss
#   direction: wind direction [deg]
#   speed    : wind speed [m/s] 

# Note: speed is in m/s, when displayed in graph it is converted to mph

def parse_wind_pred_csv(filePath) :
    csvfile = open(filePath, 'r')
    data = [] # output
    fieldnames = ("time", "direction", "speed")
    reader = csv.DictReader(csvfile, fieldnames)

    next(reader)

    return data      
       