import { Box, Card, Grid, Switch, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../redux/redux-hook";
import { selectUser } from "../redux/slices/userSilce";
import Avatar from "@mui/material/Avatar";
import {
  IGetSocialAccountsResponse,
  IGraphQLError,
  ISocialAcount,
} from "../types/graphql.respose";
import { useEffect, useState } from "react";
import client from "../apollo-client";
import { GET_ACCOUNTS_QUERY } from "../graphql/home-page";
import toast from "react-hot-toast";
import { SocialType } from "../constance/enum";

export default function Home() {
  const user = useAppSelector(selectUser);
  const [socialAccounts, setSocialAccounts] = useState<ISocialAcount[]>([]);

  const fetchListAccounts = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const { data } = await client.query<IGetSocialAccountsResponse>({
        query: GET_ACCOUNTS_QUERY,
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      setSocialAccounts(data.getAccountsLinked);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { graphQLErrors } = error;

      if (graphQLErrors) {
        const { statusCode } = graphQLErrors[0] as IGraphQLError;
        console.log("statusCode: ", statusCode);

        switch (statusCode) {
          case 400:
            toast.error("You are unauthrorized");
            break;

          default:
            toast.error("Something went wrong");
            break;
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchListAccounts();
  }, []);

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
      <Card sx={{ width: "40%", padding: "16px", boxShadow: 3 }}>
        <Grid container rowSpacing="20px">
          {user.avatar && (
            <Grid item xs={12}>
              <Avatar
                alt="Remy Sharp"
                src={user.avatar}
                sx={{ width: 100, height: 100, marginX: "auto" }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Name"
              variant="outlined"
              value={user.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Email"
              variant="outlined"
              value={user.email}
            />
          </Grid>
          {Object.values(SocialType).map((e) => (
            <Grid item xs={6} key={e}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Switch
                  checked={
                    socialAccounts.find((acc) => acc.type === e) ? true : false
                  }
                />
                <Typography>{e}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
