import { useState, useEffect } from "react";

import ConsumerRegistration from "./flows/ConsumerRegistration.jsx";
import ConsumerLogin from "./flows/ConsumerLogin.jsx";
import ConsumerHome from "./screens/ConsumerHome.jsx";

import MerchantHome from "./screens/MerchantHome.jsx";

import { getUser } from "./services/userService";
import { getSession } from "./Utils/Session";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setUser(getUser());
    setSession(getSession());
  }, []);

  // No user stored → show registration
  if (!user) {
    return (
      <ConsumerRegistration
        onComplete={() => {
          setUser(getUser());
        }}
      />
    );
  }

  // User exists but no session → show login
  if (!session) {
    return (
      <ConsumerLogin
        onComplete={() => setSession(getSession())}
        onRegister={() => {
          localStorage.removeItem("ht_user");
          setUser(null);
        }}
      />
    );
  }

  // User logged in → route by role
  if (user.role === "merchant") {
    return <MerchantHome />;
  }

  return <ConsumerHome />;
}

