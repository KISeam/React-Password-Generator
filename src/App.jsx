import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;':\",.<>/?";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str[char];
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    if (!passwordRef.current) return;

    passwordRef.current.select();
    document.execCommand("copy");

    document.getElementById("copyNote").innerText = "Copied!";
    setTimeout(() => {
      document.getElementById("copyNote").innerText = "";
    }, 2000);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-700">
          <h1 className="text-4xl text-center mb-8 text-white">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 outline-none bg-white"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-orange-500 text-white px-3 py-2 shrink-0 cursor-pointer"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                checked={numberAllowed}
                className="cursor-pointer"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label>Number</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                checked={charAllowed}
                className="cursor-pointer"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label>Special Character</label>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 my-4 text-white bg-orange-500 hover:bg-orange-400 rounded-lg cursor-pointer"
            onClick={generatePassword}
          >
            New Password Generate
          </button>
          <p className="text-sm text-center text-gray-400">
            This password is randomly generated and securely stored.
          </p>
          <p
            className="text-lg mt-4 text-center text-gray-100"
            id="copyNote"
          ></p>
        </div>
      </div>
    </>
  );
}

export default App;
