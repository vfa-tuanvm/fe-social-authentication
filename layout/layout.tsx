"use client";

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

interface ILayout {
	children: React.ReactNode;
}

export default function Layout(props: ILayout) {
	const router = useRouter();
	const [language, setLanguage] = React.useState<string>("");

	const handleChange = (event: SelectChangeEvent) => {
		setLanguage(event.target.value as string);
		localStorage.setItem("language", event.target.value);
		router.push(router.asPath, router.asPath, { locale: event.target.value as string });
	};

	useEffect(() => {
		const lang = localStorage.getItem("language");
		setLanguage(lang ?? "en");
		router.push(router.asPath, router.asPath, { locale: lang ?? "en" });
	}, []);

	return (
		<Box component="div" className={roboto.className}>
			<FormControl sx={{ position: "absolute", top: "20px", left: "20px", width: "150px" }}>
				<InputLabel id="demo-simple-select-label">Language</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={language}
					label="Language"
					onChange={handleChange}
				>
					<MenuItem value={"en"}>English</MenuItem>
					<MenuItem value={"vi"}>Vietnamese</MenuItem>
				</Select>
			</FormControl>
			{props.children}
		</Box>
	);
}
