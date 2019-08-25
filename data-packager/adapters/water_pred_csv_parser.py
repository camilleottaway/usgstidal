import csv
import json

# Takes the data from a location's CSV file and stores it in a JSON file
# Handles water prediction data!

# predData
# fileNames  : noaaID_twlpreds.csv
#   time     : YYYY-MM-DD hh:mm:ss
#   tidePred : tide predictions [ft/mllw]
#   ntr      : non-tidal residual [ft]
#   twlPred  : total (?) water level [ft/mllw]

def parse_water_pred_csv(filePath) :

    csvfile = open(filePath, 'r')
    data = [] # output
    fieldnames = ("time", "tidePred", "ntr", "twlPred")
    reader = csv.DictReader(csvfile, fieldnames)

    next(reader)

    return [row for row in reader]      
