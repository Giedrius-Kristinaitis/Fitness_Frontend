import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

const Alert: React.FC = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export { Alert };