import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// --- INITIAL DATA ---
const initialData = {
    allergies: [
        { id: 1, allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis' },
        { id: 2, allergen: 'Shellfish', severity: 'Moderate', reaction: 'Hives and swelling' },
    ],
    chronicConditions: [
        { id: 1, condition: 'Hypertension', diagnosed: '2018-03-15', status: 'Active' },
    ],
    medications: [
        { id: 1, name: 'Lisinopril 10mg', dosage: '10mg', frequency: 'Once daily', purpose: 'Blood pressure' },
    ],
    familyHistory: [
        { id: 1, condition: 'Coronary Artery Disease', relation: 'Father' },
        { id: 2, condition: 'Type 2 Diabetes', relation: 'Mother' },
    ],
};

const getSeverityBadge = (severity) => ({ severe: 'destructive', moderate: 'warning', mild: 'default' }[severity?.toLowerCase()] || 'default');
const getStatusBadge = (status) => ({ active: 'success', inactive: 'secondary', resolved: 'default' }[status?.toLowerCase()] || 'default');

// Reusable Edit Section Component
const EditSection = ({ title, onSave, onCancel }) => (
    <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
            <Button size="sm" onClick={onSave}><Save className="h-4 w-4 mr-2" />Save</Button>
            <Button size="sm" variant="outline" onClick={onCancel}><X className="h-4 w-4 mr-2" />Cancel</Button>
        </div>
    </CardHeader>
);

// Reusable Display Section Component
const DisplaySection = ({ title, onEdit }) => (
    <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onEdit} className="whitespace-nowrap">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
        </Button>
    </CardHeader>
);


// --- MAIN COMPONENT ---
export default function MedicalProfile() {
    const [isEditing, setIsEditing] = useState({
        allergies: false,
        conditions: false,
        medications: false,
        familyHistory: false,
    });

    const [allergies, setAllergies] = useState(initialData.allergies);
    const [conditions, setConditions] = useState(initialData.chronicConditions);
    const [medications, setMedications] = useState(initialData.medications);
    const [familyHistory, setFamilyHistory] = useState(initialData.familyHistory);
    
    // State for new entries in forms
    const [newAllergy, setNewAllergy] = useState({ allergen: '', severity: '', reaction: '' });
    const [newCondition, setNewCondition] = useState({ condition: '', diagnosed: '', status: '' });
    const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', purpose: '' });
    const [newFamilyMember, setNewFamilyMember] = useState({ condition: '', relation: '' });

    // Store original data when editing starts
    const [originalData, setOriginalData] = useState({});

    const handleEdit = (section) => {
        setIsEditing(prev => ({ ...prev, [section]: true }));
        // Store a copy of the current data for cancellation
        if (section === 'allergies') setOriginalData(prev => ({ ...prev, allergies: [...allergies] }));
        if (section === 'conditions') setOriginalData(prev => ({ ...prev, conditions: [...conditions] }));
        if (section === 'medications') setOriginalData(prev => ({ ...prev, medications: [...medications] }));
        if (section === 'familyHistory') setOriginalData(prev => ({ ...prev, familyHistory: [...familyHistory] }));
    };

    const handleCancel = (section) => {
        setIsEditing(prev => ({ ...prev, [section]: false }));
        // Restore original data
        if (section === 'allergies' && originalData.allergies) setAllergies(originalData.allergies);
        if (section === 'conditions' && originalData.conditions) setConditions(originalData.conditions);
        if (section === 'medications' && originalData.medications) setMedications(originalData.medications);
        if (section === 'familyHistory' && originalData.familyHistory) setFamilyHistory(originalData.familyHistory);
    };

    const handleSave = (section) => {
        setIsEditing(prev => ({ ...prev, [section]: false }));
        // Log the current data
        if (section === 'allergies') console.log("Saving Allergies:", allergies);
        if (section === 'conditions') console.log("Saving Chronic Conditions:", conditions);
        if (section === 'medications') console.log("Saving Medications:", medications);
        if (section === 'familyHistory') console.log("Saving Family History:", familyHistory);
    };

    // --- Data Manipulation Functions ---
    const addAllergy = () => {
        if (!newAllergy.allergen || !newAllergy.severity || !newAllergy.reaction) return;
        setAllergies([...allergies, { ...newAllergy, id: Date.now() }]);
        setNewAllergy({ allergen: '', severity: '', reaction: '' });
    };
    
    const addCondition = () => {
        if (!newCondition.condition || !newCondition.diagnosed || !newCondition.status) return;
        setConditions([...conditions, { ...newCondition, id: Date.now() }]);
        setNewCondition({ condition: '', diagnosed: '', status: '' });
    };
    
    const addMedication = () => {
        if (!newMedication.name || !newMedication.dosage) return;
        setMedications([...medications, { ...newMedication, id: Date.now() }]);
        setNewMedication({ name: '', dosage: '', frequency: '', purpose: '' });
    };

    const addFamilyMember = () => {
        if (!newFamilyMember.condition || !newFamilyMember.relation) return;
        setFamilyHistory([...familyHistory, { ...newFamilyMember, id: Date.now() }]);
        setNewFamilyMember({ condition: '', relation: '' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allergies Card */}
            <Card>
                {isEditing.allergies ? (
                    <EditSection title="Allergies" onSave={() => handleSave('allergies')} onCancel={() => handleCancel('allergies')} />
                ) : (
                    <DisplaySection title="Allergies" onEdit={() => handleEdit('allergies')} />
                )}
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Allergen</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Reaction</TableHead>
                                {isEditing.allergies && <TableHead className="w-[50px]"></TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allergies.map((allergy) => (
                                <TableRow key={allergy.id}>
                                    <TableCell className="font-medium">{allergy.allergen}</TableCell>
                                    <TableCell><Badge variant={getSeverityBadge(allergy.severity)}>{allergy.severity}</Badge></TableCell>
                                    <TableCell>{allergy.reaction}</TableCell>
                                    {isEditing.allergies && (
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => setAllergies(allergies.filter(a => a.id !== allergy.id))}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {isEditing.allergies && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-sm mb-2">Add New Allergy</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                                <div><Label htmlFor="allergen">Allergen</Label><Input id="allergen" placeholder="e.g., Peanuts" value={newAllergy.allergen} onChange={(e) => setNewAllergy({...newAllergy, allergen: e.target.value})} /></div>
                                <div><Label htmlFor="severity">Severity</Label><Select value={newAllergy.severity} onValueChange={(val) => setNewAllergy({...newAllergy, severity: val})}><SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger><SelectContent><SelectItem value="Mild">Mild</SelectItem><SelectItem value="Moderate">Moderate</SelectItem><SelectItem value="Severe">Severe</SelectItem></SelectContent></Select></div>
                                <div><Label htmlFor="reaction">Reaction</Label><Input id="reaction" placeholder="e.g., Hives" value={newAllergy.reaction} onChange={(e) => setNewAllergy({...newAllergy, reaction: e.target.value})} /></div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={addAllergy}><Plus className="h-4 w-4 mr-2" />Add Allergy</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Chronic Conditions Card */}
            <Card>
                {isEditing.conditions ? (
                    <EditSection title="Chronic Conditions" onSave={() => handleSave('conditions')} onCancel={() => handleCancel('conditions')} />
                ) : (
                    <DisplaySection title="Chronic Conditions" onEdit={() => handleEdit('conditions')} />
                )}
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Condition</TableHead>
                                <TableHead>Diagnosed</TableHead>
                                <TableHead>Status</TableHead>
                                {isEditing.conditions && <TableHead className="w-[50px]"></TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {conditions.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.condition}</TableCell>
                                    <TableCell>{c.diagnosed}</TableCell>
                                    <TableCell><Badge variant={getStatusBadge(c.status)}>{c.status}</Badge></TableCell>
                                    {isEditing.conditions && (
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => setConditions(conditions.filter(item => item.id !== c.id))}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {isEditing.conditions && (
                        <div className="mt-4 pt-4 border-t">
                             <h4 className="font-medium text-sm mb-2">Add New Condition</h4>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                                 <div><Label htmlFor="condition-name">Condition Name</Label><Input id="condition-name" placeholder="e.g., Hypertension" value={newCondition.condition} onChange={(e) => setNewCondition({...newCondition, condition: e.target.value})} /></div>
                                 <div><Label htmlFor="date-diagnosed">Date Diagnosed</Label><Input id="date-diagnosed" type="date" value={newCondition.diagnosed} onChange={(e) => setNewCondition({...newCondition, diagnosed: e.target.value})} /></div>
                                 <div><Label htmlFor="condition-status">Current Status</Label><Select value={newCondition.status} onValueChange={(val) => setNewCondition({...newCondition, status: val})}><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem><SelectItem value="Resolved">Resolved</SelectItem></SelectContent></Select></div>
                             </div>
                             <div className="flex justify-end">
                                <Button onClick={addCondition}><Plus className="h-4 w-4 mr-2" />Add Condition</Button>
                             </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Current Medications Card */}
            <Card>
                {isEditing.medications ? (
                    <EditSection title="Current Medications" onSave={() => handleSave('medications')} onCancel={() => handleCancel('medications')} />
                ) : (
                    <DisplaySection title="Current Medications" onEdit={() => handleEdit('medications')} />
                )}
                <CardContent className="space-y-4">
                    {medications.map((med) => (
                        <div key={med.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border">
                            <div>
                                <p className="font-semibold">{med.name}</p>
                                <p className="text-sm text-muted-foreground">Dosage: {med.dosage} | Frequency: {med.frequency}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    <span className="font-medium">Purpose:</span> {med.purpose}
                                </p>
                            </div>
                            {isEditing.medications && (
                                <Button variant="ghost" size="icon" className="-mr-2 -mt-2" onClick={() => setMedications(medications.filter(item => item.id !== med.id))}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                     {isEditing.medications && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-sm mb-2">Add New Medication</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                                <div><Label htmlFor="med-name">Medication Name</Label><Input id="med-name" placeholder="e.g., Lisinopril" value={newMedication.name} onChange={(e) => setNewMedication({...newMedication, name: e.target.value})} /></div>
                                <div><Label htmlFor="med-dosage">Dosage</Label><Input id="med-dosage" placeholder="e.g., 10mg" value={newMedication.dosage} onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})} /></div>
                                <div><Label htmlFor="med-frequency">Frequency</Label><Select value={newMedication.frequency} onValueChange={(val) => setNewMedication({...newMedication, frequency: val})}><SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger><SelectContent><SelectItem value="Once daily">Once daily</SelectItem><SelectItem value="Twice daily">Twice daily</SelectItem><SelectItem value="As needed">As needed</SelectItem></SelectContent></Select></div>
                                <div><Label htmlFor="med-purpose">Purpose</Label><Input id="med-purpose" placeholder="e.g., Blood pressure" value={newMedication.purpose} onChange={(e) => setNewMedication({...newMedication, purpose: e.target.value})} /></div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={addMedication}><Plus className="h-4 w-4 mr-2" />Add Medication</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Family Medical History Card */}
             <Card>
                {isEditing.familyHistory ? (
                    <EditSection title="Family Medical History" onSave={() => handleSave('familyHistory')} onCancel={() => handleCancel('familyHistory')} />
                ) : (
                    <DisplaySection title="Family Medical History" onEdit={() => handleEdit('familyHistory')} />
                )}
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Condition</TableHead>
                                <TableHead>Relation</TableHead>
                                {isEditing.familyHistory && <TableHead className="w-[50px]"></TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {familyHistory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.condition}</TableCell>
                                    <TableCell>{item.relation}</TableCell>
                                    {isEditing.familyHistory && (
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => setFamilyHistory(familyHistory.filter(fh => fh.id !== item.id))}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {isEditing.familyHistory && (
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-sm mb-2">Add Family History</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                                <div><Label htmlFor="fam-condition">Medical Condition</Label><Input id="fam-condition" placeholder="e.g., Diabetes Type 2" value={newFamilyMember.condition} onChange={(e) => setNewFamilyMember({...newFamilyMember, condition: e.target.value})} /></div>
                                <div><Label htmlFor="fam-relation">Family Relation</Label><Select value={newFamilyMember.relation} onValueChange={(val) => setNewFamilyMember({...newFamilyMember, relation: val})}><SelectTrigger><SelectValue placeholder="Select relation" /></SelectTrigger><SelectContent><SelectItem value="Mother">Mother</SelectItem><SelectItem value="Father">Father</SelectItem><SelectItem value="Sibling">Sibling</SelectItem><SelectItem value="Grandparent">Grandparent</SelectItem></SelectContent></Select></div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={addFamilyMember}><Plus className="h-4 w-4 mr-2" />Add History</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
