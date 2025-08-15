// import React, { useState } from "react";
// import { register, login } from "./api";
// import "./Auth.css";

// function Auth({ onAuth }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = () => {
//     if (!username || !password) {
//       alert("Username and password are required");
//       return;
//     }

//     // Password validation (only for registration)
//     if (!isLogin) {
//       const passwordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//       if (!passwordRegex.test(password)) {
//         alert(
//           "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
//         );
//         return;
//       }
//     }

//     if (isLogin) {
//       login(username, password)
//         .then((res) => {
//           const { token, userId, username: nameFromApi } = res.data;
//           localStorage.setItem("token", token);
//           localStorage.setItem("userId", userId);
//           localStorage.setItem("username", nameFromApi || username);
//           onAuth(token, userId);
//         })
//         .catch((err) =>
//           alert(err.response?.data?.message || "Login failed")
//         );
//     } else {
//       register(username, password)
//         .then((res) => {
//           alert(res.data.message || "Registration successful");
//           setIsLogin(true);
//         })
//         .catch((err) =>
//           alert(err.response?.data?.message || "Registration failed")
//         );
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isLogin ? "Login" : "Register"}</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSubmit}>
//         {isLogin ? "Login" : "Register"}
//       </button>
//       <div style={{ textAlign: "center", marginTop: "1rem" }}>
//         {isLogin ? (
//           <>
//             Don't have an account?{" "}
//             <button onClick={() => setIsLogin(false)}>Register</button>
//           </>
//         ) : (
//           <>
//             Have an account?{" "}
//             <button onClick={() => setIsLogin(true)}>Login</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Auth;
import React, { useState } from "react";
import { register, login } from "./api";
import "./Auth.css";

function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    if (!isLogin) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        alert(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        );
        return;
      }
    }

    try {
      if (isLogin) {
        const res = await login(username, password);
        const { token, userId, username: nameFromApi } = res.data;

        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", nameFromApi || username);

        // Notify parent
        onAuth(token, userId);

        // Redirect to dashboard
        window.location.href = "/#/dashboard";
      } else {
        const res = await register(username, password);

        if (res.data && res.data.message) {
          alert(res.data.message); // Show success message
        } else {
          alert("Registration successful");
        }

        // Switch to login after registration
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Registration/Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)}>Register</button>
          </>
        ) : (
          <>
            Have an account?{" "}
            <button onClick={() => setIsLogin(true)}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}
try {
  const res = await register(username, password);
  console.log(res.data);
} catch(err) {
  console.error(err.response?.data);
}


export default Auth;
