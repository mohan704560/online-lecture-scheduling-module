import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const theme = createTheme();

export default function AddCourse() {
  const [level, setLevel] = React.useState("");

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("courseName"),
      password: data.get("level"),
      description: data.get("description")

    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="courseName"
              label="Course Name"
              name="courseName"
              autoFocus
            />
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-label">Level</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="level"
                name="level"
                required
                value={level}
                label="Level"
                onChange={handleChange}
              >
                <MenuItem value="Graduate">Graduate</MenuItem>
                <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="description"
              label="Description"
              name="description"
              required
              fullWidth
              multiline
              maxRows={4}
              sx={{ mt: 1 }}
            />
            <Button variant="contained" component="label" fullWidth sx={{mt:3}}>
            thumbnail
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
