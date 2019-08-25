import math

def procces_float(num, precision=3):
  if math.isnan(num):
    return None
  else:
    return round(num, precision)

def process_float_array(arr, precision=3):
  proccessed = []
  for num in arr:
    proccessed.append(procces_float(num))
  
  return proccessed
