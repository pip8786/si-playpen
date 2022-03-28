import React, {useEffect, useLayoutEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SegmentedCircle from "./SegmentedCircle";

export type GaugeProps = {
	level: number
	max: number
	min?:  number
}

export default function Gauge({level,max, min=0}:GaugeProps) {
	const [degrees, setDegrees] = useState(0);
	useEffect(() => {
		setDegrees((level-min) / (max-min) * 180);
	},[level, max, min]);
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			flex:1
		}}>
			<Typography variant="h4" sx={{
				width: "100%",
			}}>Your curiosity rating:</Typography>
			<Box sx={{
				mt: 2,
				position: "relative",
				width: 450,
				height: 245
			}}>
				<SegmentedCircle />

				<img src="/images/needle.svg" alt={`Gauge needle pointing to ${level}`} style={{
					position: "absolute",
					width: 166,
					height: 48,
					transformOrigin: `${0.86144 * 166}px ${0.5 * 48}px`,
					transform: `rotate(${degrees}deg)`,
					transition: "transform 1s 250ms",
					bottom: 0,
					left: 166/2
				}}/>
			</Box>
			<Typography variant="h3" align="center" marginTop="14px" marginBottom="5px">{level}</Typography>
		</Box>
	);
}