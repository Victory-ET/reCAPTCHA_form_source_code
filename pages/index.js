import { React, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function Home() {
  const getCaptchaRef = useRef(null);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [valid, setValid] = useState(false)

  const reCaptchaValue = async () => {
    const token = getCaptchaRef.current.getValue();
    console.log(token);
    await axios
      .post("http://localhost:5000/status", {
        response: token,
      })
      .then((res) => {
        console.log(res);
        setValid(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = ()=>{
    if(valid){
    alert("welcome user " + value + " " + value2)
    }
    else{
      alert("please verify you are not a robot")
    }
  }

  
  return (
    <div className="container">
      <div className="form-cont">
        <div className="captcha">
          <h1>reCAPTCHA Form</h1>
        </div>
        <div className="form">
          <div className=" form1">
            <h2>Login</h2>
            <span>
              <label>Input Firstname</label>
              <input
                type="text"
                placeholder="John"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </span>
            <span>
              <label>Input Surname</label>
              <input
                type="text"
                placeholder="Doe"
                value={value2}
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
              />
            </span>
            <button className="submit" onClick={()=>{handleSubmit()}}>Log in</button>
            <ReCAPTCHA
              sitekey="YOUR SITE KEY"
              theme="dark"
              ref={getCaptchaRef}
              onChange={() => {
                reCaptchaValue();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
