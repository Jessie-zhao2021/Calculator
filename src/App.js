import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [result, setResult] = useState('0');
  const [displayFontSize, setDisplayFontSize] = useState('20px');
  const [resultFontSize, setResultFontSize] = useState('42px');


  useEffect(()=>{
    if(display.length >= 40){
      setDisplayFontSize('10px');
      return
    }
    if(display.length >= 30){
      setDisplayFontSize('12px');
      return
    };

    if(display.length >= 1){
      setDisplayFontSize('20px');
      return
    };
  },[display])

  useEffect(()=>{   
    if(display.length >= 31){
      setResultFontSize('15px');
      return
    } 
    if(display.length >= 24){
      setResultFontSize('18px');
      return
    }
    if(display.length >= 17){
      setResultFontSize('25px');
      return
    }
    if(display.length >= 13){
      setResultFontSize('30px');
      return
    }
    if(display.length >= 1){
      setResultFontSize('42px');
      return
    }
  },[result])

  const buttons = [
    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "zero", value: "0" },
    { id: "decimal", value: "." },
    { id: "clear", value: "C" },
    { id: "add", value: "+" },
    { id: "subtract", value: "-" },
    { id: "multiply", value: "*" },
    { id: "divide", value: "/" },
    { id: "equals", value: "=" },
  ]

  const calculate = (event) =>{
    const button = event.target.id;

    if( button === 'clear'){
      setDisplay('0');
      setResult('0');
    } else if ( button === 'equals' ){
      setResult('0');
      console.log(display);
      if(display[display.length - 1] === '-' || display[display.length - 1] === '+' || display[display.length - 1] === '*' || display[display.length - 1] === '/'){
        setDisplay(eval(display.slice(0, -1)));
        return;
      };
      setDisplay(eval(display));
    // } else if ( button === 'subtract' ){
    //   setResult(event.target.innerHTML);
    //   if(display[display.length - 1] !== event.target.innerHTML)
    //   setDisplay(display + event.target.innerHTML);
    } else if (button === 'add' || button === 'multiply' || button === 'divide' || button === 'subtract'){
      setResult(event.target.innerHTML);
      if(display[display.length - 1] === '-' || display[display.length - 1] === '+' || display[display.length - 1] === '*' || display[display.length - 1] === '/'){
        if(display[display.length - 2] === '-' || display[display.length - 2] === '+' || display[display.length - 2] === '*' || display[display.length - 2] === '/')  
          setDisplay(display.slice(0, -2) + event.target.innerHTML);
        else
          setDisplay(display.slice(0, -1) + event.target.innerHTML);
      }
      else
        setDisplay(display + event.target.innerHTML);
    }
    else if(result === '+' || result === '-' || result === '*' || result === '/'){
      if(button === 'decimal'){
        setResult('0' + event.target.innerHTML);
        setDisplay(display + '0' + event.target.innerHTML);
      }else{
        setResult(event.target.innerHTML);
        setDisplay(display + event.target.innerHTML);
      }
    }
    else if(result === '0' && button !== 'decimal'){
      setResult(event.target.innerHTML);
      setDisplay(event.target.innerHTML);
    }
    else if(button === 'decimal' && result.includes('.') === true) setResult(result + '');
    else{
      setResult(result + event.target.innerHTML);
      setDisplay(display + event.target.innerHTML);
    }
  }

  return (
    <>
      <div id='display-container' className='display-container'>
        <div className='dots'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div id='display' style={{fontSize: displayFontSize}}>{display}</div>
        <div id='result'  style={{fontSize: resultFontSize}}>{result}</div>
      </div>
      <div id='button-container'>
        {
          buttons.map((item, index)=>{
            return (
            <button key={index} id={item.id} className='button' onClick={calculate}>
              {item.value}
            </button>)
          })
        }
      </div>

    </>
  );
}

export default App;
