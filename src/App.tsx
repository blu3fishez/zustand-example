
import { useEffect } from 'react';
import './App.css'
import { useCounterStore } from './store'

// zustand 는 사실 훅 뿐만 아니라, 컴포넌트 바깥에서도 사용이 가능하다.
// 단, 컴포넌트 외부라서 사용법이 약간 다르다.
// getState() 를 이용하면 어디서든지 접근이 가능하다.

// 주의할 점으로는, react 내에서 사용한다면, react 의 life cycle 에 맞춰줘야한다.
// 따라서, useEffect 와 같은 훅 내에서 호출해야 할 것이다.

const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("count", count);
}

// 또한, 컴포넌트 외부에서 state를 설정해주는 것이 가능하다.
// 근데 내가 보기엔, 별로 좋아보이진 않다.

// 만약에 정의를 해준다고 하더라도, store 내에서 정의를 해주는 게 맞는 것 같다.

const clearCount = () => {
  useCounterStore.setState((state) => ({
    count:0,
  }));
}

function App() {
  const count = useCounterStore((state) => (state.count));
  
  return (
    <>
      <main>
        <div>Todo App</div>
        <div>{count}</div>
        <OtherComponent count={count}/>
      </main>
    </>
  )
}

const OtherComponent = ({count} : {count:number}) => {
  const inc = useCounterStore((state) => (state.incrementAsync));
  const dec = useCounterStore((state) => (state.decrement));

  useEffect(() => {
    logCount();
  }, []);

  return (
    <div>
      Setters of Counters : {count}
      <br />
      <button onClick={inc}>increase</button>
      <br />
      <button onClick={dec}>decrease</button>
      <br />
      <button onClick={clearCount}>Clear!</button>
    </div>
  )
}

export default App
