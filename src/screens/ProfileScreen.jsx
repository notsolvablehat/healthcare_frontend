import { useState, useEffect } from "react";
import {
  Heart,
  User,
  Mail,
  PhoneCall,
  Download,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileInfo from "./ProfileInfo";
import MedicalProfile from "./MedicalProfile";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("personal-information");
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [formData, setFormData] = useState({});
  const [originalFormData, setOriginalFormData] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completionDetails, setCompletionDetails] = useState({});

  const profileData = useSelector((state) => state.user.personalInfo);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      const mappedData = {
        fullName: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim(),
        email: profileData.emailId || "",
        phone: profileData.primaryPhone || "",
        dob: profileData.dateOfBirth || "",
        gender: profileData.gender?.toLowerCase() || "",
        bloodType: profileData.bloodType || "",
        street: profileData.address?.street || "",
        city: profileData.address?.city || "",
        state: profileData.address?.state || "",
        zip: profileData.address?.zipCode || "",
        country: profileData.address?.country?.toLowerCase() || "",
        contactName: profileData.emergencyContact?.name || "",
        relationship: profileData.emergencyContact?.relatioship || "",
        contactPhone: profileData.emergencyContact?.phone || "",
        bio: profileData.biography || "",
        specialization: profileData.specialization || "Specialist",
        avatar: profileData.avatar || "",
      };
      setFormData(mappedData);
    }
  }, [profileData]);

  useEffect(() => {
    const calculateCompletion = () => {
      const details = {};
      let totalProgress = 0;
      const personalFields = [formData.fullName, formData.dob, formData.gender];
      if (personalFields.filter(Boolean).length === personalFields.length) {
        details.personal = { status: "complete", text: "Basic profile details completed" };
        totalProgress += 25;
      } else if (personalFields.filter(Boolean).length > 0) {
        details.personal = { status: "partial", text: "Some details missing" };
        totalProgress += 12.5;
      } else {
        details.personal = { status: "incomplete", text: "Not added yet" };
      }
      const contactFields = [formData.email, formData.phone, formData.street, formData.contactPhone];
      if (contactFields.filter(Boolean).length === contactFields.length) {
        details.contact = { status: "complete", text: "Email and phone verified" };
        totalProgress += 25;
      } else if (contactFields.filter(Boolean).length > 0) {
        details.contact = { status: "partial", text: "Some contact info missing" };
        totalProgress += 12.5;
      } else {
        details.contact = { status: "incomplete", text: "Not added yet" };
      }
      const medicalFields = [formData.bloodType, formData.bio];
      if (medicalFields.filter(Boolean).length === medicalFields.length) {
        details.medical = { status: "complete", text: "All medical history provided" };
        totalProgress += 25;
      } else if (medicalFields.filter(Boolean).length > 0) {
        details.medical = { status: "partial", text: "Some information missing" };
        totalProgress += 12.5;
      } else {
        details.medical = { status: "incomplete", text: "Some information missing" };
      }
      details.insurance = { status: "incomplete", text: "Not added yet" };
      setCompletionPercentage(Math.round(totalProgress));
      setCompletionDetails(details);
    };
    calculateCompletion();
  }, [formData]);

  const handleEditPersonalInfo = () => {
    setOriginalFormData(formData);
    setIsEditingPersonalInfo(true);
  };

  const handleSavePersonalInfo = () => {
    console.log("Profile data saved:", formData);
    setIsEditingPersonalInfo(false);
    setOriginalFormData(null);
  };

  const handleCancelEdit = () => {
    if (originalFormData) {
      setFormData(originalFormData);
    }
    setIsEditingPersonalInfo(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleVerifyId = () => {
    console.log("Verify ID Now clicked");
  };

  const getInitials = (name = "") => (name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase();

  return (
    <div className="px-6 md:px-10 bg-slate-50 min-h-screen py-8">
      <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-sm text-gray-500 mb-6">
          Manage your personal information and account settings
        </p>
        <div className="flex items-start md:items-center space-x-4 flex-col md:flex-row">
          <img
            src={
              formData.avatar ||
              `https://placehold.co/100x100/e2e8f0/4a5568?text=${getInitials(
                formData.fullName
              )}`
            }
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/100x100/e2e8f0/4a5568?text=${getInitials(
                formData.fullName
              )}`;
            }}
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{formData.fullName}</h2>
            <p className="text-gray-500">{formData.specialization}</p>
            <div className="flex flex-col sm:flex-row sm:gap-5">
              <div className="flex items-center text-sm text-gray-600 space-x-2 mt-1">
                <Mail size={16} />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 space-x-2 mt-1">
                <PhoneCall size={16} />
                <span>{formData.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="secondary" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Import Data</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent p-0 h-auto justify-start mb-4 border-b border-gray-200 rounded-none">
            <TabsTrigger
              value="personal-information"
              className="flex items-center data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-primary font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary px-3 py-2 transition-colors"
            >
              <User size={16} className="mr-2" />
              <span>Personal Information</span>
            </TabsTrigger>

            <TabsTrigger
              value="medical-profile"
              className="flex items-center data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-primary font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary px-3 py-2 transition-colors"
            >
              <Heart size={16} className="mr-2" />
              <span>Medical Profile</span>
            </TabsTrigger>

            <TabsTrigger
              value="account-settings"
              className="flex items-center data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-primary font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary px-3 py-2 transition-colors"
            >
              <Settings size={16} className="mr-2" />
              <span>Account Settings</span>
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="flex items-center data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-primary font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary px-3 py-2 transition-colors"
            >
              <ShieldCheck size={16} className="mr-2" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-information">
            <ProfileInfo
              formData={formData}
              isEditing={isEditingPersonalInfo}
              onEdit={handleEditPersonalInfo}
              onSave={handleSavePersonalInfo}
              onCancel={handleCancelEdit}
              onFormChange={handleChange}
              onSelectChange={handleSelectChange}
              completionPercentage={completionPercentage}
              completionDetails={completionDetails}
              onVerifyId={handleVerifyId}
            />
          </TabsContent>
          
          <TabsContent value="medical-profile">
            <MedicalProfile />
          </TabsContent>

          <TabsContent value="account-settings">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileScreen;
