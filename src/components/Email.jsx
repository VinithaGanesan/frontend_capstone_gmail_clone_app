import { Star, StarBorder } from "@mui/icons-material";
import { Box, Checkbox, ListItem, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { useDispatch } from 'react-redux'
import { toggleStarredEmail } from "../Redux/Reducers/EmailReducer";
import ComposeMail from "./ComposeMail";

const Wrapper = styled(ListItem)({
    padding: '0 0 0 10px',
    backgroundColor: '#f2f6fc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& >div': {
        display: 'flex',
        width: '100%',
        '& > p': {
            fontSize: '14px'
        }
    }
});

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6
});

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
});

export default function Email({ email, setStarredEmail, selectedEmails, setSelectedEmails }) {

    const [openDrawer, setOpenDrawer] = useState(false);


    const navigate = useNavigate();

    const dispatcher = useDispatch();

    const toggleStarredEmailService = () => {
        dispatcher(toggleStarredEmail({ id: email._id, value: !email.starred }))
        setStarredEmail(prevState => !prevState);
    }

    const handleChange = (id) => {
        setSelectedEmails(prevState =>
            prevState.includes(id)
                ? prevState.filter(mailId => mailId !== id)
                : [...prevState, id]
        );
    }

    function onComposeClick() {
        setOpenDrawer(true);
        console.log('vinitha');
    }



    return (
        <Wrapper>
            <Checkbox
                size="small"
                checked={selectedEmails.includes(email._id)}
                onChange={() => handleChange(email._id)}
            />
            {
                email.starred ?
                    <Star fontSize="small" style={{ marginRight: 10 }} sx={{ color: 'yellow' }} onClick={() => toggleStarredEmailService()} />
                    :
                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmailService()} />
            }
            {
                email.type !== 'drafts'
                    ? <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>
                        <Typography style={{ width: 200 }}>
                            To:{email.to.split('@')[0]}
                        </Typography>
                        <Indicator>
                            {email.type}
                        </Indicator>
                        <Typography>
                            {email.subject} {email.body && '-'} {email.body}
                        </Typography>
                        <Date>
                            {(new window.Date(email.date)).getDate()}&nbsp;
                            {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                        </Date>
                    </Box>
                    :
                    <>
                        <Box onClick={() => onComposeClick()}>
                            <Typography style={{ width: 200 }}>
                                To:{email.to.split('@')[0]}
                            </Typography>
                            <Indicator>
                                {email.type}
                            </Indicator>
                            <Typography>
                                {email.subject} {email.body && '-'} {email.body}
                            </Typography>
                            <Date>
                                {(new window.Date(email.date)).getDate()}&nbsp;
                                {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                            </Date>
                        </Box>
                        <ComposeMail openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                    </>
            }

        </Wrapper>
    );
}