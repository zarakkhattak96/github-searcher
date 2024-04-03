import React, { useState } from "react"


export default function Search() {
    
    const [userName, setUserName] = useState("")


 

    return (
    
    <>
    <h1> GitHub Searcher</h1>
    <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
    <button type="button"> User</button>
      
    </>
      
      
      
      )
}