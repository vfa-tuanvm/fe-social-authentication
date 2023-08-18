import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../redux/redux-hook";
import { selectUser } from "../redux/slices/userSilce";
import Avatar from "@mui/material/Avatar";
import { ISocialAcount } from "../types/graphql.respose";
import { useEffect, useState } from "react";
import { SocialType } from "../constance/enum";
import { getAccounts } from "../utils/home";

export default function Home() {
  const user = useAppSelector(selectUser);
  const [socialAccounts, setSocialAccounts] = useState<ISocialAcount[]>([]);

  const fetchListAccounts = async () => {
    const respose = await getAccounts();
    if (respose) {
      setSocialAccounts(respose);
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
