import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

// 꼭 위에처럼 styled-components를 확장해서 만들 필요는 없군.. 아래처럼 해도 적용됨.
// export interface DefaultTheme {
//   textColor: string;
//   bgColor: string;
//   btnColor: string;
// }