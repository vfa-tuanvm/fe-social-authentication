import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FACEBOOK_LOGIN } from "../../../graphql/facebook";
import { useAppDispatch } from "../../../redux/redux-hook";
import { storeUser } from "../../../redux/slices/userSilce";
import { IFacebookLogin } from "../../../types/graphql.respose";
import client from "../../../apollo-client";
import { Box, Typography } from "@mui/material";
import { connect, storeToken } from "../../../utils/home";
import { LoginLinkingOptions, SocialType } from "../../../constance/enum";

export default function FacebookRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const handleLogin = async () => {
    const { data } = await client.mutate<IFacebookLogin>({
      mutation: FACEBOOK_LOGIN,
      variables: {
        code,
        redirectURL: process.env.FB_REDIRECT,
      },
    });

    if (data) {
      const { avatar, fullName, email, accessToken, refreshToken } =
        data.loginFacebook;
      dispatch(storeUser({ avatar, fullName, email }));
      storeToken(accessToken, refreshToken);
      router.push("/");
    }
  };

  useEffect(() => {
    if (code && state) {
      switch (state) {
        case LoginLinkingOptions.Login:
          handleLogin();
          break;
        case LoginLinkingOptions.Linking:
          connect(SocialType.Facebook, code, process.env.FB_REDIRECT).then(
            () => {
              router.push("/");
            },
          );
          break;

        default:
          break;
      }
    }
  }, [code, state]);

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
