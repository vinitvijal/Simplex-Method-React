import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';




function App() {

  const [optEq, setOptEq] = useState('');
  const [eq1, setEq1] = useState('');
  const [eq2, setEq2] = useState('');
  const [eq3, setEq3] = useState('');
  const [type, setType] = useState('maximize');
  const [solution, setSolution] = useState({});
  // const [solKey, setSolKey] = useState([]);


  useEffect(() => {
    console.log('Solution : ', solution)
    // setSolKey(Object.keys(solution))

  }, [solution]);

  const findSol = async () => {
    // if(optEq.length > 5 && eq1.length > 5 && eq2.length > 5 && eq3.length > 5 ){
      var data = {eq1 : eq1, eq2 : eq2, eq3 : eq3, optEq : optEq, type: type }
      // var data = {'msg':'hello'}
      axios
      .post('http://localhost:3300/simplex', data)
      .then((res) => setSolution(res.data))
      .catch(err => {
        console.error(err);
      })
  
    // }else{
    //   console.log('Check Your Inputs')
    // }
  }

    return (
        <div className="App">
          Type of Solution : 
            <select name="maxmin" id="maxmin" value={type} onChange={(e)=>setType(e.target.value)}>
              <option value="maximize">Max</option>
              <option value="minimize">Min</option>
            </select>
            <br />
            <span>
                Optimizing Equation Z = <input type="text" name="optiequation" placeholder='3x + 4y - 2z' id="optiequation"  value={optEq} onChange={(e)=>{setOptEq(e.target.value)}}/><br />
            </span><br />
            <div className='d-flex'>
                <input type="text" name="eq1" id="eq1" placeholder='Equation 1' value={eq1} onChange={(e) => {setEq1(e.target.value)}} />
                <input type="text" name="eq2" id="eq2" placeholder='Equation 2' value={eq2} onChange={(e) => {setEq2(e.target.value)}} />
                <input type="text" name="eq3" id="eq3" placeholder='Equation 3' value={eq3} onChange={(e) => {setEq3(e.target.value)}} />
            </div>
            <button onClick={findSol}>Find Solution</button>
            <div className="solution">
                {Object.keys(solution).map((item)=>

                    (<h1 key={item}>{item} : {solution[item]}</h1>)


                )}
            </div>
        </div>
    );
}

export default App;
