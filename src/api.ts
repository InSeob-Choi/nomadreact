const BASE_URL = "https://api.coingecko.com/api/v3";

export function fetchCoins() {
  return (
    fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(res => res.json())
  )
}

export function fetchCoinInfo(coinID: string) {
  return (
    fetch(`${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`).then(res => res.json())
  )
}

export function fetchCoinDescription(coinID: string) {
  return (
    fetch(`${BASE_URL}/coins/${coinID}?localization=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).then(res => res.json())
    // https://api.coingecko.com/api/v3/coins/nomadreact?localization=false&market_data=false&community_data=false&developer_data=false&sparkline=false 

  )
}

export function fetchCoinHistory(coinID: string) {
  return (
    fetch(`${BASE_URL}/coins/${coinID}/market_chart?vs_currency=usd&days=14&interval=daily`).then(res => res.json())
  )
}

export function fetchCoinOhlcDay14(coinID: string) {
  return (
    fetch(`${BASE_URL}/coins/${coinID}/ohlc?vs_currency=usd&days=14`).then(res => res.json())
  )
}