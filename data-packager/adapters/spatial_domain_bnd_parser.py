from scipy.io import loadmat
import json
import copy
import numpy as np
import math
import pylab as pl

def parse_spatial_domain_bnd(filepath):

  x = open(filePath, 'r')

  data = []  # output

  for line in x:
    point = line.split(", ")
    data.append(point)  # push the point into our set
          
  return data