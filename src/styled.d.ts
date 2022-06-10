import 'styled-components';

// 위에 받아온 styled-components를 확장하여 하나로 만듦
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    priceColor: string;
  }
}

