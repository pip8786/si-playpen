import React from "react";
import styles from "./summary.module.css";
import {QuizSummary} from "../context/QuizContext";

export default function Summary({grouped, labels, youRange, total}:QuizSummary) {
    const width = 765;
    const height = 400;
    const percents = grouped.map((c:number) => c/total);
    const colors = ["#4DB2BB","#02838E","#025661","#00363A"];
    const rectHeight = 140;
    const rectY = 210;

    let rectangles = [];
    let percentLabels = [];
    let textLabels = [];
    let currentX = 5;
    const rectangleTotalWidth = width - currentX * 2;
    for(let i = 0; i < percents.length; i++) {
        const rectWidth = percents[i] * rectangleTotalWidth;
        rectangles.push(<rect key={`rect${i}`} fill={colors[i]} x={currentX} y={rectY} width={rectWidth} height={rectHeight}/>);
        textLabels.push(<text key={`text${i}`} className={styles.segmentLabel} x={currentX + rectWidth / 2} y={rectY-10} textAnchor="middle">{labels[i]}</text>);
        percentLabels.push(<text key={`perc${i}`} className={styles.percentLabel} x={currentX + rectWidth / 2} y={rectY+rectHeight+35} textAnchor="middle">{Math.round(percents[i]*100)}%</text>);
        currentX += rectWidth;
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
            <text className={styles.compare} transform="translate(19.5 63.96)">How do you compare?</text>
            <text className={styles.total} transform="translate(19.5 107.51)">Total Participants:</text>
            <text className={styles.totalNumber} transform="translate(242.52 107.51)">{total}</text>
            {rectangles}
            {percentLabels}
            {textLabels}
            {youRange && <>
                <text className={styles.youText} x={5+(youRange[1]+youRange[0])/2*rectangleTotalWidth} y={200} textAnchor="middle">You</text>
                <rect className={styles.youLine} x={5+youRange[0]*rectangleTotalWidth} y={rectY} width={(youRange[1]-youRange[0])*rectangleTotalWidth} height={rectHeight}/>
            </>}
        </svg>
    );
}