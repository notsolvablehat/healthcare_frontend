import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Heart, ShieldCheck, Mail, Lock, Eye, EyeOff, FileUp, Stethoscope } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


function DoctorFields({ onFileChange, fileName }) {
    const specializations = [
        "Cardiology", "Dermatology", "Neurology", "Orthopedics",
        "Pediatrics", "Oncology", "Radiology", "General Surgery", "Other"
    ];

    return (
        <>
            <div className="space-y-2">
                <Label>Medical Certificate</Label>

                <Input
                    id="certificate-input"
                    type="file"
                    required
                    className="hidden"
                    onChange={onFileChange}
                />

                <Label
                    htmlFor="certificate-input"
                    className="flex items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-muted-foreground ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                       <FileUp className="h-4 w-4 shrink-0" />
                       <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                           {fileName || "Select certificate..."}
                       </span>
                    </div>
                    <span className="ml-4 shrink-0 rounded-sm bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
                        Browse
                    </span>
                </Label>

                <p className="text-xs text-muted-foreground">Please upload your graduation certificate.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                 <Select required>
                    <SelectTrigger id="specialization" className="w-full cursor-pointer">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <div className='pl-0'>
                             <SelectValue placeholder="Select your expertise" className="cursor-pointer" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer">
                        {specializations.map(skill => (
                            <SelectItem key={skill} value={skill.toLowerCase().replace(' ', '-')} className="cursor-pointer">{skill}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
    const [certificateName, setCertificateName] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setCertificateName(e.target.files?.[0]?.name || null);
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
                <p className="mt-2 text-muted-foreground">Join MediTrack to manage patient care seamlessly.</p>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Select onValueChange={setRole} required className="cursor-pointer">
                        <SelectTrigger id="role" className="cursor-pointer">
                            <SelectValue placeholder="Select your role" className="cursor-pointer"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="patient" className="cursor-pointer">Patient</SelectItem>
                            <SelectItem value="doctor" className="cursor-pointer">Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {role === 'doctor' && <DoctorFields onFileChange={handleFileChange} fileName={certificateName} />}

                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="john.doe@example.com" required className="pl-10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password" type={showPassword ? 'text' : 'password'} required className="pl-10 pr-10" placeholder="···········"/>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                            You agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    Create Account
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <a className="font-semibold text-primary hover:underline cursor-pointer" onClick={() => navigate("/")}>
                    Sign In
                </a>
            </p>
        </div>
    );
}

export default function RegisterScreen() {
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
            <h1 className="text-4xl font-bold">Start your journey with us.</h1>
            <p className="text-lg text-primary-foreground/80">
                Comprehensive health analysis and metrics for better patient care.
            </p>
            <div className="w-full aspect-video overflow-hidden rounded-lg">
                <img
                    src="/palliative-care.jpg"
                    alt="A team of doctors collaborating"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/ffffff/4A90E2?text=Image+Error'; }}
                />
            </div>
        </div>

        <blockquote className="border-l-2 border-primary-foreground/50 pl-4">
          <p className="text-lg">
            "This platform has been a game-changer for our clinic's efficiency and patient engagement."
          </p>
          <footer className="text-sm text-primary-foreground/80 mt-2">— Dr. Emily Carter</footer>
        </blockquote>
      </div>

      <div className="flex items-center justify-center p-6">
        <RegisterForm />
      </div>
    </div>
  );
}
