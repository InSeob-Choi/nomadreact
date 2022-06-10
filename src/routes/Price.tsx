import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from '../api';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`

const PriceTitle = styled.span`
  flex: 60%;
  padding-left: 30px;
`

const PriceItem = styled.span`
  flex: 40%;
  color: ${props => props.theme.priceColor};
`

interface PriceProps {
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

function Price({coinId}: PriceProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
  );

  return (
    <div>
      <Container>
        <PriceTitle>Opening price</PriceTitle>
        <PriceItem>$ {data ? data[14]?.open.toFixed(3) : null}</PriceItem>
      </Container>
      <Container>
        <PriceTitle>Highest price</PriceTitle>
        <PriceItem>$ {data ? data[14]?.high.toFixed(3) : null}</PriceItem>
      </Container>
      <Container>
        <PriceTitle>Lowest price</PriceTitle>
        <PriceItem>$ {data ? data[14]?.low.toFixed(3) : null}</PriceItem>
      </Container>
      <Container>
        <PriceTitle>Closing price</PriceTitle>
        <PriceItem>$ {data ? data[14]?.close.toFixed(3) : null}</PriceItem>
      </Container>
      <Container>
        <PriceTitle>Total quantity</PriceTitle>
        <PriceItem>{data ? data[14]?.volume : null}</PriceItem>
      </Container>
    </div>
  );
}

export default Price;