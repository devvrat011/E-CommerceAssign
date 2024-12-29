import React, { useState } from 'react';
import './navbar.css';
import { Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate('/login');
  };

  return (
    <nav className="navbar flex justify-between items-center px-4 py-6 bg-gray-100">
      <div className="flex items-center">
        <Link to="/" className="ml-3 text-2xl font-bold">
          3legant.
        </Link>
      </div>

      {/* Navbar Links for Desktop */}
      <div className="hidden md:flex flex-grow justify-center space-x-4">
        <a onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-600">
          Home
        </a>
        <a onClick={() => navigate('/shop')} className="cursor-pointer hover:text-gray-600">
          Shop
        </a>
        <a className="cursor-pointer hover:text-gray-600">Product</a>
        <a className="cursor-pointer hover:text-gray-600">Contact Us</a>
      </div>

      <div className="hidden md:flex w-52 items-center justify-between">
        {/* Search Icon */}
        <IconButton>
          <SearchIcon />
        </IconButton>

        {/* Cart Icon */}
        <a onClick={() => navigate('/cart')} className="font-bold cursor-pointer flex items-center">
          <ShoppingCartIcon />
        </a>

        {/* User Profile Menu */}
        {!currentUser ? (
          <Button gradientDuoTone="pinkToOrange" className="inline" onClick={() => navigate('/login')}>
            LogIn / SignUp
          </Button>
        ) : (
          <div
            className="flex items-center relative cursor-pointer"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <PersonIcon />
            <span className="mx-2">{currentUser.name}</span>
            {showProfileMenu && (
              <div className="absolute top-full left-0 z-50 bg-white p-2 rounded-md">
                <div onClick={() => navigate('/orders')} className="shadow-xl font-bold cursor-pointer">
                  My Orders
                </div>
                <div onClick={handleSignOut} className="shadow-xl font-bold cursor-pointer mt-3">
                  Sign Out
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon md:hidden" onClick={toggleMenu}>
        <div className={`bar1 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar2 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar3 ${showMenu ? 'change' : ''}`}></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
        <a onClick={() => navigate('/')} className="font-bold cursor-pointer py-2">
          Home
        </a>
        <a onClick={() => navigate('/shop')} className="font-bold cursor-pointer py-2">
          Shop
        </a>
        <a className="font-bold cursor-pointer py-2">Product</a>
        <a className="font-bold cursor-pointer py-2">Contact Us</a>
        <a className="font-bold cursor-pointer py-2" onClick={() => navigate('/cart')}>
          <ShoppingCartIcon />
        </a>
        {!currentUser ? (
          <Button gradientDuoTone="pinkToOrange" className="inline" onClick={() => navigate('/login')}>
            LogIn / SignUp
          </Button>
        ) : (
          <div className="font-bold cursor-pointer py-2 mobile-profile">
            <PersonIcon />
            <span className="mx-2">{currentUser.name}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
