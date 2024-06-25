import { Close, DeleteOutlineOutlined, Send, Token } from "@mui/icons-material";
import { Box, Button, Dialog, IconButton, InputBase, TextField, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmail, saveDraftEmail } from "../Redux/Reducers/EmailReducer";


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

export default function ComposeMail({ openDrawer, setOpenDrawer, setInputValue }) {
    const [data, setData] = useState({});
    const userdata = useSelector((state) => state.users.data.data);
    // const { openDrawer } = useSelector((state) => state.emails.openDrawer)


    const dispatch = useDispatch();

    function onValueChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setInputValue({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if (openDrawer) {

        }
    }, [openDrawer])


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

        setOpenDrawer(false);

        setData({});
    }


    const closeComposeMail = async (e) => {
        e.preventDefault();
        const form = {
            userId: userdata._id,
            from: userdata.email,
            to: data.to,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: `${userdata.firstname}${userdata.middlename}${userdata.lastname}`,
            type: 'drafts'
        }
        if (form.to && form.subject && form.body) {
            dispatch(saveDraftEmail(form))
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