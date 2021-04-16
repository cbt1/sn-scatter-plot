import getMajorTicks from './major';
import getMinorTicks from './minor';

export default function getTicks({ layoutModel, dockModel, size, min, max }) {
  const majorTicks = getMajorTicks({
    layoutModel,
    dockModel,
    size,
    min,
    max,
  });

  const minorTicks = getMinorTicks({
    majorTicks,
    count: 1,
  });

  // generate an array of tick objects following the format defined by picasso
  const ticks = [
    ...majorTicks.map((value) => ({ value, isMinor: false })),
    ...minorTicks.map((value) => ({ value, isMinor: true })),
  ].sort((a, b) => a.value - b.value);

  return ticks;
}