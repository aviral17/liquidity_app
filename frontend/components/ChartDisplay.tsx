import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface Props {
  lineData: { day: number; value: number }[];
  histData: number[];
  day: number;
}

const ChartDisplay: FC<Props> = ({ lineData, histData, day }) => {
  const histBins = histData.map((v, i) => ({ bin: i, value: v }));
  return (
    <>
      <LineChart width={600} height={300} data={lineData} className="mb-6">
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" stroke="blue" />
      </LineChart>
      <BarChart width={600} height={200} data={histBins}>
        <XAxis dataKey="bin" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </>
  );
};

export default ChartDisplay;
