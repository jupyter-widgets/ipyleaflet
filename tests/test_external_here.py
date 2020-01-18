"""
This module contains tests for creating basemaps via HERE Location Services.

This module does not actually test single map tiles received via the
generated tiles URLs and TileLayer instances.
"""

from ipyleaflet.external.here import \
    basemaps, basemap_to_tiles, build_tiles_url, attribution


def test_build_tiles_url():
    url = build_tiles_url(app_code="foo", app_id="bar")
    assert "app_code=foo" in url and "app_id=bar" in url
    assert "apiKey=foo" in build_tiles_url(apikey="foo")


def test_basemap_to_tiles():
    b2t = basemap_to_tiles
    Default, Satellite = basemaps.Default, basemaps.Satellite
    assert b2t(Default).name == "HERE.normal.day"
    assert b2t(Satellite).name == "HERE.satellite.day"
    assert b2t(Satellite, config={"scheme": "satellite.night"}).name == "HERE.satellite.night"
    assert "foobar" in b2t(Default, config={"scheme": "foobar"}).url
    assert "apiKey=foo" in b2t(Default, config={"apikey": "foo"}).url
    assert "ls.hereapi.com" in b2t(Default, config={"apikey": "foo"}).url
    assert "api.here.com" in b2t(Default, config={"app_code": "foo", "app_id": "bar"}).url
    assert "lg=ita" in b2t(Satellite, config={"lg": "ita"}).url
    assert b2t(Default, config={"attribution": "foo"}).attribution == attribution
