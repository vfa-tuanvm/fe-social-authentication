// import { Inter } from "next/font/google";
import { Typography } from "@mui/material";
import { useAppSelector } from "../redux/redux-hook";
import { selectUser } from "../redux/slices/userSilce";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: "1rem" }}>
        Name: {user.fullName ?? ""}
      </Typography>
      <Typography variant="h6" component="div" sx={{ marginBottom: "1rem" }}>
        Name: {user.email ?? ""}
      </Typography>
      <Typography variant="h6" component="div" sx={{ marginBottom: "1rem" }}>
        Name: {user.avatar ?? ""}
      </Typography>
    </>
  );
}
