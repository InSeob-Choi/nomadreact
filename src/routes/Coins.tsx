import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

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
  font-size: 52px;
  font-weight: 700;
`
const CoinsList = styled.ul`
  
`
const Coin = styled.li`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color .2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`
const Loader = styled.span`
  text-align: center;
  display: block;
`
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 12px;
`
export interface isDarkProps {
  isDark: boolean;
}
export const ThemeBtn = styled.button<isDarkProps>`
  font-size: 20px;
  background-color: #3E968D;
  border: 0;
  width: 36px;
  height: 36px;
  border-radius: 5px;
  color: ${props => props.isDark ? "yellow" : "white"};
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
`

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

function Coins() {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins); // 데이터를 캐시에 저장해둬서 굳!
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const darkThemeClick = () => setIsDark(prev => !prev);
/*
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, [])
*/

  return (
    <Container>
      <Helmet>
        <title>CRYPTO</title>
      </Helmet>
      <Header>
        <Title>CRYPTO</Title>
        <ThemeBtn onClick={darkThemeClick} isDark={isDark}>
          {isDark ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          ) }
        </ThemeBtn>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : (
      <CoinsList>
        {data?.slice(0, 100).map(coin => (
          <Coin key={coin.id}>
            <Link to={`./${coin.id}`} state={{name: coin.name}}>
              <Img src={coin.image} />
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>
      )}
    </Container>
  )
}

export default Coins;