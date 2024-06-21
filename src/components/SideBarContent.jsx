import { Box, Button, styled, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { CreateOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { NavLink, useParams } from "react-router-dom";
import { routes } from "../routes/routes";

const ComposeButton = styled(Button)({
    background: "#c2e7ff",
    color: "#001d35",
    borderRadius: "16px",
    padding: 15,
    minWidth: 140,
})
const Container = styled(Box)({
    padding: 10,
    '& >ul': {
        padding: '10px 0 0 5px',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        '& > a' : {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    '& > ul > a > li > svg': {
        marginRight: 20,
    }
})

export default function SideBarContent() {
    const [openDrawer, setOpenDrawer] = useState(false);

    const { type } = useParams();

    function onComposeClick() {
        setOpenDrawer(true);
    }

    return (
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined />COMPOSE
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem style={type === data.name.toLocaleLowerCase() ? {
                                backgroundColor: "#d3e3fd",
                                borderRadius: 20
                            } : {}
                            }>
                                <data.icon fontSize="small" /> {data.title}
                            </ListItem>
                        </NavLink>
                    ))
                }
            </List>
            <ComposeMail openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Container>
    );
}