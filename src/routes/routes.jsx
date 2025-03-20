import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// import NotFound from '../components/common/NotFound'
import Layout from "../components/layout/Layout";




// Lazy load Components
const One = lazy(() => import(".././TransactionTable"));  // outside one --> Claude AI
const Two = lazy(() => import("../components/TransactionTable"));  // Inside one --> ChatGTP AI
const Login = lazy(() => import("../pages/LoginForm"));
const PasswordResetForm = lazy(() => import("../pages/ForgetPassword"));
const Deposit = lazy(() => import("../pages/DepositHistory"));
const Profile = lazy(() => import("../pages/Profile"));
const Wallet = lazy(() => import("../pages/Wallet"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SingupForm = lazy(() => import("../pages/SignupForm"));
// Email verifaication
const ForgetPasswordEmail = lazy(() => import("../pages/ForgotPassword/ForgetPasswordEmail"))
const PasswordResetVerification = lazy(() => import("../pages/ForgotPassword/PasswordResetVerification"))
const EmailPage = lazy(() => import("../pages/SignUp/EmailPage"))
const EmailVerificationPage = lazy(() => import("../pages/SignUp/EmailVerificationPage"))
const LandingPage = lazy(() => import("../pages/LandingPage"))

// Others
const Navbar2 = lazy(() => import("../components/layout/Navbar2")); 
const router = createBrowserRouter([
    // {path : "/", element : <><Layout /></>},
    {
        // signup with email verification success
        path :"/", element : <LandingPage />
    },
    {
        path: "/gmm",
        element: <Layout />,
        children : [           
            { path : "dep", element :<><Deposit /></> },
            { path : "profile", element :<><Profile /></> },
            { path : "wallet", element :<><Wallet /></> },
            { path : "dash", element :<><Dashboard /></> },
        ]
    },
    {
        path : "/login", element :<><Login /></>
    },
    {
        path : "/fp", element :<><PasswordResetForm /></>
    },
    {
        path : "/sign", element :<><SingupForm /></>
    },
    {
        path :"/fpe", element : <><ForgetPasswordEmail /></>,
    },
    {
        path :"/prv", element : <><PasswordResetVerification /></>
    },
    {
        // signup with email verification
        path :"/se", element : <><EmailPage /></>
    },
    {
        // signup with email verification success
        path :"/svs", element : <><EmailVerificationPage /></>
    },
    

]);

export default router;

