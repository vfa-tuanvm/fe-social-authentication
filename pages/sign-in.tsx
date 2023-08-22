import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { red } from "@mui/material/colors";
import React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { ISignIn } from "../types/form.type";
import { SIGNIN_MUTATION } from "../graphql/sign-in";
import client from "../apollo-client";
import { ISignInResponse } from "../types/graphql.respose";
import { useAppDispatch } from "../redux/redux-hook";
import { storeUser } from "../redux/slices/userSilce";
import { useRouter } from "next/navigation";
import { genURLFacebookLogin } from "../utils/facebook";
import { genURLGoogleLogin } from "../utils/google";
import { handleException } from "../utils/handleException";

export default function SignIn() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const { control, handleSubmit } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (value: ISignIn) => {
    try {
      const { data } = await client.mutate<ISignInResponse>({
        mutation: SIGNIN_MUTATION,
        variables: {
          email: value.email,
          password: value.password,
        },
      });

      if (data) {
        dispatch(storeUser(data.signin));
      }

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleException(error);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      helperText={error ? error.message : null}
                      error={invalid}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value:
                          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: "Password too weak",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, error },
                    }) => (
                      <>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          value={value}
                          onChange={onChange}
                          error={invalid}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        {invalid && (
                          <FormHelperText error>
                            {error?.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginTop: "32px" }}
            >
              Sign In
            </Button>
          </form>
          <Divider sx={{ marginY: "16px" }}>
            <Typography variant="subtitle2">OR</Typography>
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MuiLink
                href={genURLFacebookLogin()}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1,
                  py: "6px",
                  columnGap: "1rem",
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <FacebookOutlinedIcon />
                Facebook
              </MuiLink>
            </Grid>
            <Grid item xs={6}>
              <MuiLink
                href={genURLGoogleLogin("login")}
                sx={{
                  backgroundColor: red[700],
                  borderRadius: 1,
                  py: "6px",
                  columnGap: "1rem",
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: red[900],
                  },
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <GoogleIcon />
                Googlle
              </MuiLink>
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
