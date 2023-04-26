import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import supabase from "../../services/supabase/supabaseClient";
import "./RegisterInfo.css";
import { CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterInfo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleRegisterInfo = async (event) => {
    event.preventDefault();

    try {
      // Upload avatar to storage
      const user = supabase.auth.user();
      if (!user) return;

      const fileExt = avatar.name.split(".").pop();
      const filePath = `avatars/\${user.id}.\${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatar);

      if (uploadError) {
        console.log(uploadError.message);
        return;
      }

      // Get avatar URL
      const { publicURL } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update user information in public.users
      const { error: updateUserError } = await supabase
        .from("profiles")
        .update({
          name: name,
          username: username,
          avatar_url: publicURL,
        })
        .eq("id", user.id);

      if (updateUserError) {
        console.log(updateUserError.message);
        return;
      }

      // Navigate to the main app page after updating the user's information
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register-info">
      <Card className="register-info-card">
        <CardHeader title="Complete Registration" subheader="" />
        <CardContent className="register-info-card-content">
          <form onSubmit={handleRegisterInfo}>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
              <FormControl variant="filled" required>
                <InputLabel htmlFor="name">Name</InputLabel>
                <FilledInput
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
              <FormControl variant="filled" required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <FilledInput
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
              <FormControl required>
                <FilledInput
                  id="avatar"
                  type="file"
                  accept="image/*"
                  inputProps={{ display: "none" }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <FormHelperText id="avatar-helper-text">
                  Upload profile image (jpg, jpeg, or png)
                </FormHelperText>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  m: 2,
                }}
              >
                Finish
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterInfo;
