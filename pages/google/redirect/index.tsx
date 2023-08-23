import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../redux/redux-hook";
import { storeUser } from "../../../redux/slices/userSilce";
import { IGoogleLogin } from "../../../types/graphql.respose";
import client from "../../../apollo-client";
import { Box, Typography } from "@mui/material";
import { GOOGLE_LOGIN } from "../../../graphql/google";
import { LoginLinkingOptions, SocialType } from "../../../constance/enum";
import { connect, storeToken } from "../../../utils/home";
import useTrans from "../../../lang/lang-hook";

export default function GoogleRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const trans = useTrans();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const handleLogin = async () => {
    const { data } = await client.mutate<IGoogleLogin>({
      mutation: GOOGLE_LOGIN,
      variables: {
        input: code,
      },
    });

    if (data) {
      const { avatar, fullName, email, accessToken, refreshToken } =
        data.loginGoogle;
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
          connect(trans, SocialType.Google, code).then(() => {
            router.push("/");
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography variant="h5">{trans.signIn.authen}</Typography>
        <div className="dot-typing"></div>
      </Box>
    </Box>
  );
}
