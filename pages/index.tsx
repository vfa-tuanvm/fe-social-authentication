import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/redux-hook";
import { selectUser, storeUser } from "../redux/slices/userSilce";
import Avatar from "@mui/material/Avatar";
import { ISocialAcount } from "../types/graphql.respose";
import { useEffect, useState } from "react";
import { LoginLinkingOptions, SocialType } from "../constance/enum";
import { getAccounts, getUserInfo } from "../utils/home";
import { disconnect } from "../utils/home";
import { useRouter } from "next/router";
import { genURLFacebookLogin } from "../utils/facebook";
import { genURLGoogleLogin } from "../utils/google";

export default function Home() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [socialAccounts, setSocialAccounts] = useState<ISocialAcount[]>([]);
  const [open, setOpen] = useState(false);
  const [disconnectedType, setDisconnectedType] = useState<SocialType>();

  const handleClickOpen = (type: SocialType) => () => {
    setDisconnectedType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisconnectedType(undefined);
  };

  const fetchListAccounts = async () => {
    const respose = await getAccounts();
    if (respose) {
      setSocialAccounts(respose);
    }
  };

  const fetchUser = async () => {
    if (!user.avatar && !user.email && !user.fullName) {
      const respose = await getUserInfo();
      if (respose) {
        dispatch(storeUser(respose));
      }
    }
  };

  const handleDisconnect = async () => {
    if (disconnectedType) {
      const respose = await disconnect(disconnectedType);
      if (respose) {
        setSocialAccounts(socialAccounts.filter((acc) => acc.type !== respose));
      }
    }
    setOpen(false);
  };

  const handleConnect = (type: SocialType) => () => {
    let url = "";
    switch (type) {
      case SocialType.Facebook:
        url = genURLFacebookLogin(LoginLinkingOptions.Linking);
        break;
      case SocialType.Google:
        url = genURLGoogleLogin(LoginLinkingOptions.Linking);
        break;
      default:
        break;
    }

    if (url) {
      router.push(url);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/sign-in");
  };

  useEffect(() => {
    fetchListAccounts();
    fetchUser();
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
          <Grid item xs={12}>
            <Avatar
              alt="Remy Sharp"
              src={user.avatar ?? process.env.DEFAULT_AVATAR}
              sx={{ width: 100, height: 100, marginX: "auto" }}
            />
          </Grid>

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
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {mediaType.toLowerCase()}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  {socialAccounts.filter((acc) => acc.type === mediaType)
                    .length > 0 ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleClickOpen(mediaType)}
                      color="error"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConnect(mediaType)}
                      fullWidth
                      variant="contained"
                    >
                      Connect
                    </Button>
                  )}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            marginTop: "56px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleSignOut} variant="contained">
            Sign out
          </Button>
        </Box>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to disconnect to{" "}
          <Typography
            variant="h6"
            sx={{ textTransform: "capitalize", display: "inline" }}
          >
            {disconnectedType?.toLowerCase()}
          </Typography>
          ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You still be able to connect to{" "}
            <Typography sx={{ textTransform: "capitalize", display: "inline" }}>
              {disconnectedType?.toLowerCase()}
            </Typography>{" "}
            in the future.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDisconnect} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
