import { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import { s3Upload } from "../../libs/awsLib";
import { API } from "aws-amplify";

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    bookName: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    description: "The Description about the book",
  });

  const file = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createBookDetails({ attachment, values });
    } catch (e) {
      console.log(e);
    }
  };

  const createBookDetails = (bookDetails) => {
    console.log(bookDetails);
    return API.post("libraryManagmentSystem-prod", "libraryManagement", {
      body: bookDetails,
    });
  };

  const handleUploadClick = (event) => {
    file.current = event.target.files[0];
    console.log(file.current.name); // Would see a path?
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="New Book Details"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="The Name of the book"
                label="Book Name"
                name="bookName"
                onChange={handleChange}
                required
                value={values.bookName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Book Author"
                name="bookAuthor"
                onChange={handleChange}
                required
                value={values.bookAuthor}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  {file.current ? file : "Upload"}
                </Button>
              </label>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
