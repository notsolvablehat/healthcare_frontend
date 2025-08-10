import React from 'react';
import { Check, AlertTriangle, X, CheckCircle, Circle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Helper component for the completion list items
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

const ProfileSidebar = ({ completionPercentage, completionDetails, onVerifyId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            <Progress value={completionPercentage} className="w-full" />
            <span className="text-sm font-semibold text-gray-700 mt-2 block">
              {completionPercentage}%
            </span>
          </div>
          <ul className="space-y-4">
            <CompletionStep
              title="Personal Information"
              details={completionDetails.personal}
            />
            <CompletionStep
              title="Contact Information"
              details={completionDetails.contact}
            />
            <CompletionStep
              title="Medical History"
              details={completionDetails.medical}
            />
            <CompletionStep
              title="Insurance Information"
              details={completionDetails.insurance}
            />
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-green-500">
                  <CheckCircle size={20} />
                </span>
                <span className="font-medium">Email Verified</span>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-green-500">
                  <CheckCircle size={20} />
                </span>
                <span className="font-medium">Phone Verified</span>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-red-500">
                  <Circle size={20} />
                </span>
                <span className="font-medium">ID Verification</span>
              </div>
              <Button
                variant="link"
                onClick={onVerifyId}
                className="p-0 h-auto"
              >
                Verify Now
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
