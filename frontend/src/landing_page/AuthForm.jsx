import { useState } from "react";
import { Link } from "react-router-dom";

import { API_BASE_URL, DASHBOARD_URL } from "../config";
import "./AuthForm.css";

const AuthForm = ({ mode }) => {
  const isSignup = mode === "signup";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${mode}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup ? { username: username.trim(), email, password } : { email, password },
        ),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || `Unable to ${mode}. Please try again.`);
        return;
      }

      window.location.assign(DASHBOARD_URL);
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p>{isSignup ? "Sign up to get started." : "Log in to continue to your dashboard."}</p>

        {isSignup && (
          <label>
            Username
            <input
              autoComplete="username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              value={username}
            />
          </label>
        )}

        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label>
          Password
          <input
            autoComplete={isSignup ? "new-password" : "current-password"}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {error && <p className="auth-error" role="alert">{error}</p>}

        <button className="auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
        </button>

        <p className="auth-switch">
          {isSignup ? "Already have an account? " : "New to Zerodha? "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </form>
    </main>
  );
};

export default AuthForm;
