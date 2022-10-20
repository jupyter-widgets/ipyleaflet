import { IJupyterLabPageFixture, test } from '@jupyterlab/galata';
import { expect } from '@playwright/test';
import * as path from 'path';
const klaw = require('klaw-sync');


const filterUpdateNotebooks = item => {
  const basename = path.basename(item.path);
  return basename.includes('_update');
}

const testCellOutputs = async (page: IJupyterLabPageFixture, tmpPath: string, theme: 'JupyterLab Light' | 'JupyterLab Dark') => {
  const paths = klaw(path.resolve(__dirname, '../notebooks'), {filter: item => !filterUpdateNotebooks(item), nodir: true});
  const notebooks = paths.map(item => path.basename(item.path));

  const contextPrefix = theme == 'JupyterLab Light' ? 'light_' : 'dark_';
  page.theme.setTheme(theme);

  for (const notebook of notebooks) {
    let results = [];

    await page.notebook.openByPath(`${tmpPath}/${notebook}`);
    await page.notebook.activate(notebook);

    let numCellImages = 0;

    const getCaptureImageName = (contextPrefix: string, notebook: string, id: number): string => {
      return `${contextPrefix}-${notebook}-cell-${id}.png`;
    };

    await page.notebook.runCellByCell({
      onAfterCellRun: async (cellIndex: number) => {
        const cell = await page.notebook.getCellOutput(cellIndex);
        if (cell) {
          const map = await cell.$("div.leaflet-container");

          if (map) {
            await new Promise((_) => setTimeout(_, 1000));

            // Move the mouse to the center of the map
            const bb = await map.boundingBox();
            if (bb) {
              await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
            }
          }

          results.push(await cell.screenshot());
          numCellImages++;
        }
      }
    });

    await page.notebook.save();

    for (let c = 0; c < numCellImages; ++c) {
      expect(results[c]).toMatchSnapshot(getCaptureImageName(contextPrefix, notebook, c));
    }

    await page.notebook.close(true);
  }
}

test.describe('ipyleaflet Visual Regression', () => {
  test.beforeEach(async ({ page, tmpPath }) => {
    await page.contents.uploadDirectory(
      path.resolve(__dirname, '../notebooks'),
      tmpPath
    );
    await page.filebrowser.openDirectory(tmpPath);
  });

  test('Light theme: Check ipyleaflet renders', async ({
    page,
    tmpPath,
  }) => {
    await testCellOutputs(page, tmpPath, 'JupyterLab Light');
  });

  test('Dark theme: Check ipyleaflet renders', async ({
    page,
    tmpPath,
  }) => {
    await testCellOutputs(page, tmpPath, 'JupyterLab Dark');
  });
});
