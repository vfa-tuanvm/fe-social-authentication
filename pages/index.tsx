import { Box, Card, Grid, Switch, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../redux/redux-hook";
import { selectUser } from "../redux/slices/userSilce";
import Avatar from "@mui/material/Avatar";

export default function Home() {
  const user = useAppSelector(selectUser);

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
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                columnGap: "8px",
                alignItems: "center",
              }}
            >
              <Switch />
              <Typography>Facebook</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                columnGap: "8px",
                alignItems: "center",
              }}
            >
              <Switch />
              <Typography>Google</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
