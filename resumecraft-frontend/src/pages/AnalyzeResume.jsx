import React, { useState, useContext } from "react";
import {
  Box,
  CssBaseline,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const { selectedMode, Modes } = useContext(AuthContext);
  const [mode, setMode] = useState(selectedMode);
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const blackTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#121212",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b0b0b0",
      },
    },
  });

  const whiteTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#000000",
        secondary: "#424242",
      },
    },
  });

  const currentTheme = mode === "dark" ? blackTheme : whiteTheme;

  const toggleColorMode = () => {
    Modes((prev) => (prev === "dark" ? "light" : "dark"));
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (prompt) => {
    if (!file) {
      alert("Please upload a file");
      return;
    }
    if (!inputText) {
      alert("Please provide a Job description");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("input_text", inputText);
    formData.append("input_prompt", prompt);

    setLoading(true);
    try {
      const res = await fetch("https://utsav10721.pythonanywhere.com/api/analyze-resume/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ATS Resume Expert
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="contained" onClick={toggleColorMode}>
              Toggle to {mode === "dark" ? "Light" : "Dark"} Mode
            </Button>
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <TextField
            label="Job Description"
            multiline
            rows={4}
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Resume (PDF)
            <input type="file" onChange={handleFileChange} hidden accept=".pdf" />
          </Button>
          {file && (
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Attached File:</strong> {file.name}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit("You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. Please share your professional evaluation on whether the candidate's profile aligns with the role. Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.")}
              fullWidth
            >
              Analyze Resume
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit("You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality, your task is to evaluate the resume against the provided job description. give me the percentage of match if the resume matches the job description. First the output should come as percentage and then keywords missing and last final thoughts.")}
              fullWidth
            >
              Percentage Match
            </Button>
          </Box>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {response && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
              {response.split("\n").map((line, index) => {
                if (line.startsWith("**")) {
                  // Header styling
                  return (
                    <Typography key={index} variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                      {line.replace(/\*/g, "")}
                    </Typography>
                  );
                } else if (line.startsWith("*")) {
                  // Bullet point styling
                  return (
                    <Typography key={index} variant="body1" sx={{ ml: 2 }}>
                      • {line.replace(/\*/g, "")}
                    </Typography>
                  );
                } else {
                  // Regular text
                  return (
                    <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                      {line}
                    </Typography>
                  );
                }
              })}
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeAnalyzer;
