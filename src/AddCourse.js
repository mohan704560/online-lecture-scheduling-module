import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const theme = createTheme();

export default function AddCourse() {
  const [level, setLevel] = React.useState("");

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await axios.post("/course",{
      courseName: data.get("courseName"),
      level: data.get("level"),
      description: data.get("description"),
      thumbnail: data.get("thumbnail"),
    },{
      headers:{
        "Content-Type": "multipart/form-data",
      }
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
          <form
            onSubmit={handleSubmit}
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
              sx={{ mt: 2 }}
            />
            <Button variant="contained" component="label" fullWidth sx={{mt:3}}>
            thumbnail
              <input hidden accept="image/*" type="file" name="thumbnail" id="thumbnail"/>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
