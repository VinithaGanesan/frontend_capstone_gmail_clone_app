import React from "react";
import { Box, Drawer, styled } from "@mui/material";
import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)({
})


export default function Sidebar({ toggleDrawer, openDrawer }) {
    return (
        <StyledDrawer
            anchor="left"
            open={openDrawer}
            onClose={toggleDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true
            }}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': {
                    marginTop: '64px',
                    background: "#F5F5F5",
                    width: 250,
                    borderRight: "none",
                    height: 'calc(100vh -64px)'
                }
            }}
        >
            <SideBarContent />
        </StyledDrawer>

    );
}