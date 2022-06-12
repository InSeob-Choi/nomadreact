import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route path={`${process.env.PUBLIC_URL}/:coinID/*`} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

