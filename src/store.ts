// 스토어란 나의 state를 보관하는 곳이라는 뜻.
// context api, recoil 과는 다르게, 이 전역 상태관리가 되는 영역을 지정하여 감싸줄 필요가 없게 된다.
// 이와 같은 경우는 next.js 에선 ssr로 작동시 어떻게 작동 될지는 미지수이나,
// csr 만을 사용하는 입장에서는 아주 편한 점으로 다가온다.

import {create} from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement:() => void;
  incrementAsync: () => Promise<void>;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set({count:1});
  },
  
  decrement: () => {
    // 이 dispatch를 사용한 후의 state를 명시해도 좋지만,
    // 함수를 넘겨준다면, 이전 state 로 부터의 정보를 바탕으로 재구성할 수도 있습니다.
    set((state) => ({count:--state.count}));
  },

  // fetch 등 비동기 활동을 할때를 위한 비동기 action도 설정이 가능하다.
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({count:state.count + 1}));
  }
}))

