import React, { useState } from 'react';
import './App.css';
import Checkbox from './components/Checkbox';

function App() {
  const [check, setCheck]= useState({length:0, upper:false, lower:false, symbol:false, numbers:false});
  const [copied, setCopied] = useState(false);
  const [Password, setPassword]= useState("");
  
  function passwordgenerator(){
    const numArray=[1,2,3,4,5,6,7,8,9,0]
    const symbolsArray =["~","!","@","#","$","%","^","&","*","(",")"]
    const lowerCasearray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const uppercasearray = lowerCasearray.map((e)=> e.toUpperCase());
    const {length,upper, lower, symbol, numbers}= check;
    
    let generate = (length,upper, lower, symbol, numbers)=>{
        const availablechars=[
          ...(upper ? uppercasearray:[]),
          ...(lower ? lowerCasearray : []),
          ...(numbers ? numArray : []),
          ...(symbol ? symbolsArray : []),
        ];
        const shuffleArray = (array) => {
          return array.sort(() => Math.random() - 0.5);
        };
        const character = shuffleArray(availablechars).slice(0, length);
        setPassword(character.join(''));
        return character
    }
    generate(length,upper, lower, symbol, numbers);
  }
  
  return (
    <div className="App">
      <div style={{textAlign:'center'}}>
        <h2>Password Generator</h2>
      </div>
      <div className='inp_box'>
        <div>
          <input type='text' value={Password} onChange={(e)=>{
            setPassword(e.target.value)
          }}></input>
        </div>
        <div>
          <button className="copy_text" onClick={()=>{
            if(Password.length>0){
              navigator.clipboard.writeText(Password);
              setCopied(true);
            setInterval(()=>{
              setCopied(false)
            },3000)
            }
          }}>{copied? "Copied": "Copy Text" }</button>
        </div>
      </div>
      <div className='length-box'>
        <div>
          <lable >Select Password length</lable>
        </div>
        <div>
          <input type="number" value={check.length} onChange={(e)=>{
            setCheck({...check, length:e.target.value})
          }} className="length"></input>
        </div>
      </div>
      <div className='check-box'>
        <Checkbox value={check.upper} onChange={()=>{
          setCheck({...check, upper:!check.upper})
        }}/>
        <div>
          <lable>Include UpperCase letters</lable>
        </div>
      </div>
      <div className='check-box'>
        <Checkbox value={check.lower} onChange={()=>{
          setCheck({...check, lower:!check.lower})
        }}/>
        <div>
          <lable>Include lowerCase letters</lable>
        </div>
      </div>
      <div className='check-box'>
        <Checkbox value={check.numbers} onChange={()=>{
          setCheck({...check, numbers:!check.numbers})
        }}/>
        <div>
          <lable>Include Numbers </lable>
        </div>
      </div>
      <div className='check-box'>
        <Checkbox value={check.symbol} onChange={()=>{
          setCheck({...check, symbol:!check.symbol})
        }}/>
        <div>
          <lable>Include Symbols</lable>
        </div>
      </div>
      <div>
        <button className="G_button" onClick={passwordgenerator}>Generate Password</button>
      </div>      
    </div>
  );
}

export default App;
