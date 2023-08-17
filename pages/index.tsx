import { Card, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../redux/redux-hook";
import { selectUser } from "../redux/slices/userSilce";
import Avatar from "@mui/material/Avatar";

export default function Home() {
  const user = useAppSelector(selectUser);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Card sx={{ width: "70%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginBottom: "1rem" }}
          >
            Name: {user.fullName ?? ""}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginBottom: "1rem" }}
          >
            Email: {user.email ?? ""}
          </Typography>
          {user.avatar && (
            <Avatar
              alt="Remy Sharp"
              src={user.avatar}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}
