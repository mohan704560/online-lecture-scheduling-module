import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
// import { makeStyles } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

const theme = createTheme();

export default function ScheduleCourse() {
  const [level, setLevel] = React.useState("");
  const [course, setCourse] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("courseName"),
      password: data.get("level"),
      description: data.get("description"),
      thumbnail: data.get("thumbnail"),
      data: data,
    });
    // console.log(data.get("thumbnail"));
    // const thumbnailInput = document.getElementById("thumbnail").files[0];
    // console.log(thumbnailInput);
    const res = await axios.post("/course", {
      email: data.get("courseName"),
      password: data.get("level"),
      description: data.get("description"),
      thumbnail: data.get("thumbnail"),
    });
    console.log(res);
  };

  // const classes = useStyles();

  const fetchCourse = async () => {
    const res = await axios.get("/course");
    console.log(res);
    res && setCourse(res.data.data);
  };

  const fetchUser = async () => {
    const res = await axios.get("/user");
    console.log(res);
   const newUser = res.data.data.filter((ele)=>ele.name!=="Admin")
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
          <form onSubmit={handleSubmit}>
          <Autocomplete
            disablePortal
            id="course"
            options={course}
            getOptionLabel={(option) => option.courseName}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Course" />}
          />
          <Autocomplete
            disablePortal
            id="instructor"
            options={user}
            getOptionLabel={(option) => option.name }
            fullWidth
            sx={{ mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Instructor" />}
          />
    
            <TextField
              margin="normal"
              required
              fullWidth
              id="courseName"
              label="Course Name"
              name="courseName"
              autoFocus
            />

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
            {/* <Button variant="contained" component="label" fullWidth sx={{mt:3}}>
            thumbnail
              <input hidden accept="image/*" type="file" name="thumbnail" id="thumbnail"/>
            </Button> */}
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
