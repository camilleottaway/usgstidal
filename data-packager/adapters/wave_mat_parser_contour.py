from scipy.io import loadmat
import json
import copy
import numpy as np
import math
import pylab as pl
# from . import parse_helpers


def parse_wave_mat(filepath, NEPoint, SWPoint):
  # hs - significant wave height, abbreviated as Hsig or H_sig most often. Units are meters. 1
  # tm - Mean wave period, abbrev is Tm typically. units seconds 1
  # dp - Mean wave direction [deg], you can use to create arrows 1
  # lat, lon 1
  # lat_limits,lon_limits - Extent of domain
  # lat_boundary, lon_boundary - More detailed boundary 

  # input from the file sean sent over
  x = loadmat(filepath)
  allData = []
  for hour in range(48):
    day = []
    data = []
    for i in range(len(x['hs'])):
      c = []
      for j in range(len(x['hs'][0])):
        if math.isnan(x['hs'][i][j][hour]):
          c.append(None)
        else:
          c.append(x['hs'][i][j][hour])
      day.append(c)
    z = pl.contourf(x['lon'], x['lat'], day)

    
    for i in range(len(z.allsegs)):
      for l in range(len(z.allsegs[i])):
        if z.allsegs[i][l].size > 15:
          y = {}
          y['height'] = z.levels[i]
          y['shapes'] = z.allsegs[i][l]
          data.append(y)
    allData.append(data)
  return allData


class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """

    def default(self, obj):
        if isinstance(obj, (np.int_, np.intc, np.intp, np.int8,
                            np.int16, np.int32, np.int64, np.uint8,
                            np.uint16, np.uint32, np.uint64)):
            return int(obj)
        elif isinstance(obj, (np.float_, np.float16, np.float32,
                              np.float64)):
            return float(obj)
        elif isinstance(obj, (np.ndarray,)):  # This is the fix
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


if __name__ == "__main__":
  x = parse_wave_mat("data-packager/datafolder/bellinghamWave.mat",0,0)


  # formats JSON file nicely :)
  out = json.dumps(x, cls=NumpyEncoder)
  #print "water pred JSON parsed!"

  jsonfile = open('contour.json', 'w')
  jsonfile.write(out)
