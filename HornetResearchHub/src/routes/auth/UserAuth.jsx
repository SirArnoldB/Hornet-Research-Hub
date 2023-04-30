import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../../services/supabase/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./UserAuth.css";

const UserAuth = ({ view }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("Signing in now!");
      navigate("/", { replace: true });
    } else {
      console.log("Signing out now!");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const AuthCard = () => {
    return (
      <div className="auth">
        <Card className="auth-card">
          <CardContent
            className="auth-card-content"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              view={view}
              providers={["google"]}
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  return user === null ? <AuthCard /> : null;
};

export default UserAuth;
