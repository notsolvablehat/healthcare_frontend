import React, { useState } from 'react';
import { Smartphone, Laptop, Trash2, Plus, Sparkles } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// --- INITIAL DATA ---
const initialDevices = [
    { id: 1, type: 'phone', name: 'iPhone 13 Pro', lastActive: 'Jun 15, 2023, 08:00 PM', location: 'Boston, MA' },
    { id: 2, type: 'laptop', name: 'Macbook Pro', lastActive: 'Jun 15, 2023, 02:45 PM', location: 'Boston, MA' },
];

const DeviceIcon = ({ type }) => {
    if (type === 'phone') return <Smartphone className="h-5 w-5 text-muted-foreground" />;
    if (type === 'laptop') return <Laptop className="h-5 w-5 text-muted-foreground" />;
    return null;
};

// --- MAIN COMPONENT ---
export default function AccountSettings() {
    // State for all settings
    const [preferences, setPreferences] = useState({
        language: 'english',
        timeZone: 'et',
        largeText: false,
        highContrast: false,
        screenReaderSupport: true,
    });
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'colleagues',
        dataSharing: 'limited',
        researchParticipation: true,
    });
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        inApp: true,
        appointmentReminders: true,
        medicationReminders: false,
        systemUpdates: true,
    });
    const [devices, setDevices] = useState(initialDevices);

    // New state for Gemini AI feature
    const [explanation, setExplanation] = useState('');
    const [isExplanationLoading, setIsExplanationLoading] = useState(false);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handlePrivacyChange = (key, value) => {
        setPrivacy(prev => ({ ...prev, [key]: value }));
    };

    const handleNotificationChange = (key, value) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    };
    
    const removeDevice = (deviceId) => {
        setDevices(prev => prev.filter(device => device.id !== deviceId));
    };

    // --- Gemini API Call ---
    const handleExplainSettings = async () => {
        setIsExplanationModalOpen(true);
        setIsExplanationLoading(true);
        setExplanation(''); // Clear previous explanation

        const prompt = `
            Explain the following privacy settings for a user of a medical application in simple, easy-to-understand terms.
            Keep the explanation concise and clear. Format the output using markdown with headings for each setting.

            - **Profile Visibility**: Currently set to "${privacy.profileVisibility}". Explain what this means for who can see their profile.
            - **Data Sharing**: Currently set to "${privacy.dataSharing}". Explain what this means for how their medical data is shared with providers.
            - **Research Participation**: Currently set to "${privacy.researchParticipation ? 'Enabled' : 'Disabled'}". Explain what it means to participate in anonymized medical research.
        `;

        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            let response;
            let delay = 1000;
            for (let i = 0; i < 5; i++) {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) break;
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }

            if (!response || !response.ok) {
                throw new Error(`API request failed with status ${response?.status}`);
            }

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
              setExplanation(text);
            } else {
              setExplanation("Sorry, I couldn't generate an explanation at this time. Please try again later.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setExplanation("There was an error getting the explanation. Please check your connection and try again.");
        } finally {
            setIsExplanationLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preferences Card */}
                <Card>
                    <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-medium text-sm mb-2">Language & Region</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="language">Language</Label>
                                    <Select value={preferences.language} onValueChange={(val) => handlePreferenceChange('language', val)}>
                                        <SelectTrigger id="language"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="spanish">Spanish</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="timezone">Time Zone</Label>
                                    <Select value={preferences.timeZone} onValueChange={(val) => handlePreferenceChange('timeZone', val)}>
                                        <SelectTrigger id="timezone"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="et">Eastern Time (ET)</SelectItem>
                                            <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-sm mb-3">Accessibility</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between"><Label htmlFor="large-text">Large Text</Label><Switch id="large-text" checked={preferences.largeText} onCheckedChange={(val) => handlePreferenceChange('largeText', val)} /></div>
                                <div className="flex items-center justify-between"><Label htmlFor="high-contrast">High Contrast</Label><Switch id="high-contrast" checked={preferences.highContrast} onCheckedChange={(val) => handlePreferenceChange('highContrast', val)} /></div>
                                <div className="flex items-center justify-between"><Label htmlFor="screen-reader">Screen Reader Support</Label><Switch id="screen-reader" checked={preferences.screenReaderSupport} onCheckedChange={(val) => handlePreferenceChange('screenReaderSupport', val)} /></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Card */}
                <Card>
                    <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between"><Label htmlFor="email-notifications">Email Notifications</Label><Switch id="email-notifications" checked={notifications.email} onCheckedChange={(val) => handleNotificationChange('email', val)} /></div>
                        <div className="flex items-center justify-between"><Label htmlFor="sms-notifications">SMS Notifications</Label><Switch id="sms-notifications" checked={notifications.sms} onCheckedChange={(val) => handleNotificationChange('sms', val)} /></div>
                        <div className="flex items-center justify-between"><Label htmlFor="in-app-notifications">In-App Notifications</Label><Switch id="in-app-notifications" checked={notifications.inApp} onCheckedChange={(val) => handleNotificationChange('inApp', val)} /></div>
                        <hr className="my-2" />
                        <div className="flex items-center justify-between"><Label htmlFor="appointment-reminders">Appointment Reminders</Label><Switch id="appointment-reminders" checked={notifications.appointmentReminders} onCheckedChange={(val) => handleNotificationChange('appointmentReminders', val)} /></div>
                        <div className="flex items-center justify-between"><Label htmlFor="medication-reminders">Medication Reminders</Label><Switch id="medication-reminders" checked={notifications.medicationReminders} onCheckedChange={(val) => handleNotificationChange('medicationReminders', val)} /></div>
                        <div className="flex items-center justify-between"><Label htmlFor="system-updates">System Updates</Label><Switch id="system-updates" checked={notifications.systemUpdates} onCheckedChange={(val) => handleNotificationChange('systemUpdates', val)} /></div>
                    </CardContent>
                </Card>

                {/* Privacy Settings Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Privacy Settings</CardTitle>
                        <Button variant="ghost" size="sm" onClick={handleExplainSettings} disabled={isExplanationLoading}>
                            <Sparkles className="h-4 w-4 mr-2" />
                            {isExplanationLoading ? 'Thinking...' : 'Explain'}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="profile-visibility">Profile Visibility</Label>
                            <Select value={privacy.profileVisibility} onValueChange={(val) => handlePrivacyChange('profileVisibility', val)}>
                                <SelectTrigger id="profile-visibility"><SelectValue placeholder="Select..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="everyone">Everyone</SelectItem>
                                    <SelectItem value="colleagues">Colleagues only</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">Control who can see your profile information.</p>
                        </div>
                        <div>
                            <Label htmlFor="data-sharing">Data Sharing</Label>
                            <Select value={privacy.dataSharing} onValueChange={(val) => handlePrivacyChange('dataSharing', val)}>
                                <SelectTrigger id="data-sharing"><SelectValue placeholder="Select..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full">Full</SelectItem>
                                    <SelectItem value="limited">Limited - Share only essential data</SelectItem>
                                    <SelectItem value="none">Do not share</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">Manage how your data is shared with providers.</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="research-participation">Research Participation</Label>
                                <Switch id="research-participation" checked={privacy.researchParticipation} onCheckedChange={(val) => handlePrivacyChange('researchParticipation', val)} />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Allow anonymized data for medical research.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Connected Devices Card */}
                <Card>
                    <CardHeader><CardTitle>Connected Devices</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {devices.map(device => (
                                <div key={device.id} className="flex items-center space-x-4">
                                    <DeviceIcon type={device.type} />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{device.name}</p>
                                        <p className="text-xs text-muted-foreground">Last active: {device.lastActive} • {device.location}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => removeDevice(device.id)}>
                                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6">
                            <Plus className="h-4 w-4 mr-2" /> Add New Device
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Explanation Modal */}
            <Dialog open={isExplanationModalOpen} onOpenChange={setIsExplanationModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Understanding Your Privacy Settings</DialogTitle>
                        <DialogDescription>
                            Here’s a simple explanation of your current choices.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 prose prose-sm max-w-none">
                        {isExplanationLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ) : (
                             <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsExplanationModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
