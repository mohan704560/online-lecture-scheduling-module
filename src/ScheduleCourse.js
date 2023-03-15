import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";

const theme = createTheme();

export default function ScheduleCourse() {
  const [course, setCourse] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await axios.post("/course", {
      course: data.get("course"),
      instructor: data.get("instructor"),
      date: data.get("date"),
    });
  };

  const fetchCourse = async () => {
    const res = await axios.get("/course");
    console.log(res);
    res && setCourse(res.data.data);
  };

  const fetchUser = async () => {
    const res = await axios.get("/user");
    console.log(res);
    const newUser = res.data.data.filter((ele) => ele.name !== "Admin");
    res && setUser(newUser);
  };

  React.useEffect(() => {
    fetchCourse();
    fetchUser();
  }, []);

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
          <form onSubmit={handleSubmit} style={{width:"100%"}}>
            <Autocomplete
              disablePortal
              id="course"
              options={course}
              getOptionLabel={(option) => option.courseName}
              fullWidth
              required
              renderInput={(params) => <TextField {...params} label="Course" />}
            />
            <Autocomplete
              disablePortal
              id="instructor"
              options={user}
              getOptionLabel={(option) => option.name}
              fullWidth
              required
              sx={{ mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Instructor" />
              )}
            />
           
           <input type="text" id="date" placeholder="DD/MM/YYYY" onFocus="(this.type='date')" style={{width:"100%", height:"60px", borderColor:"rgb(0,0,0,0.1)", borderRadius:"4px", marginTop:"16px", padding:"16px", fontSize:"14px"}}/>
      
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
