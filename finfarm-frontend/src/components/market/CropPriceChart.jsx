import PropTypes from 'prop-types';

import { timeFormat } from 'd3-time-format';
import { timeMonday } from 'd3-time';
import { ResponsiveLine } from '@nivo/line';

CropPriceChart.propTypes = {
  data: PropTypes.array,
};

const formatDate = timeFormat('%Y-%m-%d');

export default function CropPriceChart({ data }) {
  const dataWithDate = data.map((series) => ({
    ...series,
    data: series.data.map((d) => ({
      ...d,
      x: new Date(d.x),
    })),
  }));

  return (
    <ResponsiveLine
      data={dataWithDate}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      xFormat="time:%Y-%m-%d"
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 40,
        legend: '기간',
        legendOffset: 50,
        legendPosition: 'middle',
        truncateTickAt: 0,
        tickValues: 'every 100 days',
        format: formatDate,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '가격 (원)',
        legendOffset: -50,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      enableGridX={false}
      enableGridY={false}
      colors="#84cc16"
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.5}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
