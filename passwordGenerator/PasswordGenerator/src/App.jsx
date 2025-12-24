

import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const[length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const[charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState('')
  const passRef = useRef(null)
  const copyPass = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()"
    for(let i = 1; i<=length;i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },
  [length,numberAllowed,charAllowed,setPassword])

 useEffect(() => {
  //eslint-disable-next-line
  passwordGenerator();
  
}, [length, numberAllowed, charAllowed,passwordGenerator]);

  return (
    <>
    <div className=' w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-black text-pink-300'>
      <h1 className='text-white text-4xl text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder='Password'
        readOnly
        ref={passRef} />
        <button onClick={copyPass} 
        className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0">Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <input type="checkbox" id="checkbox1" 
        checked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}/>
        <label >Numbers</label>
        <input type="checkbox" 
        checked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}  /><label >Special Characters</label>
        
        <input type="range"
         min={8}
        max={20}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label htmlFor="">Length{length}</label>
      </div>
      

    </div>
      
    </>
  )
}

export default App
