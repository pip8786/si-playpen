import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type GaugeProps = {
	level: number
	max: number
}

export default function Gauge({level,max}:GaugeProps) {
	const degrees = level / max * 180;
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			flex:1
		}}>
			<Typography variant="h4" sx={{
				width: "100%",
			}}>Your Curiosity Rating:</Typography>
			<Box sx={{
				position: "relative",
				width: 450,
				height: 245
			}}>
				<img src="/images/gauge.svg" alt={`4 part gauge showing a min of 0 and max of ${max}`} style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				}}/>
				<img src="/images/needle.svg" alt={`Gauge needle pointing to ${level}`} style={{
					position: "absolute",
					width: 165,
					height: 70,
					transformOrigin: "140px 40px",
					transform: `rotate(${degrees}deg)`,
					bottom: -20,
					left: 85
				}}/>
			</Box>
			<Typography variant="h3" align="center" marginTop="14px" marginBottom="5px">{level}</Typography>
		</Box>
	);
}