import React, { useEffect, useState } from 'react'

function RevealTopText() {
    const lines = ["SHREY MEHTA","Take CTRL of your LIFE..."];

    //setting the state
    const [lineId, setLineId] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [charId, setCharId] = useState(0);

    useEffect(()=>{ 
        if(charId < lines[lineId].length){
            const timeout = setTimeout(()=>{
                setDisplayed((prev)=> prev+ lines[lineId][charId]);
            setCharId((prev)=> prev + 1);
            }, 120)
            return ()=> clearTimeout(timeout)
        }else{
            const timeout = setTimeout(()=>{
                setCharId(0);
            setDisplayed("")
            setLineId((prev)=> (prev + 1) % lines.length)
            }, 1800)
            return ()=> clearTimeout(timeout);
        }
    },  [charId, lineId, lines])

  return (
    <span className='flex items-center new-bold-font text-2xl text-transparent bg-clip-text bg-gradient-to-l from-yellow-500 via-blue-500 to-indigo-500'><h2>{displayed}</h2><span className='new-cont-font animate-[pulse_0.5s_ease-in-out_infinite]'>|</span></span>
  )
}

export default RevealTopText