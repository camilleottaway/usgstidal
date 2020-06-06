
import json
from adapters import wind_mat_parser

data = wind_mat_parser.parse_wind_mat("./datafolder/hrdps_complete_wind.mat", [51.132, -113.016], [42.058, -130.988])

with open('areawindpressure.json', 'w') as outfile:
    json.dump(data, outfile)

