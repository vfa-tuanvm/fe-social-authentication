/* eslint-disable @typescript-eslint/no-explicit-any */
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ISignUp } from "../types/form.type";
import client from "../apollo-client";
import { SIGNUP_MUTATION } from "../graphql/sign-up";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../redux/redux-hook";
import { IGraphQLError, ISignUpResponse } from "../types/graphql.respose";
import { storeUser } from "../redux/slices/userSilce";
import { useRouter } from "next/router";
import { storeToken } from "../utils/home";
import useTrans from "../lang/lang-hook";

export default function SignUp() {
  const theme = useTheme();
  const router = useRouter();
  const trans = useTrans();

  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm<ISignUp>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      rePassword: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (value: ISignUp) => {
    try {
      const { data } = await client.mutate<ISignUpResponse>({
        mutation: SIGNUP_MUTATION,
        variables: {
          email: value.email,
          password: value.password,
          fullName: value.fullName,
        },
      });

      if (data) {
        const { avatar, fullName, email, accessToken, refreshToken } =
          data.signup;
        dispatch(storeUser({ avatar, fullName, email }));
        storeToken(accessToken, refreshToken);
        router.push("/");
      }
    } catch (error: any) {
      const { graphQLErrors } = error;

      if (graphQLErrors) {
        const { statusCode } = graphQLErrors[0] as IGraphQLError;

        switch (statusCode) {
          case 409:
            toast.error(trans.error.usedEmail);
            break;
          default:
            toast.error(trans.error.sthWrong);
            break;
        }
      } else {
        toast.error(trans.error.sthWrong);
      }
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
              {trans.signUp.title}
            </Typography>
            <Typography variant="h6" sx={{ color: grey[700] }}>
              {trans.signUp.subTitle} 👋
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
                      message: trans.validation.requiredEmail,
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={invalid}
                      helperText={error ? error.message : null}
                      id="outlined-basic"
                      label={trans.component.input.email}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: trans.validation.requiredFullName,
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      error={invalid}
                      helperText={error ? error.message : null}
                      value={value}
                      onChange={onChange}
                      id="outlined-basic"
                      label={trans.component.input.name}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">
                    {trans.component.input.password}
                  </InputLabel>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: {
                        value: true,
                        message: trans.validation.requiredPass,
                      },
                      pattern: {
                        value:
                          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message: trans.validation.weakPass,
                      },
                    }}
                    render={({
                      field: { value, onChange },
                      fieldState: { error, invalid },
                    }) => (
                      <>
                        <OutlinedInput
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={value}
                          onChange={onChange}
                          error={invalid}
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
                          label={trans.component.input.password}
                        />
                        {error && (
                          <FormHelperText error>{error.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="re-password">
                    {trans.component.input.rePassword}
                  </InputLabel>
                  <Controller
                    control={control}
                    name="rePassword"
                    rules={{
                      required: {
                        value: true,
                        message: trans.validation.requiredRePass,
                      },
                      validate: (val: string) => {
                        if (watch("password") != val) {
                          return trans.validation.notMatchPass;
                        }
                      },
                    }}
                    render={({
                      field: { value, onChange },
                      fieldState: { error, invalid },
                    }) => (
                      <>
                        <OutlinedInput
                          id="re-password"
                          type={showPassword ? "text" : "password"}
                          error={invalid}
                          onChange={onChange}
                          value={value}
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
                          label={trans.component.input.rePassword}
                        />
                        {error && (
                          <FormHelperText error>{error.message}</FormHelperText>
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
              {trans.component.button.signUp}
            </Button>
          </form>
          <Typography variant="body2" mt="20px" sx={{ textAlign: "center" }}>
            {trans.signUp.haveAccount},{" "}
            <Link style={{ color: theme.palette.primary.main }} href="/sign-in">
              {trans.signUp.signInHere}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
