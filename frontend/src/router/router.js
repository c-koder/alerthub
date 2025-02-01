import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/navbar.component";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";

import { refreshUser } from "../redux/slices/auth.slice";

const Routing = () => {
  const dispatch = useDispatch();
  const { refreshing } = useSelector((state) => state.auth);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (refreshing) {
      setDelayedLoading(true);
    } else {
      const timer = setTimeout(() => setDelayedLoading(false), 750);
      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  if (delayedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="relative flex size-6">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex size-6 rounded-full bg-primary-500"></span>
        </span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Routing;
