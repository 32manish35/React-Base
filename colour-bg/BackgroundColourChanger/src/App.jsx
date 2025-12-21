
import { useState } from 'react'
import './App.css'


function App() {
  const [color ,setColor ] = useState('blue')
const changeBG = (prop) =>{
  setColor(prop)
}
  

  return (
   <div className='w-full h-screen duration-200 bg-blue-400' style={{backgroundColor:color}}>
     <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
      <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
        <button className="border-pink-500 rounded-xl  px-2 py-1 bg-blue-700 text-white"onClick={()=>{changeBG("blue")}}>Blue</button>
        <button className="border-pink-500 rounded-xl  px-2 py-1 bg-black text-white" onClick={()=>{changeBG("black")}}>Black</button>
        <button className="border-pink-500 rounded-xl  px-2 py-1 bg-pink-500 text-white" onClick={()=>{changeBG('pink')}}>Pink</button>
        <button className="border-pink-500 rounded-xl  px-2 py-1 bg-teal-400 text-white" onClick={()=>{changeBG('olive')}}>Olive</button>
        <button className="border-pink-500 rounded-xl  px-2 py-1 bg-purple-500 text-white" onClick={()=>{changeBG('purple')}}>Purple</button>
      </div>
     </div>
   </div>
  )
}

export default App
