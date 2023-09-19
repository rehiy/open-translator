import os
from easynmt import EasyNMT


EasyNMT(os.getenv('EASYNMT_MODEL', 'opus-mt'))
