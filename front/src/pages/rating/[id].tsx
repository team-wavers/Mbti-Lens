// Page for testing Router

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const id = () => {
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        console.log(id);
    }, [id]);
    return <div></div>;
};

export default id;
