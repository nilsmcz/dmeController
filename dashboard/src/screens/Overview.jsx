import React from 'react'

export default function Overview() {
  return (
    <div style={{display:"flex", justifyContent:"start", flexDirection:"column", alignItems:"start", padding:"15px", gap:"5px"}}>

        <div>
            <div style={{fontSize:"13px", fontWeight:"500", color:"grey"}}>Jeden Freitag um</div>

            <div style={{display:"flex", flexDirection:"row", gap:"30px"}}>
                <div style={{fontSize:"19px", fontWeight:"600"}}>18:00 Uhr</div>
                <div style={{fontSize:"19px", fontWeight:"600"}}>+- 5 Minuten</div>
            </div>
        </div>

        <div>
            <div style={{fontSize:"13px", fontWeight:"500", color:"grey"}}>Jeden Samstag um</div>

            <div style={{display:"flex", flexDirection:"row", gap:"30px"}}>
                <div style={{fontSize:"19px", fontWeight:"600"}}>12:00 Uhr</div>
                <div style={{fontSize:"19px", fontWeight:"600"}}>+- 15 Minuten</div>
            </div>
        </div>
    </div>
  )
}