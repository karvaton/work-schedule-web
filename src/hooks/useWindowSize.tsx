// import { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
    // const [size, setSize] = useState<number[]>([0, 0]);
    const size = [window.innerWidth, window.innerWidth];

    // useLayoutEffect(() => {
    //     function updateSize() {
    //         setSize([window.innerWidth, window.innerWidth]);
    //     }
    //     window.addEventListener('resize', updateSize);
    //     updateSize();
    //     return () => window.removeEventListener('resize', updateSize);
    // }, []);
    return size;
}
