from scipy.io import loadmat
import json
import copy
from . import parse_helpers
import math
# I found the following info by using python Debugging. Sean also describes this format in his email.
# u - wind velocity in the eastward dir[m/s]
# v - wind velocity in the northward dir[m/s]
# slp - sea level pressure[Pa]
# lat, lon - locations of grid, note they are not uniformly spaced
# forecast_date - A string with the forecast initialization date, UTC
# forecast_hour - {0, 6, 12, 18} hour of the date the forecast began


def parse_wind_mat(filepath, NEPoint, SWPoint):

  x = loadmat(filepath)

  data = []  # output

  for i in range(0, len(x['lon'])):
      for j in range(0, len(x['lon'][0])):
          if not math.isnan(x['lat'][i][j]) and not math.isnan(x['lon'][i][j]) and  NEPoint[0] > x['lat'][i][j] > SWPoint[0] and  SWPoint[1] < x['lon'][i][j] < NEPoint[1]: 
              point = {}  # a given point on the map
              point["lon"] = x['lon'][i][j]
              point["lat"] = x['lat'][i][j]
              point["u"] = parse_helpers.process_float_array(x['u'][i][j].tolist())
              point["v"] = parse_helpers.process_float_array(x['v'][i][j].tolist())
              data.append(point)  # push the point into our set
          
  return data
