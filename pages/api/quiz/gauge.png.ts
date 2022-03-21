import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const min = paramInteger(req.query.min, 0);
	const max = paramInteger(req.query.max, 15);
	const value = paramInteger(req.query.value, 7);
	const gaugeFile = path.join(process.cwd(), "public/images/gauge.svg");
	const needleFile = path.join(process.cwd(), "public/images/needle.svg");
	const outputWidth = 450;
	const outputHeight = 225;
	const degrees = (value-min) / (max-min) * 180;
	const baseNeedleWidth = 166;
	const baseNeedleHeight = 48;
	const needleOriginX = 0.86144 * baseNeedleWidth;
	const needleOriginY = 0.50 * baseNeedleHeight;
	const [newWidth] = imageSizeAfterRotation([baseNeedleWidth, baseNeedleHeight], degrees);
	let [newOriginX, newOriginY] = imageSizeAfterRotation([needleOriginX, needleOriginY], degrees);
	if(degrees > 90) {
		newOriginX = newWidth-newOriginX;
	}
	const needle = sharp(needleFile)
		.rotate(degrees, {background: "transparent"});
	const gauge = sharp(gaugeFile).extend({background:"transparent", bottom: 25})
		.composite([
		{
			input: await needle.toBuffer(),
			left: Math.round(outputWidth / 2 - newOriginX),
			top: Math.round(outputHeight - newOriginY)
		}
		]);

	const png = await gauge.toFormat("png").toBuffer();

	res.status(200).send(png);
}

function paramInteger(param:string|string[], other:number = 0) {
	let num = NaN;
	if(typeof param === "string") {
		num = parseInt(param);
	} else if(param && param.length > 0) {
		num = parseInt(param[0]);
	}
	return isNaN(num) ? other : num;
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