import csv
import json

# Takes the data from a location's CSV file and stores it in a JSON file
# Handles water observation data!

# obsData
# fileNames  : noaaID_twlobs.csv
#   #        : unnamed ID field 
#   time     : YYYY-MM-DD hh:mm:ss
#   twlObs   : total (?) water level [ft/mllw]


def parse_water_obs_csv(filePath):

    csvfile = open(filePath, 'r')
    data = [] # output
    fieldnames = ("#", "time", "twlObs")
    reader = csv.DictReader(csvfile, fieldnames)

    next(reader)

    return [row for row in reader]
