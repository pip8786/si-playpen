import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const gaugeFile = path.join(process.cwd(), "public/images/gauge.svg");
	const needleFile = path.join(process.cwd(), "public/images/needle.svg");
	const outputWidth = 450;
	const outputHeight = 245;
	const degrees = 30;
	const baseNeedleWidth = 165;
	const baseNeedleHeight = 70;
	const needleOriginX = 140;
	const needleOriginY = 40;
	const [newWidth, newHeight] = imageSizeAfterRotation([baseNeedleWidth, baseNeedleHeight], degrees);

	const radians = degrees * Math.PI / 180;
	const newWOld = Math.round(baseNeedleWidth * Math.cos(radians) + baseNeedleHeight * Math.sin(radians));
	const newHOld = Math.round(baseNeedleHeight * Math.cos(radians) + baseNeedleWidth * Math.sin(radians));
	// const newOriginX = Math.round(needleOriginX * Math.cos(radians) + needleOriginX * Math.sin(radians));
	// const newOriginY = Math.round(needleOriginY * Math.cos(radians) + needleOriginY * Math.sin(radians));
	// const top = outputHeight - (newHeight - newOriginY) - 20;
	console.log(newWidth, newHeight, newWOld, newHOld);
	const needle = sharp(needleFile)
		.rotate(degrees, {background: "transparent"})
		.resize(newWidth, newHeight, {fit:"contain", background: "transparent"});
	const gauge = sharp(gaugeFile)
		.resize(outputWidth, outputHeight)
		.extend({bottom: 20, background: "transparent"})
		.composite([
			{
				input: await needle.toBuffer(),
			}
		]);

	const png = await gauge.toFormat("png").toBuffer();

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