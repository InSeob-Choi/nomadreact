import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route path={`${process.env.PUBLIC_URL}/:coinId/*`} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;