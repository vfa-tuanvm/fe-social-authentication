import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../redux/redux-hook";
import { storeUser } from "../../../redux/slices/userSilce";
import { IGoogleLogin } from "../../../types/graphql.respose";
import client from "../../../apollo-client";
import { Box, Typography } from "@mui/material";
import { GOOGLE_LOGIN } from "../../../graphql/google";
import { handleException } from "../../../utils/handleException";

export default function GoogleRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const code = searchParams.get("code");

  const handleLogin = async () => {
    try {
      const { data } = await client.mutate<IGoogleLogin>({
        mutation: GOOGLE_LOGIN,
        variables: {
          input: code,
        },
      });

      if (data) {
        dispatch(storeUser(data.loginGoogle));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
