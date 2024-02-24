import {useFormik} from "formik";
import {useState} from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

const forminputs={                  /**Initializing inputs */
    Name: "",                           
    Email : "",
    Password : "",
    RepeatePassword : "",
}

const clickedregister=(storage)=>{console.log(storage)}            //Sending the input to console

const crossckeck=(stored)=>{                  //Validating the inputs
    let error={}
if(stored.Name.length===0){
    error.Name="Enter your Name"
}
else if(stored.Name.length<3 || stored.Name.length>30){
    error.Name="Number of letters in name should not be greater than 30 or less than 3"
}
if(stored.Email.length===0){
    error.Email="Enter your Email"
}
else if(!stored.Email.includes("@")){
    error.Email="Please include @ in your Email."
}
if(stored.Password.length===0){
    error.Password="Enter your Password"
}
else if(0<stored.Password.length && stored.Password.length<10){
    error.Password="Password should have atleast 10 characters"}

else{
    const array=["!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","}","[","]",":",";","?","/","<",">","'","~","`","|"]
    const includingspecialchar=array.some(each=>stored.Password.includes(each))
    if(!includingspecialchar){
    error.Password="Password should contain atleast one special character."}
}
if(!stored.RepeatePassword){
    error.RepeatePassword="Repeat your Password"
}
else if(stored.Password!=stored.RepeatePassword){
    error.RepeatePassword="Repeat your Password correctly"
}

return error

}

function Register(){

    const[finalclick,setfinalclick]=useState(false)     //State to observe sign Up button

    const recordclick=()=>{
        setfinalclick(true)                    //Switching the state when sign up button is clicked
        console.log(formvalue.values)
    }

    const formvalue=useFormik({
        initialValues: forminputs,             
        onSubmit: clickedregister,
        validate: crossckeck,
    })
return(
    <div>
       <NavLink to="/"><button className="home">Home</button></NavLink> 
   <form onSubmit={formvalue.handleSubmit} className="form">
    { finalclick && Object.keys(formvalue.touched).length===4 && Object.keys(formvalue.errors).length===0? <div className="final">Registration Successful!</div>:<div> </div>}
    <div>
    <input type="text" id="Name" name="Name" placeholder="Name" onChange={formvalue.handleChange} value={formvalue.values.Name} onBlur={formvalue.handleBlur}/>
    {formvalue.touched.Name && formvalue.errors.Name? <p className="errors">{formvalue.errors.Name}</p>:null}
    </div>
    <div>
     <input type="email" id="Email" name="Email" onChange={formvalue.handleChange} placeholder="Email" value={formvalue.values.Email} onBlur={formvalue.handleBlur}/>
     {formvalue.touched.Email && formvalue.errors.Email? <p className="errors">{formvalue.errors.Email}</p>:null}
    </div>
    <div>
     <input type="password" id="Password" name="Password" onChange={formvalue.handleChange} placeholder="Password" value={formvalue.values.Password} onBlur={formvalue.handleBlur}/>
     {formvalue.touched.Password && formvalue.errors.Password? <p className="errors">{formvalue.errors.Password}</p>:null}
    </div>
    <div>
    <input type="password" id="RepeatePassword" name="RepeatePassword" onChange={formvalue.handleChange} placeholder="Repeate Password" value={formvalue.values.RepeatePassword} onBlur={formvalue.handleBlur}/>
    {formvalue.touched.RepeatePassword && formvalue.errors.RepeatePassword? <p className="errors">{formvalue.errors.RepeatePassword}</p>:null}
    </div>
    <button onClick={recordclick} type="submit" className="signup">Sign Up</button>
   </form>
   </div>
)
}
export default Register