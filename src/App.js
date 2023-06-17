
import { useState } from 'react';
import './App.style.css';

import { useNavigate } from 'react-router-dom';

function App() {
const navigate = useNavigate();
    const finish = (e)=>{
        if(input_error.name && input_error.email && input_error.phone && input_error.gender && input_error.password && input_error.cpassword)
         navigate(`/confirm?name=${inputs.name}&email=${inputs.email}&phone=${inputs.phone}&password=${inputs.password}&cpassword=${inputs.cpassword}&gender=${inputs.gender}`)
    }
  const [input_error, setinput_error] = useState({
    name:false,
    email:false,
    phone:false,
    gender:false,
    password:false,
    cpassword:false
  });
     const [inputs,setInput] = useState({
      name: "",
      email:"",
      phone:"",
      gender:"",
      password:"",
      cpassword:""
    })
 
    function isCapital(ch){
      return ch.charCodeAt() >= 65 && ch.charCodeAt() <= 90;
  }
    const Errorfun = (name,mssg) =>{
      
           let inputval = document.getElementById(name);
           inputval.style.borderColor = "red";
           setinput_error({...input_error,[name]:false});
    }
    const Correctfun = (name) =>{
      let inputval = document.getElementById(name);
           inputval.style.borderColor = "green";
           setinput_error({...input_error,[name]:true});
    }
   const checkInputs = (e) =>{
    if(e.target.name === "name" || e.target.name === "gender"){
      return Correctfun(e.target.name)
    }
        if(e.target.name === "email"){
          let email = e.target.value;
          let n = email.length;
          if(email === "")
          return Errorfun(e.target.name, `${e.target.name} field cann't be empty`)
             let atrate_pos = email.indexOf("@");
             let dot_pos = email.indexOf(".");
             let dot_pos2 = email.lastIndexOf(".");
             if(atrate_pos === -1)
             return Errorfun(e.target.name,"@ is missing in email");
            else if(atrate_pos < 3)
             return Errorfun(e.target.name,"Name should be atleast 5 characters long");
            else{
              let specialchar = "!@#$%^&*()"
              for(let i = 0;i<atrate_pos;i++){
                if(isCapital(email[i]))
                return Errorfun(e.target.name,"Name should contain only lowercase letters")
                 if(specialchar.indexOf(email[i]) !== -1)
                 return Errorfun(e.target.name,"Name shouldn't contain any special character");
              }
            }
            if(dot_pos2 < atrate_pos)
            return Errorfun(e.target.name,"Invalid email format")
            if(dot_pos !== dot_pos2 || dot_pos === -1)
            return Errorfun(e.target.name, "Invalid email format");
            if(n - atrate_pos-1 < 6)
            return Errorfun(e.target.name,"Domain name should be atleast 7 characters");
            if(n - dot_pos2-1 < 3)
            return Errorfun(e.target.name, "Invalid email format")
            return Correctfun(e.target.name);
        }
        else if(e.target.name === "phone"){
            let phoneval = e.target.value;
            if(phoneval === "")
            return Errorfun(e.target.name,"Phone field cannot be empty");
            for(let i = 0;i<phoneval.length;i++){
              if(isNaN(Number(phoneval[i])))
              return Errorfun(e.target.name,"Invalid phone format");
            }
            return Correctfun(e.target.name);
        }
        else if(e.target.name === "password"){
           let ucase=false,lcase=false,specialcase = false;
           let passVal = e.target.value;
           if(passVal === "")
           return Errorfun(e.target.name,"Password field cann't be empty");
           let specialchar = "!@#$%^&*()"
           if(passVal.length < 8)
           return Errorfun(e.target.name,"Password should be atleast 8 charcaters long")
            for(let i=0;i < passVal.length;i++){
                 if(passVal[i].toUpperCase() === passVal[i])
                 ucase = true;
                 if(passVal[i].toLowerCase() === passVal[i])
                 lcase = true;
                if(specialchar.indexOf(passVal[i]) !== -1)
                specialcase = true;
            }
            if(!ucase)
            return Errorfun(e.target.name,"Password should contain uppercase letters");
            if(!lcase)
            return Errorfun(e.target.name,"Password should contain lowercase letters");
            if(!specialcase)
            return Errorfun(e.target.name,"Confirm Password should contain special case letters");
              return Correctfun(e.target.name)
        }
        else if(e.target.name === "cpassword"){
             let cpassVal = e.target.value;
             if(cpassVal === "")
             return Errorfun(e.target.name,"Confirm password cann't be empty");
             if(cpassVal !== inputs.password)
             return Errorfun(e.target.name,"Confirm Password doesn't match with Password");
             let ucase=false,lcase=false,specialcase = false;
             let specialchar = "!@#$%^&*()"
           if(cpassVal.length < 8)
           return Errorfun(e.target.name," Confirm Password should be atleast 8 charcaters long")
            for(let i=0;i < cpassVal.length;i++){
                 if(cpassVal[i].toUpperCase() === cpassVal[i])
                 ucase = true;
                 if(cpassVal[i].toLowerCase() === cpassVal[i])
                 lcase = true;
                if(specialchar.indexOf(cpassVal[i]) !== -1)
                specialcase = true;
            }
            if(!ucase)
            return Errorfun(e.target.name,"Confirm Password should contain uppercase letters");
            if(!lcase)
            return Errorfun(e.target.name,"Confirm Password should contain lowercase letters");
            if(!specialcase)
            return Errorfun(e.target.name," Confirm Password should contain special case letters");
              return Correctfun(e.target.name)

        }
   }
    const fillFunc = (e)=>{
      setInput({...inputs, [e.target.name]:e.target.value});
      checkInputs(e);
    }
  return (
    <div className="App">
    <h2>Form Signup</h2>
      <form  id='form'>
       <div className="box">
         <label htmlFor="name">Enter your name:-</label>
         <input type="text" name="name" id="name" value={inputs.name} onChange={(e)=>fillFunc(e)}/>
         <span id="mssgname"></span>
       </div>
       <div className="box">
         <label htmlFor="email">Enter your email:-</label>
         <input type="text" name="email" id="email" value={inputs.email} onChange={(e)=>fillFunc(e)}/>
         <span id="mssgemail"></span>
       </div>
       <div className="box">
         <label htmlFor="name">Enter your phone:-</label>
         <input type="number" name="phone" id="phone" maxLength={10} minLength={10} value={inputs.phone} onChange={(e)=>fillFunc(e)}/>
          <span id="mssgphone"></span>
         </div>
       <div className="box">
         <label htmlFor="name">Enter password:- </label>
         <input type="password" name="password" id="password"  value={inputs.password} onChange={(e)=>fillFunc(e)}/>
         <span id="mssgpassword"></span>
       </div>
       <div className="box">
         <label htmlFor="name">Confirm password:- </label>
         <input type="password" name="cpassword" id="cpassword"  value={inputs.cpassword} onChange={(e)=>fillFunc(e)}/>
         <span id="mssgcpassword"></span>
       </div>
       <div className="box">
       <p>Choose your gender:- </p>
         <label htmlFor="male">Male</label>
         <input type="radio" name="gender" id="gender" value="male" onChange={(e)=>fillFunc(e)}/>
         <label htmlFor="female">Female</label>
         <input type="radio" name="gender" id="gender" value="female" onChange={(e)=>fillFunc(e)}/>
         <span id="mssggender"></span>
       </div>
      </form>
      <button onClick={(e)=>finish(e)}>Submit</button>
    </div>
  );
}

export default App;
