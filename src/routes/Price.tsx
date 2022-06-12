import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinInfo } from '../api';
import { InfoDataProps } from './Coin';

const Loader = styled.span`
text-align: center;
display: block;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.3);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: color 0.2s;
  &:hover {
    color: #ff7e7e;
  }
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

interface ChartProps {
  coinID: string;
}

function Price({coinID}: ChartProps) {
  const {isLoading, data} = useQuery<InfoDataProps[]>(["info", coinID], () => fetchCoinInfo(coinID), {refetchInterval: 1000*60*60});

  return (
    <>
      {isLoading ? <Loader>Loading...</Loader> : (
        <>
          <Overview style={{marginTop: "16px"}}>
            <OverviewItem>Highest Price (24H)</OverviewItem>
            <OverviewItem>$ {data && data[0].high_24h}</OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>Lowest Price (24H)</OverviewItem>
            <OverviewItem>$ {data && data[0].low_24h}</OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>Price Change (24H)</OverviewItem>
            <OverviewItem>{data && data[0].price_change_24h.toString()[0] === "-" ? `- $ ${Number(data[0].price_change_24h.toString().slice(1)).toFixed(3)}` : (data && `+ $ ${data[0].price_change_24h.toFixed(3)}`)}</OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>Price Change Percentage (24H)</OverviewItem>
            <OverviewItem>{data && data[0].price_change_percentage_24h.toString()[0] === "-" ? `- ${Number(data[0].price_change_percentage_24h.toString().slice(1)).toFixed(3)}%` : (data && `+ ${data[0].price_change_percentage_24h.toFixed(3)}%`)}</OverviewItem>
          </Overview>
        </>
      )}
    </>
  )
}

export default Price;