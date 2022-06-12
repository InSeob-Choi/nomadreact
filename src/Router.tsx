import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`/`} element={<Coins />} />
        <Route path={`/:coinID/*`} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

