import React, {useEffect, useLayoutEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SegmentedCircleProps = {
	innerRadius?:number
	outerRadius?:number
	colors?:string[]
	segments?:number
	spacing?:number
}

export default function SegmentedCircle({innerRadius = 30, outerRadius = 225, colors = ["#4DB2BB","#02838E","#025661","#00363A"], segments = 4, spacing = 4}:SegmentedCircleProps) {
	return (
		<svg width={outerRadius*2} height={outerRadius} viewBox={`0 0 ${outerRadius*2} ${outerRadius}`}>
			<g transform={`translate(${outerRadius},${outerRadius})`}>
				<Segments startAngle={270} endAngle={90}
						  innerRadius={innerRadius} outerRadius={outerRadius}
						  segmentCount={segments} spacing={spacing} colors={colors}/>
			</g>
		</svg>

	);
}

type SegmentsProps = {
	startAngle: number
	endAngle: number
	innerRadius: number
	outerRadius: number
	segmentCount: number
	spacing: number
	colors: string[]
}

function Segments({startAngle, endAngle, innerRadius, outerRadius, segmentCount, spacing, colors}:SegmentsProps) {
	let totalLengthDegrees;
	let radians = Math.PI / 180;
	if(startAngle > endAngle) {
		totalLengthDegrees = 360 - startAngle + endAngle;
	} else {
		totalLengthDegrees = endAngle - startAngle;
	}

	const outerLength = radians * totalLengthDegrees * outerRadius;
	const innerLength = radians * totalLengthDegrees * innerRadius;
	const spaces = segmentCount - 1;

	const outerSegmentLength = (outerLength - spaces * spacing) / segmentCount;
	const innerSegmentLength = (innerLength - spaces * spacing) / segmentCount;

	const outerSegmentDegrees = outerSegmentLength / (outerRadius * radians);
	const innerSegmentDegrees = innerSegmentLength / (innerRadius * radians);

	const outerSpacingDegrees = spacing / (outerRadius * radians);
	const innerSpacingDegrees = spacing / (innerRadius * radians);

	const segments = [];
	let innerAngle = startAngle;
	let outerAngle = startAngle;
	for(let i = 0; i < segmentCount; i++) {
		const innerDesc:ArcDesc = {
			radius: innerRadius,
			startAngle: innerAngle,
			endAngle: innerAngle+innerSegmentDegrees,
		};
		const outerDesc = {
			radius: outerRadius,
			startAngle: outerAngle,
			endAngle: outerAngle+outerSegmentDegrees,
		};
		innerAngle = (innerAngle + innerSegmentDegrees + innerSpacingDegrees) % 360;
		outerAngle = (outerAngle + outerSegmentDegrees + outerSpacingDegrees) % 360;
		segments.push(<Segment key={i} outerDesc={innerDesc} innerDesc={outerDesc} color={colors[i % colors.length]}/>)
	}

	return <>{segments}</>;
}

type SegmentProps = {
	outerDesc:ArcDesc
	innerDesc:ArcDesc
	color: string
}

function Segment({innerDesc, outerDesc, color}:SegmentProps) {
	return <path d={describeArc(0,0, outerDesc, innerDesc)} fill={color}/>;
}
function polarToCartesian(centerX:number, centerY:number, radius:number, angleInDegrees:number) {
	const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

type ArcDesc = {
	radius: number
	startAngle: number
	endAngle: number
}

function describeArc(x:number, y:number, outerDesc: ArcDesc, innerDesc:ArcDesc){
	const inner = stuff(x, y, innerDesc);
	const outer = stuff(x, y, outerDesc);
	return [
		"M", inner.start.x, inner.start.y,
		"A", innerDesc.radius, innerDesc.radius, 0, inner.largeArcFlag, 0, inner.end.x, inner.end.y,
		"L", outer.end.x, outer.end.y,
		"A", outerDesc.radius, outerDesc.radius, 0, outer.largeArcFlag, 1, outer.start.x, outer.start.y,
		"Z"
	].join(" ");
}

function stuff(x: number, y:number, desc:ArcDesc) {
	return {
		largeArcFlag: desc.endAngle - desc.startAngle <= 180 ? "0" : "1",
		start: polarToCartesian(x, y, desc.radius, desc.endAngle),
		end: polarToCartesian(x, y, desc.radius, desc.startAngle)
	};
}