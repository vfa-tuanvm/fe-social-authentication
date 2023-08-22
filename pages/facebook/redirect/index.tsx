import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FACEBOOK_LOGIN } from "../../../graphql/facebook";
import { useAppDispatch } from "../../../redux/redux-hook";
import { storeUser } from "../../../redux/slices/userSilce";
import { IFacebookLogin } from "../../../types/graphql.respose";
import client from "../../../apollo-client";
import { Box, Typography } from "@mui/material";
import { handleException } from "../../../utils/handleException";

export default function FacebookRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const code = searchParams.get("code");

  const handleLogin = async () => {
    try {
      const { data } = await client.mutate<IFacebookLogin>({
        mutation: FACEBOOK_LOGIN,
        variables: {
          code,
          redirectURL: process.env.FB_REDIRECT,
        },
      });

      if (data) {
        dispatch(storeUser(data.loginFacebook));
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleException(error);
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    if (code) {
      handleLogin();
    }
  }, [code]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingX: "20px",
          paddingY: "16px",
          borderRadius: "12px",
          columnGap: "16px",
          alignItems: "baseline",
        }}
      >
        <Typography variant="h5">Authenticating</Typography>
        <div className="dot-typing"></div>
      </Box>
    </Box>
  );
}
