import React, {useState, useEffect} from 'react'

function RevealText({lines = []}) {
    
    
        //setting the state
        const [lineId, setLineId] = useState(0);
        const [displayed, setDisplayed] = useState("");
        const [charId, setCharId] = useState(0);
    
        useEffect(()=>{ 
            if (lines.length === 0) return;
            if(charId < lines[lineId].length){
                const timeout = setTimeout(()=>{
                    setDisplayed((prev)=> prev+ lines[lineId][charId]);
                setCharId((prev)=> prev + 1);
                }, 100)
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
    <span className='flex items-center new-bold-font text-2xl text-transparent bg-clip-text bg-gradient-to-l from-violet-500 via-blue-500 to-purple-700'><h2>{displayed}</h2><span className='new-cont-font animate-[pulse_0.5s_ease-in-out_infinite] text-purple-600'>|</span></span>
  )
}

export default RevealText