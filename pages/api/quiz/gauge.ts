import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const gaugeFile = path.join(process.cwd(), "public/images/gauge.svg");
	const needleFile = path.join(process.cwd(), "public/images/needle.svg");
	const outputWidth = 450;
	const outputHeight = 220;
	const degrees = 90;
	const baseNeedleWidth = 166;
	const baseNeedleHeight = 48;
	const needleOriginX = 0.86144 * baseNeedleWidth;
	const needleOriginY = 0.50 * baseNeedleHeight;
	const [newWidth, newHeight] = imageSizeAfterRotation([baseNeedleWidth, baseNeedleHeight], degrees);
	let [newOriginX, newOriginY] = imageSizeAfterRotation([needleOriginX, needleOriginY], degrees);
	if(degrees > 90) {
		newOriginX = baseNeedleWidth-newOriginX;
	}
	// const top = outputHeight - (newHeight - newOriginY) - 20;
	//console.log(newWidth, newHeight, newOriginX, newOriginY, outputHeight - newOriginY);
	const needle = sharp(needleFile)
		.rotate(degrees, {background: "transparent"})
		.resize(newWidth, newHeight, {fit:"inside", background: "transparent"});
	const gauge = sharp(gaugeFile)
		.resize(outputWidth, outputHeight, {fit:"inside", background: "transparent"});
	const comp = sharp({
		create: {
			width: outputWidth,
			height: outputHeight + 20,
			channels: 4,
			background: "transparent"
		}
	}).composite([
		{
			input: await gauge.toBuffer(),
			left: 0,
			top: 0
		},
		{
			input: await needle.toBuffer(),
			left: Math.round(outputWidth / 2 - newOriginX),
			top: Math.round(outputHeight - newOriginY)
		}
		]);

	const png = await comp.toFormat("png").toBuffer();

	res.status(200).send(png);
}

function imageSizeAfterRotation(size:number[], degrees:number) {
	degrees = degrees % 180;
	if (degrees < 0) {
		degrees = 180 + degrees;
	}
	if (degrees >= 90) {
		size = [ size[1], size[0] ];
		degrees = degrees - 90;
	}
	if (degrees === 0) {
		return size;
	}
	const radians = degrees * Math.PI / 180;
	const width = (size[0] * Math.cos(radians)) + (size[1] * Math.sin(radians));
	const height = (size[0] * Math.sin(radians)) + (size[1] * Math.cos(radians));
	return [ Math.round(width), Math.round(height) ];
}