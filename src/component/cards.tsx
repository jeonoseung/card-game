import styled from "styled-components";
import {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
interface state{
    array:number[]
    selected:number[]
    success:boolean | undefined
    warning:number
    reset:number
}
export default function Cards({value,state,setState}:{value:number,state:state,setState:Dispatch<SetStateAction<state>>}){
    const [selected,setSelected] = useState<number>(1)
    useEffect(()=>{
        setTimeout(()=>setSelected(-1),3000)
    },[])
    const click = () =>{
        if(selected === -1){
            setSelected(1)
            setState((prev)=>({
                ...prev,selected:[...prev.selected,value]
            }))
        }
    }
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
        <Area onClick={click} style={style}>
            {
                selected === 1 || selected === 0
                    ? <span>{value}</span>
                    : <span>?</span>
            }
        </Area>
    )
}
const Area = styled.div`
  width:100%;
  height:150px;
  color:black;
  display:flex;
  align-items:center;
  justify-content: center;
  font-size:4rem;
  font-weight:bold;
  border-radius:1rem;
  transition:all 0.5s;
    `