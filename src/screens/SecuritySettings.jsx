import React, { useState } from 'react';
import { Lock, ShieldCheck, Mail, Plus, Download, Smartphone, Laptop, Monitor, ArrowRight } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const initialLoginHistory = [
    { id: 1, dateTime: 'Jun 15, 2023, 02:00 PM', deviceType: 'phone', device: 'iPhone 13 Pro', location: 'Boston, MA', ip: '192.168.1.1', status: 'Success' },
    { id: 2, dateTime: 'Jun 14, 2023, 11:15 PM', deviceType: 'laptop', device: 'MacBook Pro', location: 'Boston, MA', ip: '192.168.1.1', status: 'Success' },
    { id: 3, dateTime: 'Jun 13, 2023, 02:45 PM', deviceType: 'desktop', device: 'Windows PC', location: 'Boston Medical Center', ip: '10.0.0.25', status: 'Success' },
];

const DeviceIcon = ({ type }) => {
    switch (type) {
        case 'phone': return <Smartphone className="h-4 w-4 text-muted-foreground" />;
        case 'laptop': return <Laptop className="h-4 w-4 text-muted-foreground" />;
        case 'desktop': return <Monitor className="h-4 w-4 text-muted-foreground" />;
        default: return null;
    }
};

// --- MAIN COMPONENT ---
export default function SecuritySettings() {
    const [loginHistory, setLoginHistory] = useState(initialLoginHistory);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Password Management Card */}
                <Card>
                    <CardHeader><CardTitle>Password Management</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <Lock className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">Last changed Apr 10, 2023, 02:15 PM</p>
                                </div>
                            </div>
                            <Button variant="outline">Change</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <ShieldCheck className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">Enabled - Using Authenticator App</p>
                                </div>
                            </div>
                            <Button variant="outline">Disable</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Recovery Card */}
                <Card>
                    <CardHeader><CardTitle>Account Recovery</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-medium text-sm mb-1">Recovery Email</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>s.johnson.personal@gmail.com</span>
                                </div>
                                <Button variant="ghost" size="sm">Change</Button>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-sm mb-2">Recovery Phone</p>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Recovery Phone
                            </Button>
                        </div>
                        <div>
                            <p className="font-medium text-sm mb-1">Backup Codes</p>
                             <p className="text-sm text-muted-foreground mb-2">Backup codes can be used to access your account if you lose your phone or cannot receive two-factor authentication codes.</p>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Download className="h-4 w-4 mr-2" />
                                Generate Backup Codes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Login History Card */}
            <Card>
                <CardHeader><CardTitle>Login History</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loginHistory.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.dateTime}</TableCell>
                                    <TableCell className="flex items-center space-x-2">
                                        <DeviceIcon type={item.deviceType} />
                                        <span>{item.device}</span>
                                    </TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>{item.ip}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Success' ? 'success' : 'destructive'}>{item.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end mt-4">
                        <Button variant="link">
                            View Full History <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
