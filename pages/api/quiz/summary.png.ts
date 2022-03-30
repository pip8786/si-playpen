import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(typeof req.query.grouped !== "string" || typeof req.query.labels !== "string") {
        res.status(400).end();
        return;
    }
    const total = paramNumber(req.query.total);
    const youPercent = paramNumber(req.query.you);
    const width = 765;
    const height = 400;
    const grouped = JSON.parse(req.query.grouped);
    const percents = grouped.map((c:number) => c/total);
    const colors = ["#4DB2BB","#02838E","#025661","#00363A"];
    const labels = JSON.parse(req.query.labels);
    const rectHeight = 140;
    const rectY = 210;

    let rectangles = "";
    let percentLabels = "";
    let textLabels = "";
    let currentX = 5;
    const rectangleTotalWidth = width - currentX * 2;
    for(let i = 0; i < percents.length; i++) {
        const rectWidth = percents[i] * rectangleTotalWidth;
        rectangles += `<rect fill="${colors[i]}" x="${currentX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}"/>`;
        textLabels += `<text class="cls-13" x="${currentX + rectWidth / 2}" y="${rectY-10}" text-anchor="middle">${labels[i]}</text>`
        percentLabels += `<text class="cls-12" x="${currentX + rectWidth / 2}" y="${rectY+rectHeight+35}" text-anchor="middle">${Math.round(percents[i]*100)}%</text>`
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
                    font-family: Inter,sans-serif;
                    font-weight: 500;
                }
                .cls-5, .cls-7 {
                    font-size: 27px;
                }
                .cls-5 {
                    font-family: Inter,sans-serif;
                }
                .cls-13, .cls-15, .cls-7 {
                    font-family: Inter,sans-serif;
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
    
        <text class="cls-3" transform="translate(19.5 63.96)">How do you compare?</text>
        <text class="cls-5" transform="translate(19.5 107.51)">Total Participants:</text>
        <text class="cls-7" transform="translate(242.52 107.51)">${total}</text>
        ${rectangles}
        ${percentLabels}
        ${textLabels}
        <text class="cls-15" x="${rectangleTotalWidth*youPercent}" y="160" text-anchor="middle">You</text>
        <line id="Line_14" class="cls-16" x1="${rectangleTotalWidth*youPercent}" y1="168" x2="${rectangleTotalWidth*youPercent}" y2="${168+rectHeight+(rectY - 168)+20}"/>
    </svg>
	`));


    const png = await test.toFormat("png").toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(png);
}

function paramNumber(param: string | string[], other: number = 0) {
    let num = NaN;
    if (typeof param === "string") {
        num = Number(param);
    } else if (param && param.length > 0) {
        num = Number(param[0]);
    }
    return isNaN(num) ? other : num;
}