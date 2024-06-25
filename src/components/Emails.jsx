import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Checkbox, List } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import Nomails from "./common/Nomails";
import { EMPTY_TABS } from "../constants/constant";
// import useApi from "../hooks/useApi";
// import { API_URLS } from "../services/api.urls";
import Email from "./Email";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmail, fetchEmails, movesEmailToBin } from "../Redux/Reducers/EmailReducer";
import { getAllEmails } from "../api";


export default function Emails() {

    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const { token } = useSelector((state) => state.users.data);
    const [ emailSelected, setEmailSelected] = useState(null)

    const { emails } = useSelector((state) => state.emails);


    const { openDrawer } = useOutletContext();
    const { type } = useParams();
    const dispatch = useDispatch();

    const fetchData = async (token, type) => {
        try {
            const response = await getAllEmails(token, type);
            const emails = response.data.data;
            dispatch(fetchEmails(emails))
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData(token, type);
    }, [type, starredEmail])

    const selectedAllEmails = (e) => {
        if (e.target.checked) {
            const selectedemails = emails.map(email => email._id)
            setSelectedEmails(selectedemails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = async (e) => {
        if (type === 'bin') {
            dispatch(deleteEmail(selectedEmails));

        } else {
            dispatch(movesEmailToBin(selectedEmails));
            setSelectedEmails([]);
        }
        setStarredEmail(prevState => !prevState);
    }


    return (
        <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100%-250px)' } : { width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small"
                    onChange={(e) => selectedAllEmails(e)}
                />
                <DeleteOutline
                    onClick={(e) => deleteSelectedEmails(e)}
                />
            </Box>
            <List>
                {
                    emails.map(email => (
                        <Email
                            email={email}
                            key={email.id}
                            setStarredEmail={setStarredEmail}
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                }
            </List>
            {
                emails.length === 0 &&
                <Nomails message={EMPTY_TABS[type]} />
            }
        </Box>
    );
}