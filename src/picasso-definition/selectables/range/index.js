import createLegend from './legend';
import createXRange from './x-range';
import createYRange from './y-range';
import createBinXRange from './bin-x-range';
import createBinYRange from './bin-y-range';

const EMPTY = { components: [], interactions: [] };

export default function createRange({ models, actions, scales, chart }) {
  const {
    selectionService,
    dockService,
    colorService,
    layoutService,
    chartModel,
    qIsDirectQueryMode,
    qUnsupportedFeature,
  } = models;
  const isSingleSelection = layoutService.getHyperCubeValue('qDimensionInfo.0.qIsOneAndOnlyOne', false);
  if (isSingleSelection) {
    return { components: [], interactions: [] };
  }

  const legend = colorService.custom.legendComponents();

  const dataHandler = chartModel.query.getDataHandler();

  const isRangeSelectionsSupported = !qIsDirectQueryMode && !qUnsupportedFeature?.some((f) => f === 'rangeSelections');

  const xRange = isRangeSelectionsSupported
    ? createXRange({
        actions,
        selectionService,
        dockService,
        enableInteraction: () => !dataHandler.getMeta().isBinnedData,
      }) || EMPTY
    : EMPTY;

  const binXRange = isRangeSelectionsSupported
    ? createBinXRange({
        actions,
        selectionService,
        dockService,
        chart,
        enableInteraction: () => dataHandler.getMeta().isBinnedData,
      }) || EMPTY
    : EMPTY;

  const yRange = isRangeSelectionsSupported
    ? createYRange({
        actions,
        selectionService,
        dockService,
        enableInteraction: () => !dataHandler.getMeta().isBinnedData,
      }) || EMPTY
    : EMPTY;

  const binYRange = isRangeSelectionsSupported
    ? createBinYRange({
        actions,
        selectionService,
        dockService,
        chart,
        enableInteraction: () => dataHandler.getMeta().isBinnedData,
      }) || EMPTY
    : EMPTY;

  const legendRange =
    createLegend({
      actions,
      selectionService,
      scales,
      legend,
      enableInteraction: () => true,
    }) || EMPTY;

  return {
    components: [
      ...xRange.components,
      ...yRange.components,
      ...binXRange.components,
      ...binYRange.components,
      ...legendRange.components,
    ],
    interactions: [
      ...xRange.interactions,
      ...yRange.interactions,
      ...binXRange.interactions,
      ...binYRange.interactions,
      ...legendRange.interactions,
    ],
  };
}
