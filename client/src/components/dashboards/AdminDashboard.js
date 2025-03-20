import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  IconButton,
} from '@mui/material'; // Import Material-UI components
import LogoutIcon from '@mui/icons-material/Logout'; // Import Material-UI Icons

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);

  // Fetch employee count on component mount
  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  // Function to fetch employee count from the backend
  const fetchEmployeeCount = async () => {
    try {
      const response = await fetch('/api/employees/count'); // Replace with your API endpoint
      const data = await response.json();
      setEmployeeCount(data.count); // Assuming the API returns { count: 10 }
    } catch (error) {
      console.error('Error fetching employee count:', error);
    }
  };

  // Function to navigate to the Add Employee page
  const navigateToAddEmployee = () => {
    navigate('/add-employee');
  };

  // Function to navigate to the Registered Employees page
  const navigateToRegisteredEmployees = () => {
    navigate('/registered-employees');
  };

  // Function to handle log out
  const handleLogOut = () => {
    // Perform log out actions (e.g., clear session, remove tokens, etc.)
    console.log('User logged out');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar (Header) */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            System Administrator Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogOut}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Card for Employee Count */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Registered Employees
                </Typography>
                <Typography variant="h3" component="div">
                  {employeeCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total number of employees in the system.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Add Employee */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Add Employee
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add a new employee to the system.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={navigateToAddEmployee}
                >
                  Add Employee
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Card for View Registered Employees */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  View Employees
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage registered employees.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={navigateToRegisteredEmployees}
                  color="success"
                >
                  View Employees
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;