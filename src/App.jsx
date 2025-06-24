import { useState,useCallback,useEffect,useRef} from 'react'


function App() {
const [length,setLength]=useState(8)
const [password,setPassword]=useState("")
const [numberallowed,setNumberallowed]=useState(false)
const [charallowed,setCharallowed]=useState(false)

let passwordRef=useRef(null)

let passwordGenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberallowed) str+="0123456789"
if(charallowed) str+="!@#$%^&*()+-{}/?~"
for(let i=1;i<=length;i++){
  let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
}
setPassword(pass)
},[length,numberallowed,charallowed,setPassword])

const copyToClipBoard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 99);
 window.navigator.clipboard.writeText(password)
},[password])

useEffect(() => {
  passwordGenerator()
}, [length, numberallowed, charallowed, passwordGenerator])

  return (
    <>
      <div className='w-full bg-black h-screen flex justify-center'>
      <div className="w-full max-w-md bg-gray-700 h-52 py-4 px-3 text-orange-400 mt-4 flex flex-col">
      <p className='text-xl text-center my-3'>Password Generator</p>
      <div className=' w-full flex shadow rounded-lg'>
        <input 
        type="text" 
        className='outline-none w-full py-1 px-3 bg-white'
        value={password}
        placeholder='Password'
        readOnly
        />
        <button 
        className='p-3 bg-blue-600 text-white'
        onClick={copyToClipBoard}
        >copy</button>
      </div>

      <div className='flex mt-3 py-2'>
        <div className='flex'>
          <input 
          type="range" 
          className='mr-1'
          value={length}
          min={8}
          max={50}
          onChange={(e)=>setLength(e.target.value)}
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center ml-2'>
        <label>Number:</label>
          <input
           type="checkbox"
           className='mt-1 ml-1'
           defaultChecked={numberallowed}
           onChange={()=>setNumberallowed((prev)=>!prev)}
          />
        </div>
        <div className='flex items-center ml-2'>
        <label>Charracter:</label>
          <input
           type="checkbox"
           className='mt-1 ml-1'
           defaultChecked={charallowed}
           onChange={()=>setCharallowed((prev)=>!prev)}
          />
             
        </div>
      </div>

      </div >
      
      </div>
    </>
  )
}

export default App
