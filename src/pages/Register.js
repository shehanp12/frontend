import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAppContext } from "../libs/contextLib";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newUser = await Auth.signUp({
        username: values.email,
        password: values.password,
      });

      setNewUser(newUser);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(values.email, values.confirmationCode);
      await Auth.signIn(values.email, values.password);

      userHasAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  const renderConfirmationForm = () => {
    return (
      <Container maxWidth="sm">
        <Grid
          item
          md={12}
          xs={12}
          sm={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleConfirmationSubmit}>
            <TextField
              fullWidth
              label="Confirmation Code"
              name="confirmationCode"
              onChange={handleChange}
              required
              value={values.confirmationCode}
              variant="outlined"
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Verify
              </Button>
            </Box>
          </form>
        </Grid>
      </Container>
    );
  };

  const renderForm = () => {
    return (
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography color="textPrimary" variant="h2">
              Create new Admin User
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create new account
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            onChange={handleChange}
            required
            value={values.email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="confirmPassword"
            margin="normal"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up now
            </Button>
          </Box>
        </form>
      </Container>
    );
  };

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </Box>
    </>
  );
};

export default Register;
