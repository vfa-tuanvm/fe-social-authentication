// import { Inter } from "next/font/google";
import { Typography } from "@mui/material";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: "1rem" }}>
        Welcome to NextJS
      </Typography>
    </>
  );
}
