import styled from "styled-components";
import {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
interface state{
    array:number[]
    selected:number[]
    success:boolean | undefined
    warning:number
    reset:number
    score:number
}
export default function Cards({value,state,setState}:{value:number,state:state,setState:Dispatch<SetStateAction<state>>}){
    const [selected,setSelected] = useState<number>(1)
    //특정 시간 뒤에 카드 숨기기
    useEffect(()=>{
        setTimeout(()=>setSelected(-1),3000)
    },[])
    /** 카드 클릭 이벤트 */
    const click = () =>{
        if(selected === -1){
            setSelected(1)
            setState((prev)=>({
                ...prev,selected:[...prev.selected,value]
            }))
        }
    }
    //분기에 따라 배경색 변경
    const style:CSSProperties = {
        background:
            selected === 1
                ? 'rgba(165,213,235,0.5)'
                : selected === -1
                    ? 'rgba(165,213,235,1)'
                    : 'rgba(0,0,0,0.75)',
    }
    useEffect(()=>{
        if(state.success){
            if(value === state.selected[0]){
                setState((prev)=>({
                    ...prev,selected:[],success:undefined
                }))
                setSelected(0)
            }
        }else if(state.success === false) {
            if(selected !== 0){
                setState((prev)=>({
                    ...prev,selected:[],success:undefined
                }))
                setSelected(-1)
            }
        }
    },[state.success])
    return(
        <Area onClick={click} style={style} className="card">
            {
                selected === 1 || selected === 0
                    ? <span className="card-font">{value}</span>
                    : <span className="card-font">?</span>
            }
        </Area>
    )
}
const Area = styled.div`
  width:100%;
  color:black;
  display:flex;
  align-items:center;
  justify-content: center;
  font-weight:bold;
  border-radius:1rem;
  transition:all 0.5s;
    `