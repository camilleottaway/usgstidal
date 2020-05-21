from scipy.io import loadmat
import json
import copy
import numpy as np
import math
from . import parse_helpers

windsamplesize = 5;

def parse_wave_mat(filepath, NEpoint, SWpoint, bounds):
  # hs - significant wave height, abbreviated as Hsig or H_sig most often. Units are meters. 1
  # tm - Mean wave period, abbrev is Tm typically. units seconds 1
  # dp - Mean wave direction [deg], you can use to create arrows 1
  # lat, lon 1
  # lat_limits,lon_limits - Extent of domain
  # lat_boundary, lon_boundary - More detailed boundary 

  # input from the file sean sent over
  x = loadmat(filepath)

  data = []  # output
  #grab lat, lon, tm, dp, hs points
  for i in range(0, len(x['lon'])):
      for j in range(0, len(x['lon'][i])):
          if not math.isnan(x['lat'][i][j]) and  not math.isnan(x['lon'][i][j]):
            point = []  # a given point on the map
            point.append(parse_helpers.procces_float(x['lon'][i][j].tolist(), 5))
            point.append(parse_helpers.procces_float(x['lat'][i][j].tolist(),5))
            # point.append(parse_helpers.process_float_array(x['tm'][i][j].tolist())[:3])
            if i % windsamplesize == 0 and j % windsamplesize == 0:
              point.append(parse_helpers.process_float_array(x['dp'][i][j].tolist()))
            else:
              point.append([])
            point.append(parse_helpers.process_float_array(x['hs'][i][j].tolist()))
            data.append(point)  # push the point into our set
  #get lat and lon limits
  #point["lat_limits"] = x['lat_limits'][0][0].tolist()
  #point["lon_limits"] = x['lon_limits'][0][0].tolist()
  #get lat and lon boudaries
  #point["lat_boundary"] = x['lat_boundary'][0][0].tolist()
  #point["lon_boundary"] = x['lon_boundary'][0][0].tolist()
  #data.append(point)

  return data
