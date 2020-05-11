require('proj4leaflet');

const EPSG3413 = new L.Proj.CRS(
    'EPSG:3413',
    '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 ' +
    '+ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
      origin: [-4194304, 4194304],
      resolutions: [
        8192.0,
        4096.0,
        2048.0,
        1024.0,
        512.0,
        256.0
      ],
      bounds: L.bounds([
        [-4194304, -4194304],
        [4194304, 4194304]
      ])
    }
  );

const EPSG3031 = new L.Proj.CRS(
    'EPSG:3031',
    '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 ' +
    '+ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
      origin: [-4194304, 4194304],
      resolutions: [
        8192.0,
        4096.0,
        2048.0,
        1024.0,
        512.0
      ],
      bounds: L.Bounds([
        [-4194304, -4194304],
        [4194304, 4194304]
      ])
    }
  );


export const LeaftProj = {
 'EPSG3857': 'EPSG3857',
 'EPSG3413': EPSG3413,
 'EPSG3031': EPSG3031
 };
