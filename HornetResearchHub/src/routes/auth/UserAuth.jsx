import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../../services/supabase/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import "./UserAuth.css";

const UserAuth = ({ view }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuthStateChange = async (event) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      if (event === "SIGNED_IN") {
        dispatch(setUser(user));
        navigate("/", { replace: true });
      } else if (event === "SIGNED_UP") {
        dispatch(setUser(user));
        navigate("/login", { replace: true });
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, dispatch]);

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

export default UserAuth;
