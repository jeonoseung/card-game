import React, {useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import Cards from "./component/cards";
import styled from "styled-components";
interface state{
    array:number[]
    selected:number[]
    success:boolean | undefined
    warning:number
    reset:number
    score:number
}
function App() {
    const time = useRef<any>(null)
    const [msg,setMsg] = useState<string>('')
    //상태 값
    const [state,setState] = useState<state>({
        //카드
        array:[],
        //선택된 카드
        selected:[],
        //짝이 맞는지 확인
        success:undefined,
        //실패 횟수
        warning:0,
        //리셋
        reset:0,
        score:0
    })
    //행마다 카드 수
    const rowLength = 6
    useEffect(()=>{
        mix()
    },[])
    /** 카드 섞기 */
    const mix = () =>{
        let arr:number[]= [];
        for(let i=0;i<rowLength*2;i++){
            for(let j=0;j<2;j++){
                arr = [...arr,i];
            }
        }
        const c = [...arr];
        //숫자 순서 섞기
        for(let i=0;i<rowLength*10;i++){
            const randomFir = Math.floor(Math.random()*c.length)
            const randomSec = Math.floor(Math.random()*c.length)
            const [spliceArr] = c.splice(randomFir,1)
            c.splice(randomSec,0,spliceArr)
        }
        setState((prev)=>({
            ...prev,array:[...c]
        }))
    }
    //선택할 때 마다
    useEffect(()=>{
        if(state.selected.length === 2){
            if(state.selected[0] === state.selected[1]){
                setState((prev)=>({
                    ...prev,success:true,score:prev.score+1
                }))
            }
            else{
                setTimeout(()=>{
                    if(state.warning < 4){
                        setMsg(`같은 번호가 아닙니다! 5번 경고 시 초기화 (현재 ${state.warning+1}회)`)
                    }
                    else{
                        setMsg(`실패! 초기화 되었습니다.`)
                    }
                    setState((prev)=>({
                        ...prev,selected:[],success:false,warning:prev.warning+1
                    }))
                },300)
            }
        }
    },[state.selected])
    //실패할때 마다
    useEffect(()=>{
        if(state.warning === 5){
            setState((prev)=>({
                ...prev,array:[],success:undefined,selected:[],warning:0,reset:prev.reset+1,score:0
            }))
        }
    },[state.warning])
    useEffect(()=>{
        mix()
    },[state.reset])
    useEffect(()=>{
        if(msg !== ''){
            clearTimeout(time.current)
            time.current = setTimeout(()=>setMsg(''),3000)
        }
    },[msg])
    useEffect(()=>{
        if(state.score === rowLength*2){
            setMsg('성공! 잠시 후 초기화 됩니다.')
            setTimeout(()=>{
                setState((prev)=>({
                    ...prev,array:[],success:undefined,selected:[],warning:0,reset:prev.reset+1,score:0
                }))
            },3000)
        }
    },[state.score])
  return (
    <div className="App">
      <header className="App-header">
          <Message>{msg}</Message>
          <Around className="cart-area">
              {
                  state.array.map((li:number,index)=>(
                      <Cards key={index} value={li} state={state} setState={setState}/>
                  ))
              }
          </Around>
      </header>
    </div>
  );
}
export default App;
const Around = styled.div`
  width:100%;
  display:grid;
  gap:1rem;
  row-gap:1rem;
  grid-template-columns:repeat(6,1fr);
`
const Message = styled.div`
  width:100%;
  padding:1rem;
  min-height:100px;
  display:flex;
  justify-content:center;
  align-items: center;
  font-size:1.5rem;
`