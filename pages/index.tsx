import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
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
      <Card
        sx={{
          width: "35%",
          padding: "40px",
          boxShadow: 3,
          borderRadius: "12px",
        }}
      >
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
          {Object.values(SocialType).map((mediaType) => (
            <Grid item xs={12} key={mediaType}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Grid item xs={8}>
                  <Typography>{mediaType}</Typography>
                </Grid>

                <Grid item xs={4}>
                  {socialAccounts.filter((acc) => acc.type === mediaType)
                    .length > 0 ? (
                    <Button fullWidth variant="contained" color="error">
                      Disconnect
                    </Button>
                  ) : (
                    <Button fullWidth variant="contained">
                      Connect
                    </Button>
                  )}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
