import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setErrorMessage("Username and Password are required!");
      setShowMessage(true);
    } else {
      const response = await login(username, password);
      
      if (response) {
        navigate('/inventory');
      } else {
        setErrorMessage("Invalid username or password.");
        setShowMessage(true);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-black text-white font-sans">
      <div className="border border-blue-600 m-5 p-8 rounded shadow-lg w-[400px] max-w-full">
        <div className="text-3xl text-black text-black-400 font-bold text-center mb-6">LOG IN</div>

        {showMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-black text-black-300 font-medium mb-2">Username:</label>
          <input 
            id="username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-600 text-gray-800"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block  text-black text-black-300 font-medium mb-2">Password:</label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-600 text-gray-800"
          />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleLogin} 
            className="bg-blue-400 text-black font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
