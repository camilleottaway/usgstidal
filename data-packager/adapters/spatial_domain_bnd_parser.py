from scipy.io import loadmat
import json
import copy
import numpy as np
import math


def parse_spatial_domain_bnd(filepath):

  x = open(filepath, 'r')

  data = []  # output

  i = 0
  for line in x:
    
    if(i > 0 ):
      point = line.split(", ")
      lat = float(point[0])
      lon = float(point[1])
      point = [lon, lat, 0]
      data.append(point)  # push the point into our set
    i+=1
  #print(data)    
  return data