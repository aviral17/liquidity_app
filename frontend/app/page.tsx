"use client";
import { useState, useEffect } from "react";
import SliderControl from "../components/SliderControl";
import ChartDisplay from "../components/ChartDisplay";

export default function Home() {
  const [pct, setPct] = useState(95);
  const [day, setDay] = useState(10);
  const [data, setData] = useState<{ day: number; value: number }[]>([]);
  const [hist, setHist] = useState<number[]>([]);

  useEffect(() => {
    fetch(`/api/metrics?percentile=${pct}&day=${day}`)
      .then((r) => r.json())
      .then((json) => {
        setData(
          json.daily_pct.map((v: number, i: number) => ({ day: i, value: v }))
        );
        setHist(json.dist);
      });
  }, [pct, day]);

  return (
    <div className="p-4 space-y-6">
      <SliderControl
        label="Percentile"
        min={50}
        max={99}
        value={pct}
        onChange={setPct}
      />
      <SliderControl
        label="Day"
        min={0}
        max={100}
        value={day}
        onChange={setDay}
      />
      <ChartDisplay lineData={data} histData={hist} day={day} />
    </div>
  );
}
