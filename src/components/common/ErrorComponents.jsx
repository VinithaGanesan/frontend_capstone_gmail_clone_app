import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";


export default function ErrorComponents(){
    const error = useRouteError();
    console.log(error);
    return (
        <Box style={{ marginLeft: 250 }}>
            <Typography>
                There was an error loading this page
            </Typography>
        </Box>
    );
}