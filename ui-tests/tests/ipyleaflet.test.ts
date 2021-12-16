import { galata, IJupyterLabPageFixture, test } from "@jupyterlab/galata";
import { expect } from "@playwright/test";

async function renderMap(fileName: string, page: IJupyterLabPageFixture) {
  const fullName = `./${fileName}.ipynb`;
  await page.notebook.openByPath(fullName);
  await page.notebook.activate(fullName);
  await page.notebook.run();
  await page.notebook.waitForRun();
  const maps = await page.$("div.leaflet-container");
  await new Promise((_) => setTimeout(_, 1000));
  expect(await maps.screenshot()).toMatchSnapshot({
    name: `${fileName}.png`,
  });
}

const notebookList = [
  "DivIcon",
  "DrawControl",
  "FullScreenControl",
  "Icon",
  "LayersControl",
  "LegendControl",
  "MagnifyingGlass",
  "Marker",
  "Polyline",
  "Popup",
  "ScaleControl",
  "SplitMapControl",
  "TileLayer",
  "WidgetControl",
  "ZoomControl",
];

test.describe("ipyleaflet Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    page.setViewportSize({ width: 1920, height: 1080 });
  });
  for (const name of notebookList) {
    test(`Render ${name}`, async ({ page }) => {
      await renderMap(name, page);
    });
  }
});
