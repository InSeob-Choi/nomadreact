import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart  from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

export interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

type IMappedData = [number, number[]];

function Chart({coinId}: ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {refetchInterval: 10000}
  );

  // const mappedData = data?.map((price: IHistorical) => ({ // 방법 2
  //   x: price.time_open,
  //   y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]
  // })) as any;
  // console.log(mappedData);
  const mappedData = data?.map((price: IHistorical) => ( // 방법 1
    [new Date(price.time_open).getTime(), [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]]
  )) as IMappedData;

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{
            data: mappedData
          }] as unknown as number[]} // 왜 이걸 붙여주는지는 모르겠음.. 되긴 하는데..
          options={{
            chart: {
              height: 400,
              width: 500,
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            theme: {
              mode: isDark ? "dark" : "light"
            },
            stroke: {
              curve: "smooth",
              width: 3
            },
            grid: {
              show: false
            },
            yaxis: {
              show: false
            },
            xaxis: {
              axisTicks: {show: false},
              axisBorder: {show: false},
              labels: {show: false},
              type: "datetime",
              categories: data?.map(price => price.time_close)
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`
              }
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#DF7D46',
                  downward: '#3C90EB'
                },
                wick: {
                  useFillColor: true,
                }
              },
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;