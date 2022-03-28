import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(typeof req.query.percents !== "string") {
        res.status(400).end();
        return;
    }
    const total = paramInteger(req.query.total);
    const width = 765;
    const height = 400;
    const percents = JSON.parse(req.query.percents);
    const colors = ["#4DB2BB","#02838E","#025661","#00363A"];
    const labels = ["LOW", "AVERAGE", "HIGH", "EXCEPTIONAL"];
    const rectHeight = 140;
    const rectY = 210;

    let rectangles = "";
    let percentLabels = "";
    let textLabels = "";
    let currentX = 5;
    const rectangleTotalWidth = width - currentX * 2;
    for(let i = 0; i < percents.length; i++) {
        const rectWidth = percents[i]/100 * rectangleTotalWidth;
        rectangles += `<rect fill="${colors[i]}" x="${currentX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}"/>`;
        textLabels += `<text class="cls-13" x="${currentX + rectWidth / 2}" y="${rectY-10}" text-anchor="middle">${labels[i]}</text>`
        percentLabels += `<text class="cls-12" x="${currentX + rectWidth / 2}" y="${rectY+rectHeight+35}" text-anchor="middle">${percents[i]}%</text>`
        currentX += rectWidth;
    }

    const test = sharp(Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <defs>
            <style>
                .cls-3 {
                    font-size: 40px;
                }
                .cls-12, .cls-13, .cls-3, .cls-5, .cls-7 {
                    fill: #181818;
                }
                .cls-12, .cls-3 {
                    font-family: sans-serif;
                    font-weight: 500;
                }
                .cls-5, .cls-7 {
                    font-size: 27px;
                }
                .cls-5 {
                    font-family: sans-serif;
                }
                .cls-13, .cls-15, .cls-7 {
                    font-family: sans-serif;
                    font-weight: 700;
                }
                .cls-12, .cls-15 {
                    font-size: 31px;
                }
                .cls-13 {
                    font-size: 10px;
                }
                .cls-15 {
                    fill: #e82625; 
                }
                .cls-16 {
                    fill: none;
                    stroke: #e82625;
                    stroke-width: 4px;
                    stroke-dasharray: 4;
                }
            </style>
        </defs>
    
        <text class="cls-3" transform="translate(19.5 63.96)">HOW DO YOU COMPARE?</text>
        <text class="cls-5" transform="translate(19.5 107.51)">Total Participants:</text>
        <text class="cls-7" transform="translate(242.52 107.51)">${total}</text>
        ${rectangles}
        ${percentLabels}
        ${textLabels}
        <text class="cls-15" transform="translate(432.95 159.06)">YOU</text>
        <line id="Line_14" class="cls-16" x1="467.07" y1="167.09" x2="467.07" y2="373.82"/>
    </svg>
	`));


    const png = await test.toFormat("png").toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(png);
}

function paramInteger(param: string | string[], other: number = 0) {
    let num = NaN;
    if (typeof param === "string") {
        num = parseInt(param);
    } else if (param && param.length > 0) {
        num = parseInt(param[0]);
    }
    return isNaN(num) ? other : num;
}