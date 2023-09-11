import React, { useState, useEffect } from "react";

const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return { visible, setVisible };
};

export default useModal;
