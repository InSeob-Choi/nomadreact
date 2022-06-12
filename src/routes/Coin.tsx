import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link, useMatch } from 'react-router-dom';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinDescription } from '../api';
import ChartLine from './ChartLine';
import ChartCandle from './ChartCandle';
import Price from './Price';
import { isDarkAtom } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { ThemeBtn } from './Coins';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  `
const Header = styled.header`
  height: 14vh;
  text-align: center;
  line-height: 14vh;
  position: relative;
  `
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  font-weight: 600;
  `
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
const Description = styled.div`
  margin: 16px 2px 10px 2px;
`
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0 6px 0;
  gap: 10px;
`
const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`
const HomeBtn = styled.button`
  font-size: 20px;
  background-color: #3E968D;
  border: 0;
  width: 36px;
  height: 36px;
  border-radius: 5px;
  color: yellow;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
`

interface Params {
  coinID: string;
}
interface RouteState {
  state: {
    name: string;
  }
}
export interface InfoDataProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: object;
  last_updated: string;
  price_change_percentage_24h_in_currency: number;
}

interface DescriptionDataProps {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: object;
  platforms: object;
  block_time_in_minutes: number;
  hashing_algorithm: object;
  categories: object;
  public_notice: object;
  additional_notices: object;
  description: {
    en: string;
  };
  links: {
    homepage: string[]
  };
  image: object;
  country_origin: string;
  genesis_date: object;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  public_interest_stats: object;
  status_updates: object;
  last_updated: string;
  tickers: object;
}

function Coin() {
  const {coinID} = useParams() as unknown as Params; // coin.id를 파라미터에서 가져오기 (fallback 용도) // gh-pages에서 "nomadreact"라는 repository의 이름을 파라미터로 착각해 버림..
  const {state} = useLocation() as RouteState;       // coin.name을 state에서 가져오기
  const priceMatch = useMatch("/:coinID/price");
  const chartLineMatch = useMatch("/:coinID/chart_line");
  const chartCandleMatch = useMatch("/:coinID/chart_candle");
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoDataProps[]>(["info", coinID], () => fetchCoinInfo(coinID), {refetchInterval: 1000*60*60});
  const {isLoading: descriptionLoading, data: descriptionData} = useQuery<DescriptionDataProps>(["description", coinID], () => fetchCoinDescription(coinID));
  const loading = infoLoading && descriptionLoading;
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const darkThemeClick = () => setIsDark(prev => !prev);
  /*
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoDataProps>();
  const [price,  setPrice] = useState<PriceDataProps>();
  useEffect(() => {
    (async () => {
      const resInfo = await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`);
      const infoData = await resInfo.json();
      const resPrice = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      const priceData = await resPrice.json();
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinID])
  */

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : (loading ? "Loading..." : infoData && infoData[0].name)}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : (loading ? "Loading..." : infoData && infoData[0].name)}
        </Title>
        <HomeBtn>
          <Link to="/">
            <FontAwesomeIcon icon={faHouseChimney} />
          </Link>
        </HomeBtn>
        <ThemeBtn onClick={darkThemeClick} isDark={isDark}>
          {isDark ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          ) }
        </ThemeBtn>
      </Header>
      {loading ? <Loader>Loading...</Loader> : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData && infoData[0].market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData && infoData[0].symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Current Price</span>
              <span>$ {infoData && infoData[0].current_price}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Homepage</span>
              <a href={descriptionData?.links.homepage[0]} target="_blank" rel="noreferrer">{descriptionData?.links.homepage[0]}</a>
            </OverviewItem>
            <OverviewItem>
              <span>Market Capitalization</span>
              <span>$ {infoData && infoData[0].market_cap}</span>
            </OverviewItem>
          </Overview>
          <Description dangerouslySetInnerHTML={{__html: descriptionData?.description.en} as {__html: string}}></Description>
          <Tabs>
            <Tab isActive={(chartLineMatch || chartCandleMatch) !== null}>
              <Link to={`chart_line`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart_line" element={<ChartLine coinID={coinID} />} />
            <Route path="chart_candle" element={<ChartCandle coinID={coinID} />} />
            <Route path="price" element={<Price coinID={coinID} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;