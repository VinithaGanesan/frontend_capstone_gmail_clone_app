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
import { fetchEmails } from "../Redux/Reducers/EmailReducer";
import { getAllEmails } from "../api";


export default function Emails() {

    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const { token } = useSelector((state) => state.users.data);

   const { emails } = useSelector((state) => state.emails);


    const { openDrawer } = useOutletContext();
    const { type }  = useParams();
    const dispatch = useDispatch();

    // const getEmailsService = useApi(API_URLS.getEmailFromType);
    // const deleteEmailService = useApi(API_URLS.deleteEmails);
    // const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    const fetchData = async (token,type) => {
        try {
            const response = await getAllEmails(token,type);
            const emails = response.data.data;
            dispatch(fetchEmails(emails))
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData(token,type);
        // dispatch(fetchEmails(token,type))
        console.log(`type is ${type}`)
    }, [type, starredEmail])

    const selectedAllEmails = (e) => {
        if (e.target.checked) {
            const emails = emails?.response?.map(email => email._id)
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = (e) => {
        if (type === 'bin') {
            // deleteEmailService.call(selectedEmails);
        } else {
            // moveEmailsToBin.call(selectedEmails);
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