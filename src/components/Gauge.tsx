import React, {useEffect, useLayoutEffect, useState, useRef} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SegmentedCircle from "./SegmentedCircle";
import { useDimensionObserver } from "src/hooks/useDimensionObserver";

export type GaugeProps = {
	level: number
	max: number
	min?:  number
}

export default function Gauge({level,max, min=0}:GaugeProps) {
	const [degrees, setDegrees] = useState(0);
	const el = useRef<HTMLDivElement | null>(null);
	const {width, height} = useDimensionObserver(el);

	//segmntedCircleWidth is ~60% of referenced box (el) width */}
	//segmentedCircleHeight is the half segmentedCircleWidth width*/}
	const segmentedCircleWidth = Math.round(width*0.6356);
	const segmentedCircleHeight = Math.round((width*.6356)/2);

	const needleWidth =  Math.round(width*0.2344);
	const needleHeight = Math.round(height*0.123);

	useEffect(() => {
		setDegrees((level-min) / (max-min) * 180);
	},[level, max, min]);
	return (
		<Box ref={el} sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			flex: 1
		}}>
			<Typography variant="h4" sx={{
				width: "100%",
			}}>Your curiosity rating:</Typography>
					<Box sx={{
						mt: 2,
						position: "relative",
						width: `${segmentedCircleWidth}`, 
						height: `${segmentedCircleHeight}`
					}}>
					
					<SegmentedCircle innerRadius={segmentedCircleWidth*0.067} outerRadius={segmentedCircleHeight} spacing={Math.round(segmentedCircleWidth*0.00889)} />

					<img src="/images/needle.svg" alt={`Gauge needle pointing to ${level}`} style={{
					position: "absolute",
					width: needleWidth,
					height: needleHeight,
					transformOrigin: `${0.86144 * needleWidth}px ${0.5 * needleHeight}px`,
					transform: `rotate(${degrees}deg)`,
					transition: "transform 1s 250ms",
					bottom: -5,
					left: needleWidth/2
					}}/>
					</Box>
			<Typography variant="h3" align="center" marginTop="14px" marginBottom="5px">{level}</Typography>
		</Box>
	);
}