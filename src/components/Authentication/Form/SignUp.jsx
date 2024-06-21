import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Paper, TextField, Typography, styled } from "@mui/material";
import { googlelogo } from '../../../constants/constant';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignUpUser, setUser } from '../../../Redux/Reducers/AuthReducer';

const Paperwrapper = styled(Paper)({
  padding: 40,
  marginTop: 40,
  textAlign: 'center'
})

const SubmitButton = styled(Button)({
  marginBottom: 10 
})

const Title = styled(Typography)({
  marginTop: 2,
  marginBottom: 2
})


export default function SignUp() {
  const [data, setData] = useState({});
  const [emailerror, setEmailError] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [error, setError] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onhandleEmailChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    if (validateEmail(e.target.value)) {
      setEmailError('')
    } else {
      setEmailError('please enter valid email')
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

  const onhandleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailRegex.test(email);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchSignUpUser(data))
      setData({});
      navigate('/login')
  }

  return (
    <Container maxWidth='xs'>
      <Paperwrapper elevation={3}>
        <img src={googlelogo} alt='googlelogo' width={100} style={{marginBottom: 2}}/>
        <Title variant='h5' align='center' gutterBottom sx={{m:2}}>
          Create account
        </Title>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={handleSubmit}>
          <TextField
            name='firstname'
            label='Firstname'
            variant='outlined'
            fullWidth
            value={data.firstname}
            onChange={(e) => onhandleChange(e)}
            error={Boolean(error)}
            helperText={error}
          />
           <TextField
            name='middlename'
            label='Middlename'
            variant='outlined'
            fullWidth
            value={data.middlename}
            onChange={(e) => onhandleChange(e)}
            error={Boolean(error)}
            helperText={error}
          />
          <TextField
            name='lastname'
            label='Lastname'
            variant='outlined'
            fullWidth
            value={data.lastname}
            onChange={(e) => onhandleChange(e)}
            error={Boolean(error)}
            helperText={error}
          />

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
          <SubmitButton variant='outlined' color='primary' type='submit'>
            Create account
          </SubmitButton>
        </form>
        <Grid container justifyContent='center'>
          <Grid item>
            Sign in to Chrome &nbsp;
            <Link to="/login">Login</Link>
          </Grid>
        </Grid>
      </Paperwrapper>
    </Container>
  )
}