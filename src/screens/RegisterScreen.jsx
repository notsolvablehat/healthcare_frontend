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

import { register } from '../services/authService';

function DoctorFields({ onFileChange, fileName, onSpecializationChange }) {
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
                <p className="text-xs text-muted-foreground">
                    Please upload your graduation certificate.
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select required onValueChange={onSpecializationChange}>
                    <SelectTrigger id="specialization" className="w-full cursor-pointer">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <div className='pl-0'>
                             <SelectValue placeholder="Select your expertise" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {specializations.map(skill => (
                            <SelectItem key={skill} value={skill}>
                                {skill}
                            </SelectItem>
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
    const [certificatePath, setCertificatePath] = useState(null);
    const [specialization, setSpecialization] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [termsAcc, setTermsAcc] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setCertificatePath(e.target.files?.[0]?.name || null);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                emailId,
                password,
                firstName,
                lastName,
                certificatePath,
                specialization,
                termsAccepted: termsAcc,
                role
            };

            const response = await register(payload);
                navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
                <p className="mt-2 text-muted-foreground">
                    Join MediTrack to manage patient care seamlessly.
                </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Select onValueChange={setRole} required>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Doctor-specific fields */}
                {role === 'doctor' && (
                    <DoctorFields
                        onFileChange={handleFileChange}
                        fileName={certificatePath}
                        onSpecializationChange={setSpecialization}
                    />
                )}

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="john.doe@example.com" required className="pl-10" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password" type={showPassword ? 'text' : 'password'} required className="pl-10 pr-10" placeholder="···········" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" required checked={termsAcc} onCheckedChange={setTermsAcc} />
                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="terms" className="text-sm font-medium">
                            Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                            You agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </form>
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
