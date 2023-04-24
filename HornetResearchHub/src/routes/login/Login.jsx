import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <Card className="login-card">
        <CardContent
          className="login-card-content"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              m: 1,
              border: 0.1,
              borderColor: "text.primary",
              p: 2,
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: "bold",
                color: "text.primary",
                m: 1,
              }}
            >
              Welcome to The Hornet Research Hub!
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: "bold",
                color: "text.primary",
                m: 1,
              }}
            >
              A collaborative platform for students and faculty to share
              research opportunities, mentorship, and stay up to date with the
              latest research activities at Alabama State University
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: "bold",
                color: "text.primary",
                m: 1,
              }}
            >
              Don't have an account?
            </Typography>
            <Button
              variant="contained"
              sx={{
                m: 1,
              }}
            >
              Register
            </Button>
          </Box>
          <Box
            sx={{
              bgcolor: "background.paper",
              m: 1,
              border: 0.1,
              borderColor: "text.primary",
              p: 2,
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Login
            </Typography>
            <form>
              <FormControl
                sx={{
                  m: 2,
                  width: "30ch",
                  marginTop: "2rem",
                }}
                variant="filled"
                required
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <FilledInput id="username" autoComplete="username" />
              </FormControl>
              <FormControl
                sx={{
                  m: 2,
                  width: "30ch",
                  marginTop: "2rem",
                }}
                variant="filled"
                required
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  m: 2,
                }}
              >
                Login
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
