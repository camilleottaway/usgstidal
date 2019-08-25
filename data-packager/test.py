
import json
from adapters import wave_mat_parser

data = wave_mat_parser.parse_wave_mat("./datafolder/skagitWave.mat", [48.237028, -122.646067], [48.457131, -122.323115])

with open('wave.json', 'w') as outfile:
    json.dump(data, outfile)
