import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: "isDark", //고유한 값으로 설정해야 함
  default: false // 초깃값
})