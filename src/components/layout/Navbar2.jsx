import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';


function NavBar2(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const SignUpHandle = () => navigate('/sign');
  const SignInHandle = () => navigate('/login');


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{backgroundColor: '#1c0c3f' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            as={Link} to={'/'}
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GMM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
              
              {/* For Small Display */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem>
                <Typography as={Link} to={"/sign"}>SignUp</Typography>
              </MenuItem>
              <MenuItem>
                <Typography as={Link} to={"/login"}>Log In</Typography>
              </MenuItem>
            </Menu>
          </Box>


          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GMM
          </Typography>
          <div className='ml-56 lg:ml-60 xl:ml-72'>
            <Box sx={{ display: { xs: 'none', md: 'flex', gap:'2rem' } }}>
              <a href={`${props.home}`}>Home</a>
              <a href={`${props.hiw}`} >How It Works</a>
              <a href={`${props.features}`} >Features</a>
              <a href={`${props.reviews}`} >Reviews</a>
              <a href={`${props.faq}`} >FAQ's</a>
            </Box>
          </div>
            {/* For large Display */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , justifyContent:"end" , marginRight:"auto" } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={SignUpHandle}>SignUp</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={SignInHandle}>Log In</Button>
          </Box>


         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar2;