import {useEffect} from "react";

const useSCrollToTopHook = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useSCrollToTopHook;
