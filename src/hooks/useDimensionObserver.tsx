import {RefObject, useEffect, useState} from "react";
import ResizeObserver from "resize-observer-polyfill";

interface ResizeObserverEntry {
    target: HTMLElement
    contentRect: DOMRectReadOnly
}

export function useDimensionObserver(ref: RefObject<HTMLElement>) {

    const [width, setWidth] = useState<number>(0); //added 0 so that I wouldnt get the error: "Type 'number | undefined' is not assignable to type 'number'. 
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }

        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);

        //@ts-ignore
        let resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            const entry = entries[0];
            setWidth(entry.contentRect.width);
            setHeight(entry.contentRect.height);
        });

        resizeObserver.observe(ref.current);

        return function cleanup() {
            if (resizeObserver && ref && ref.current) {
                resizeObserver.unobserve(ref.current);
            }
        };

    }, [ref]);

    return {width, height};
}