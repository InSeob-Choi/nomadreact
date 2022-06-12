import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`
export const Tab = styled.div<{isActive: boolean}>`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  padding: 2px 0;
  font-size: 12px;
  span {
    display: none;
  }
  a {
    display: block;
  }
`

interface ChartProps {
  coinID: string;
}
interface IHistoricalData {
  market_caps: [number, number][];
  prices: [number, number][];
  total_volumes: [number, number][];
}

function ChartLine({coinID}: ChartProps) {
  const {isLoading, data} = useQuery<IHistoricalData>(["14days", coinID], () => fetchCoinHistory(coinID), {refetchInterval: 1000*60*60});
  const dailyPrices = data?.prices.map(item => Number(item[1].toFixed(3))) as number[];
  const chartLineMatch = useMatch("/:coinID/chart_line");
  const chartCandleMatch = useMatch("/:coinID/chart_candle");
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
            type="line"
            series={[
              {
                name: "price",
                data: dailyPrices,
              },
            ]}
            options={{
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                zoom: {
                  enabled: false
                },
                background: "transparent",
              },
              theme: {
                mode: "dark",
              },
              xaxis: {
                title: {
                  text: "Days before",
                  style: {
                    color: isDark ? "white" : "#004d40"
                  },
                },
                axisTicks: {
                  show: false
                },
                tooltip: {
                  enabled: false
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
                categories: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
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
              },
              stroke: {
                curve: "smooth"
              }
            }}
          />
        )}
      </div>
    </>
  );
}

export default ChartLine;