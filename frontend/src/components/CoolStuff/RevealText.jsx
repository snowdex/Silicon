import React, {useState, useEffect} from "react";

function RevealText({classname, stuff}) {
  const lines = [{stuff}];

  const [lineId, setLineId] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [charId, setCharId] = useState(0)

  useEffect(()=>{
    if(charId < lines[lineId].length){
      const timeout = setTimeout(()=>{
        setDisplayed((prev)=> prev + lines[lineId][charId]);
        setCharId((prev)=> prev + 1)
      }, 110)
      return ()=> clearTimeout(timeout)
    }else {
      const timeout = setTimeout(()=>{
        setCharId(0);
        setDisplayed("");
        setLineId((prev)=> (prev+1) % lines.length)
      }, 1800)
      return ()=> clearTimeout(timeout)
    }
  }, [charId, lineId])



  return (
    <h2 className={`${classname}`}>{displayed}<span>|</span></h2>
  );
}

export default RevealText;
