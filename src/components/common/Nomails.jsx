import React from "react";

import { Box, Typography, Divider, styled } from "@mui/material";

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.8,
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10
})

export default function Nomails({ message }) {
    return (
        <Component>
            <Typography>{message.heading}</Typography>
            <Typography>{message.subHeading}</Typography>
            <StyledDivider />
        </Component>
    );
}