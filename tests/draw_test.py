from concurrent.futures import Future
from playwright.sync_api import Page, Position
from IPython.display import display

from ipyleaflet import (
    Map,
    DrawControl,
)


def future_trait_change(widget, attribute, timeout=2000):
    future = Future()

    def on_change(change):
        value = change["new"]
        future.set_result(value)

    widget.observe(on_change, attribute)
    return future


def test_draw_basics(solara_test, page_session: Page, assert_solara_snapshot):
    # this all runs in process, which only works with solara
    # also, this test is only with pure ipywidgets
    center = [34.6252978589571, -77.34580993652344]
    zoom = 10

    m = Map(center=center, zoom=zoom)

    dc = DrawControl(
        marker={"shapeOptions": {"color": "#0000FF"}},
        rectangle={"shapeOptions": {"color": "#00FF00"}},
        circle={"shapeOptions": {"color": "#FF0000"}},
        circlemarker={},
    )
    m.add(dc)

    display(m)

    last_draw_future = future_trait_change(dc, "last_draw")

    # click around to create a rectangle
    leaflet = page_session.locator(".leaflet-container")
    leaflet.locator(".leaflet-draw-draw-polygon").click()
    leaflet.wait_for()
    x_offset = 200
    leaflet.click(position=Position(x=x_offset + 100, y=100))
    page_session.wait_for_timeout(100)  # too fast, and it removes to wrong point
    leaflet.click(position=Position(x=x_offset + 200, y=100))
    page_session.wait_for_timeout(100)
    leaflet.click(position=Position(x=x_offset + 300, y=150))  # lets remove this
    page_session.wait_for_timeout(100)
    leaflet.locator("text=Delete last point").click()
    leaflet.click(position=Position(x=x_offset + 200, y=200))
    page_session.wait_for_timeout(100)
    leaflet.click(position=Position(x=x_offset + 100, y=200))
    leaflet.locator("text=Finish").click()

    # solara runs in a different thread, so we can block the pytest thread
    last_draw = last_draw_future.result(timeout=1)
    assert last_draw["type"] == "Feature"
    geometry = last_draw["geometry"]
    coordinates = geometry["coordinates"]
    assert len(coordinates) == 1
    assert len(coordinates[0]) == 5
    assert len(coordinates[0][0]) == 2
    assert coordinates[0][0] == coordinates[0][-1]
    assert coordinates[0][0] != coordinates[0][1]
