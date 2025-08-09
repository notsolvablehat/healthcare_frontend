import React from 'react';
import { Edit, Check, AlertTriangle, X, CheckCircle, Circle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// Helper component for the completion list items, now part of ProfileInfo
const CompletionStep = ({ title, details }) => {
  const icons = {
    complete: <Check size={16} />,
    partial: <AlertTriangle size={16} />,
    incomplete: <X size={16} />,
  };
  const colors = {
    complete: "bg-green-500",
    partial: "bg-yellow-400",
    incomplete: "bg-red-500",
  };
  const status = details?.status || "incomplete";
  return (
    <li className="flex items-center space-x-3">
      <span
        className={`w-6 h-6 rounded-full ${colors[status]} text-white flex items-center justify-center`}
      >
        {icons[status]}
      </span>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-500">
          {details?.text || "Not added yet"}
        </p>
      </div>
    </li>
  );
};

const ProfileInfo = ({
  formData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onFormChange,
  onSelectChange,
  completionPercentage,
  completionDetails,
  onVerifyId,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Info Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button variant="secondary" size="sm" onClick={onEdit} className="flex items-center space-x-2">
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                  <Button onClick={onSave}>Save Profile</Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label><Input id="fullName" value={formData.fullName || ""} onChange={onFormChange} disabled={!isEditing} /></div>
              <div className="space-y-2"><Label htmlFor="email">Email <span className="text-red-500">*</span></Label><Input id="email" value={formData.email || ""} onChange={onFormChange} disabled={!isEditing} /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" value={formData.phone || ""} onChange={onFormChange} disabled={!isEditing} /></div>
              <div className="space-y-2"><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" value={formData.dob || ""} onChange={onFormChange} disabled={!isEditing} /></div>
              <div className="space-y-2"><Label htmlFor="gender">Gender</Label><Select value={formData.gender || ""} onValueChange={(value) => onSelectChange("gender", value)} disabled={!isEditing}><SelectTrigger id="gender"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="female">Female</SelectItem><SelectItem value="male">Male</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="bloodType">Blood Type</Label><Select value={formData.bloodType || ""} onValueChange={(value) => onSelectChange("bloodType", value)} disabled={!isEditing}><SelectTrigger id="bloodType"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem><SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem><SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem><SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem></SelectContent></Select></div>
            </div>
            <Separator />
            <div className="space-y-2"><CardTitle className="text-base font-semibold">Address Information</CardTitle><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="street">Street Address</Label><Input id="street" value={formData.street || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" value={formData.city || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="state">State/Province</Label><Input id="state" value={formData.state || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="zip">Zip/Postal Code</Label><Input id="zip" value={formData.zip || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="country">Country</Label><Select value={formData.country || ""} onValueChange={(value) => onSelectChange("country", value)} disabled={!isEditing}><SelectTrigger id="country"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="usa">United States</SelectItem><SelectItem value="india">India</SelectItem></SelectContent></Select></div></div></div>
            <Separator />
            <div className="space-y-2"><CardTitle className="text-base font-semibold">Emergency Contact</CardTitle><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="contactName">Contact Name</Label><Input id="contactName" value={formData.contactName || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="relationship">Relationship</Label><Input id="relationship" value={formData.relationship || ""} onChange={onFormChange} disabled={!isEditing} /></div><div className="space-y-2"><Label htmlFor="contactPhone">Contact Phone</Label><Input id="contactPhone" value={formData.contactPhone || ""} onChange={onFormChange} disabled={!isEditing} /></div></div></div>
            <Separator />
            <div className="space-y-2"><CardTitle className="text-base font-semibold">Professional Biography</CardTitle><Textarea id="bio" value={formData.bio || ""} onChange={onFormChange} disabled={!isEditing} rows={6} /></div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Cards */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader><CardTitle>Profile Completion</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4 text-center">
              <Progress value={completionPercentage} className="w-full" />
              <span className="text-sm font-semibold text-gray-700 mt-2 block">{completionPercentage}%</span>
            </div>
            <ul className="space-y-4">
              <CompletionStep title="Personal Information" details={completionDetails.personal} />
              <CompletionStep title="Contact Information" details={completionDetails.contact} />
              <CompletionStep title="Medical History" details={completionDetails.medical} />
              <CompletionStep title="Insurance Information" details={completionDetails.insurance} />
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Account Verification</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between"><div className="flex items-center space-x-3"><span className="text-green-500"><CheckCircle size={20} /></span><span className="font-medium">Email Verified</span></div></li>
              <li className="flex items-center justify-between"><div className="flex items-center space-x-3"><span className="text-green-500"><CheckCircle size={20} /></span><span className="font-medium">Phone Verified</span></div></li>
              <li className="flex items-center justify-between"><div className="flex items-center space-x-3"><span className="text-red-500"><Circle size={20} /></span><span className="font-medium">ID Verification</span></div><Button variant="link" onClick={onVerifyId} className="p-0 h-auto">Verify Now</Button></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileInfo;
