import { Link, useMatch } from 'react-router-dom';
import { Tab, Tabs } from './ChartLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { fetchCoinOhlcDay14 } from '../api';
import { useQuery } from 'react-query';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface ChartProps {
  coinID: string;
}
type IOhlcDay14 = number[];

function ChartCandle({coinID}: ChartProps) {
  const {isLoading, data} = useQuery<IOhlcDay14[]>(["14daysOhlc", coinID], () => fetchCoinOhlcDay14(coinID), {refetchInterval: 1000*60*60});
  const chartLineMatch = useMatch("/:coinID/chart_line");
  const chartCandleMatch = useMatch("/:coinID/chart_candle");
  const dailyOhlcPrices = data?.map(item  => {
    return {
      x: new Date(item[0]),
      y: [Number(item[1].toFixed(3)), Number(item[2].toFixed(3)), Number(item[3].toFixed(3)), Number(item[4].toFixed(3))]
    }
  }) as {x: Date; y: number[]}[];
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <Tabs>
        <Tabs>
          <Tab isActive={chartLineMatch !== null}>
            <Link to={`/${coinID}/chart_line`}>
              <span>LineChart</span>
              <FontAwesomeIcon icon={faChartLine} />
            </Link>
          </Tab>
          <Tab isActive={chartCandleMatch !== null}>
            <Link to={`/${coinID}/chart_candle`}>
              <span>CandleStickChart</span>
              <FontAwesomeIcon icon={faChartColumn} />
            </Link>
          </Tab>
        </Tabs>
      </Tabs>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <ReactApexChart
            type="candlestick"
            series={[
              {
                name: "price",
                data: dailyOhlcPrices,
              },
            ]}
            options={{
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: true,
                },
                background: "transparent",
              },
              theme: {
                mode: "dark",
              },
              xaxis: {
                type: "datetime",
                title: {
                  text: "Date",
                  style: {
                    color: isDark ? "white" : "#004d40"
                  },
                },
                axisTicks: {
                  show: true
                },
                tooltip: {
                  enabled: true
                },
                labels: {
                  style: {
                    colors: isDark ? "white" : "#004d40"
                  }
                },
                axisBorder: {
                  show: true,
                  color: isDark ? "white" : "#004d40"
                },
              },
              yaxis: {
                title: {
                  text: "Dollar",
                  style: {
                    color: isDark ? "white" : "#004d40"
                  }
                },
                labels: {
                  style: {
                    colors: [isDark ? "white" : "#004d40"]
                  }
                }
              },
              grid: {
                column: {
                  colors: ["yellow", "aqua"],
                  opacity: 0.1,
                },
              },
              tooltip: {
                y: {
                  formatter: value => `$ ${value}`
                }
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default ChartCandle;