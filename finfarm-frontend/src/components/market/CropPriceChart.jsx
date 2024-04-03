import PropTypes from 'prop-types';

import { timeFormat } from 'd3-time-format';
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';

CropPriceChart.propTypes = {
  data: PropTypes.array,
};

const formatDate = timeFormat('%Y-%m-%d'); // 날짜 포맷
const currencyFormat = (value) => `${value.toLocaleString()}₩`; // 원화 포맷

export default function CropPriceChart({ data }) {
  const [formatDateData, setFormatDateData] = useState([]);
  useEffect(() => {
    const dataWithDate = data.map((series) => ({
      ...series,
      data: series.data.map((d) => ({
        ...d,
        x: new Date(d.x),
      })),
    }));
    setFormatDateData(dataWithDate);
  }, [data]);

  return (
    <ResponsiveLine
      data={formatDateData}
      margin={{ top: 10, right: 30, bottom: 100, left: 70 }}
      xScale={{
        format: '%Y-%m-%d',
        precision: 'day',
        type: 'time',
        useUTC: false,
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      xFormat="time:%Y-%m-%d"
      yFormat={(value) => currencyFormat(value)}
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 40,
        legend: '기간',
        legendOffset: 70,
        legendPosition: 'middle',
        truncateTickAt: 0,
        format: formatDate,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '가격 (원)',
        legendOffset: -60,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      enableGridX
      enableGridY
      colors="#84cc16"
      lineWidth={3}
      enablePoints={false}
      areaOpacity={0.5}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      enablePointLabel={true}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
    />
  );
}
