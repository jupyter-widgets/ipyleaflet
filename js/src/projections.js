require('proj4leaflet');

function getProjection(proj) {
  if (proj.custom === false) {
    return L.CRS[proj.name]
  } else {
    return new L.Proj.CRS(
    proj.name,
    proj.proj4def,
    proj.options
    )
  }
}
