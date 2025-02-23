import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
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
    navigator.clipboard.writeText(password);

    document.getElementById("copyNote").innerText = "Copied!";
    setTimeout(() => {
      document.getElementById("copyNote").innerText = "";
    }, 2000);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <div className="w-full max-w-lg bg-gray-800 shadow-xl rounded-xl p-8 text-orange-400 border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Secure Password Generator
        </h1>
        <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden shadow mb-4 border border-gray-700">
          <input
            type="text"
            className="w-full px-4 py-3 text-lg bg-transparent text-white outline-none"
            value={password}
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-4 font-semibold rounded-r-lg cursor-pointer"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col space-y-4 text-white text-sm">
          <div className="flex items-center justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer accent-orange-500"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">Include Numbers</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              className="cursor-pointer accent-orange-500"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">Include Special Characters</label>
            <input
              type="checkbox"
              checked={charAllowed}
              className="cursor-pointer accent-orange-500"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
        <button
          className="w-full mt-6 bg-orange-500 hover:bg-orange-400 text-white text-lg py-3 rounded-lg shadow-lg font-semibold transition-all cursor-pointer"
          onClick={generatePassword}
        >
          Generate New Password
        </button>
        <p className="text-center text-gray-400 mt-4 text-sm italic">
          Your password is randomly generated and securely copied to clipboard.
        </p>
        <p
          className="text-lg mt-4 text-center text-green-400 font-semibold"
          id="copyNote"
        ></p>
      </div>
    </div>
  );
}

export default App;
