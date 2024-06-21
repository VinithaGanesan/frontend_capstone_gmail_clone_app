import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Grid, Paper, TextField, Typography, styled } from "@mui/material";
import { googlelogo } from '../../../constants/constant';
import { Link } from 'react-router-dom';
import { fetchLoginUser } from '../../../Redux/Reducers/AuthReducer';

const Paperwrapper = styled(Paper)({
  padding: 40,
  marginTop: 150,
  textAlign: 'center'
})

const SubmitButton = styled(Button)({
  marginBottom: 10 
})

const Title = styled(Typography)({
  marginTop: 2,
  marginBottom: 2
})


export default function Login() {
  const [data, setData] = useState({});
  const [emailerror, setEmailError] = useState('');
  const [passworderror, setPassworderror] = useState('');


  const dispatch = useDispatch();

  const onhandleEmailChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    if (!validateEmail(e.target.value)) {
      setEmailError('please enter valid email')
    } else {
      setEmailError('')
    }
  }

  const onhandlePasswordChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    if(e.target.value.length < 6) {
      setPassworderror('Password must be 6 characters')
    } else {
      setPassworderror('')
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchLoginUser(data));
  }

  return (
    <Container maxWidth='xs'>
      <Paperwrapper elevation={3}>
        <img src={googlelogo} alt='googlelogo' width={100} style={{marginBottom: 2}}/>
        <Title variant='h5' align='center' gutterBottom sx={{m:2}}>
          Login
        </Title>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={handleSubmit}>
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
            value={data.email}
            onChange={(e) => onhandleEmailChange(e)}
            error={Boolean(emailerror)}
            helperText={emailerror}
          />
          <TextField
            name='password'
            label='password'
            variant='outlined'
            fullWidth
            value={data.password}
            onChange={(e) => onhandlePasswordChange(e)}
            error={Boolean(passworderror)}
            helperText={passworderror}
          />
          <SubmitButton variant='contained' color='primary' type='submit'>
            Sign in
          </SubmitButton>
        </form>
        <Grid container justifyContent='center'>
          <Grid item>
            Don't have account &nbsp;
            <Link to='/'>
              Create account
            </Link>
          </Grid>
        </Grid>
      </Paperwrapper>
    </Container>
  )
}