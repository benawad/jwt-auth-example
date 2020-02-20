import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Bye } from "./pages/Bye";
import { Header } from "./Header";

const XSS_XSRFVulnerabilty = () => {
  const [value, setValue] = useState(`
    <button
      onclick="
        fetch('http://localhost:4000/refresh_token', {
          method: 'POST',
          credentials: 'include',
        })
        .then(res => res.json())
        .then(res => alert(\`I have your access token\n\${res.accessToken}\`))
      ">
        XSS Vulnerability Button
      </button>
  `);

  return (
    <div>
      <textarea value={value} onChange={event => setValue(event.target.value)} />
      <div dangerouslySetInnerHTML={{ __html: value }}/>
    </div>
  )
};

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <XSS_XSRFVulnerabilty />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bye" component={Bye} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
