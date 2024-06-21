import { Close, DeleteOutlineOutlined, Send, Token } from "@mui/icons-material";
import { Box, Button, Dialog, IconButton, InputBase, TextField, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
// import useApi from "../hooks/useApi";
// import { API_URLS } from "../services/api.urls";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmail } from "../Redux/Reducers/EmailReducer";


const dialogStyle = {
    height: '92%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10px 10px 0 0',
    boxshadow: 'none'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    backgroundColor: '#f2f6fc',
    '& >p': {
        fontSize: 14,
        fontWeight: 500
    }
})

const ReceipientWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px',
    '& >div': {
        fontSize: 14,
        borderBottom: '1px solid #f5f5f5',
        marginTop: '10px'
    }
})

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
})

const SendButton = styled(Button)({
    backgroundColor: '#0B57D0',
    color: '#f5f5f5',
    fontWeight: '500',
    textTransform: 'none',
    borderRadius: '18px',
    width: '100px'

})

export default function ComposeMail({ openDrawer, setOpenDrawer }) {
    const [data, setData] = useState({});
    const userdata = useSelector((state) => state.users.data.data);
    const { token } = useSelector((state) => state.users.data);

    // const sentEmailservice = useApi(API_URLS.saveSentEmail);
    // const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const dispatch = useDispatch();

    function onValueChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    
    const sendingMail = async (e) => {
        
        const form = {
            userId: userdata._id,
            from: userdata.email,
            to: data.to,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: `${userdata.firstname}${userdata.middlename}${userdata.lastname}`,
            type: 'sent'
        }
        
        
        dispatch(addNewEmail(form));
        console.log(token,form);
        setOpenDrawer(false);
        setData({});
        // dispatch(sendEmailAction(payload))
        // console.log(payload);
        
        
        // sentEmailservice.call(payload);
        
        // if (!sentEmailservice.error) {
            //     setOpenDrawer(false);
            //     setData({});
            // } else {
                
            // }
            
        }
        
        // useEffect(() => {
        //     console.log(token,form);
        // },[])



    const closeComposeMail = async (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: 'vinitharambe1016@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Vinitha ram',
            starred: false,
            type: 'drafts'
        }
        console.log(payload);
        if (payload.to || payload.subject || payload.body) {
            console.log('vinitha')
            // saveDraftService.call(payload);
        }
        setOpenDrawer(false);
        setData({})
    }



    return (
        <Dialog
            open={openDrawer}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <IconButton size="small">
                    <Close fontSize="inherit" onClick={(e) => closeComposeMail(e)} />
                </IconButton>

            </Header>
            <ReceipientWrapper>
                <InputBase placeholder="Receipients" name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder="Subject" name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </ReceipientWrapper>
            <TextField
                multiline
                rows={18}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                onChange={(e) => onValueChange(e)}
                name="body"
                value={data.body}
            />
            <Footer>
                <SendButton onClick={sendingMail} endIcon={<Send />}>Send</SendButton>
                <IconButton aria-label="delete" size="small">
                    <DeleteOutlineOutlined fontSize="small" onClick={() => setOpenDrawer(false)} />
                </IconButton>
            </Footer>
        </Dialog>

    );
}