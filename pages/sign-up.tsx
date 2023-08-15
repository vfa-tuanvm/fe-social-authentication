import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepassword, setShowRepassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepassword = () => setShowRepassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Card
        sx={{ width: "30%", marginX: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Box mb="40px">
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", color: grey[800] }}
            >
              Sign Up
            </Typography>
            <Typography variant="h6" sx={{ color: grey[700] }}>
              Welcome to our website 👋
            </Typography>
          </Box>

          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
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
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Re-password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showRepassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRepassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showRepassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Re-password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{ marginTop: "32px" }}
          >
            Sign up
          </Button>
          <Typography variant="body2" mt="20px" sx={{ textAlign: "center" }}>
            If you have an account,{" "}
            <Link style={{ color: theme.palette.primary.main }} href="/sign-in">
              Sign in here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
