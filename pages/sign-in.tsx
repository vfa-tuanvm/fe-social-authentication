import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { red } from "@mui/material/colors";
import React from "react";
import Link from "next/link";

export default function SignIn() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
              Sign In
            </Typography>
            <Typography variant="h6" sx={{ color: grey[700] }}>
              Have a nice day 🖐
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
          </Grid>

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{ marginTop: "32px" }}
          >
            Sign In
          </Button>

          <Divider sx={{ marginY: "16px" }}>
            <Typography variant="subtitle2">OR</Typography>
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: red[600],
                  ":hover": { backgroundColor: red[800] },
                }}
                variant="contained"
                startIcon={<GoogleIcon />}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FacebookOutlinedIcon />}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>

          <Typography variant="body2" mt="20px" sx={{ textAlign: "center" }}>
            Do not have an account?{" "}
            <Link style={{ color: theme.palette.primary.main }} href="/sign-up">
              Sign up here.
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
