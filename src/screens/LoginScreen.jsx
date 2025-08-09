import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Heart, ShieldCheck, Mail, Lock, Eye, EyeOff, Smartphone, Fingerprint } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { login } from '../services/authService';
import UserContext from '../context/UserContext';
import { initializeData } from "../redux/userSlice"

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const {loggedIn ,setIsLoggedIn} = useContext(UserContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (emailId && password) {
      try {
        const response = await login({ emailId, password });
        dispatch(initializeData(response.data));
        setIsLoggedIn(true);
        navigate("/profile");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };


  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sign in to your account</h1>
        <p className="mt-2 text-muted-foreground">Enter your credentials to access the dashboard.</p>
      </div>
      
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="email" type="email" placeholder="doctor@example.com" required className="pl-10" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="···········" required className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className="text-sm font-medium cursor-pointer">Remember me</Label>
        </div>
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer" onClick={handleLogin}>
        Sign In
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex items-center justify-center gap-2 cursor-pointer">
            <Smartphone className="h-4 w-4" />
            SMS Code
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2 cursor-pointer">
            <Fingerprint className="h-4 w-4" />
            Biometric
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a className="font-semibold text-primary hover:underline cursor-pointer" onClick={() => navigate("/onboarding")}>
          Create account
        </a>
      </p>
    </div>
  );
}


export default function SignInScreen() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 font-sans bg-background">
      <div className="hidden bg-primary p-8 text-primary-foreground lg:flex flex-col justify-between">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
             <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          MediTrack
        </div>
        
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">Welcome back to MediTrack</h1>
            <p className="text-lg text-primary-foreground/80">
                Empowering healthcare professionals with advanced analytics and patient management tools.
            </p>
            <div className="w-full aspect-video overflow-hidden rounded-lg">
                <img 
                    src="/happy.jpg" 
                    alt="Healthcare professionals using the dashboard"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/ffffff/4A90E2?text=Image+Error'; }}
                />
            </div>
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Secure Access</span>
                </div>
            </div>
        </div>
        
        <blockquote className="border-l-2 border-primary-foreground/50 pl-4">
          <p className="text-lg">
            "MediTrack has revolutionized how we manage patient care and track outcomes."
          </p>
          <footer className="text-sm text-primary-foreground/80 mt-2">— Dr. Sarah Johnson, Cardiologist</footer>
        </blockquote>
      </div>

      <div className="flex items-center justify-center p-6">
        <SignInForm />
      </div>
    </div>
  );
}