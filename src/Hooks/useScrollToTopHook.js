import {useEffect, useState} from "react";
import axios from 'axios';

const useSCrollToTopHook = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useSCrollToTopHook;
