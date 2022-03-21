import {NextApiRequest, NextApiResponse} from "next";
import sharp from "sharp";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const test = sharp(Buffer.from(`
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655.27 424.64">
    <defs>
        <style>
            .cls-1 {
            fill: #e2f3f8;
            }
            .cls-3 {
            font-size: 40px;
            }
            .cls-12, .cls-13, .cls-3, .cls-5, .cls-7 {
            fill: #181818;
            }
            .cls-12, .cls-3 {
            font-family: HelveticaNeue-Medium, HelveticaNeue;
            font-weight: 500;
            }
            .cls-4 {
            letter-spacing: -0.07em;
            }
            .cls-5, .cls-7 {
            font-size: 27px;
            }
            .cls-5 {
            font-family: HelveticaNeue, Helvetica Neue;
            }
            .cls-6 {
            letter-spacing: -0.11em;
            }
            .cls-13, .cls-15, .cls-7 {
            font-family: HelveticaNeue-Bold, HelveticaNeue;
            font-weight: 700;
            }
            .cls-8 {
            fill: #02838e;
            }
            .cls-9 {
            fill: #025661;
            }
            .cls-10 {
            fill: #4db2bb;
            }
            .cls-11 {
            fill: #00363a;
            }
            .cls-12, .cls-15 {
            font-size: 31px;
            }
            .cls-13 {
            font-size: 10px;
            }
            .cls-14 {
            letter-spacing: -0.05em;
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
    <g id="How_do_you_compare_" class="cls-2">
        <text class="cls-3" transform="translate(19.5 63.96)">HOW DO YOU COMPARE?</text>
    </g>
    <g id="Total_Participants:_245" class="cls-2">
        <text class="cls-5" transform="translate(19.5 107.51)">Total Participants:</text>
        <text class="cls-7" transform="translate(242.52 107.51)">245</text>
    </g>
    <rect id="Rectangle_812" class="cls-8" x="105.96" y="209.02" width="157.97" height="140.41"/>
    <rect id="Rectangle_813" class="cls-9" x="264.16" y="209.02" width="269.13" height="140.41"/>
    <rect id="Rectangle_814" class="cls-10" x="19.37" y="209.02" width="85.81" height="140.41"/>
    <rect id="Rectangle_815" class="cls-11" x="533.66" y="209.02" width="85.81" height="140.41"/>
    <g class="cls-2">
        <text class="cls-12" transform="translate(29.54 395.04)">10%</text>
    </g>
    <g class="cls-2">
        <text class="cls-12" transform="translate(152.21 395.04)">30%</text>
    </g>
    <g class="cls-2">
        <text class="cls-12" transform="translate(365.99 395.04)">50%</text>
    </g>
    <g id="_10_2" class="cls-2">
        <text class="cls-12" transform="translate(543.83 395.04)">10%</text>
    </g>
    <g id="LOW" class="cls-2">
        <text class="cls-13" transform="translate(50.7 201.62)">LOW</text>
    </g>
    <g id="AVGERAGE" class="cls-2">
        <text class="cls-13" transform="translate(157.52 200.62)">AVERAGE</text>
    </g>
    <g id="HIGH" class="cls-2">
        <text class="cls-13" transform="translate(386.05 200.62)">HIGH</text>
    </g>
    <g id="EXTREME" class="cls-2">
        <text class="cls-13" transform="translate(541.19 202.57)">EXCEPTIONAL</text>
    </g>
    <g id="YOU" class="cls-2">
        <text class="cls-15" transform="translate(432.95 159.06)">YOU</text>
    </g>
    <line id="Line_14" class="cls-16" x1="467.07" y1="167.09" x2="467.07" y2="373.82"/>
</svg>
	`));


    const png = await test.toFormat("png").toBuffer();

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