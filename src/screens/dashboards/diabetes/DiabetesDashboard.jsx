import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Download, Bell, User, Flame, Target, Heart, Activity, FileText, Upload, Eye, AlertTriangle, CheckCircle, Info, GraduationCap, Dumbbell, FileClock, X } from 'lucide-react';

// Mock Data based on the provided images

const bloodGlucoseData = [
  { name: '3h ago', value: 110 },
  { name: '2h ago', value: 118 },
  { name: '1h ago', value: 115 },
  { name: 'Now', value: 115 },
];

const hba1cData = [
  { name: '6 months ago', value: 7.0 },
  { name: '3 months ago', value: 7.2 },
  { name: 'Current', value: 6.8 },
];

const healthTimelineData = [
    { name: 'Aug 05', glucose: 105 },
    { name: 'Aug 06', glucose: 110 },
    { name: 'Aug 07', glucose: 108 },
    { name: 'Aug 08', glucose: 120 },
    { name: 'Aug 09', glucose: 115 },
    { name: 'Aug 10', glucose: 112 },
    { name: 'Aug 11', glucose: 105 },
];

const riskAssessmentData = [
  { name: 'Low Risk', value: 50, color: '#22c55e' },
  { name: 'Poor Quality', value: 24, color: '#ef4444' },
  { name: 'Satisfactory', value: 13, color: '#f97316' },
  { name: 'Moderate', value: 13, color: '#eab308' },
];

// --- UPDATED COMPONENTS FOR NOTIFICATIONS AND CONFETTI ---

const Confetti = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef();

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const pieces = [];
        const numberOfPieces = 150;
        const gravity = 0.08;
        const friction = 0.99;
        let lastUpdateTime = 0;

        // Origin point for the burst (top right corner)
        const burstOrigin = { x: width - 50, y: 50 };

        function createPiece() {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            return {
                x: burstOrigin.x,
                y: burstOrigin.y,
                w: Math.random() * 8 + 5,
                h: Math.random() * 8 + 5,
                opacity: 1,
                rotation: Math.random() * 360,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            };
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(createPiece());
        }

        function update(time) {
            if (!lastUpdateTime) lastUpdateTime = time;
            
            ctx.clearRect(0, 0, width, height);

            let allPiecesOffScreen = true;
            pieces.forEach(piece => {
                if (piece.opacity > 0) {
                     allPiecesOffScreen = false;
                    
                    piece.x += piece.vx;
                    piece.y += piece.vy;
                    
                    piece.vy += gravity; // Apply gravity
                    piece.vx *= friction; // Apply friction
                    piece.vy *= friction;

                    piece.rotation += piece.vx;
                    piece.opacity -= 0.005; // Fade out

                    ctx.save();
                    ctx.globalAlpha = piece.opacity;
                    ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
                    ctx.rotate(piece.rotation * Math.PI / 180);
                    ctx.fillStyle = piece.color;
                    ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
                    ctx.restore();
                }
            });

            if (allPiecesOffScreen) {
                cancelAnimationFrame(animationFrameId.current);
                if (onComplete) onComplete();
            } else {
                animationFrameId.current = requestAnimationFrame(update);
            }
        }
        
        animationFrameId.current = requestAnimationFrame(update);

    }, [onComplete]);

    useEffect(() => {
        draw();
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [draw]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />;
};


// Notification Component
const Notification = ({ icon, title, message, onDismiss }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 animate-slide-in-right">
        <div className="flex items-start">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
                <button onClick={onDismiss} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    </div>
);


// Individual Card Components

const BloodGlucoseCard = () => (
  <Card className="col-span-1 md:col-span-2">
    <CardHeader>
      <CardTitle>Blood Glucose</CardTitle>
      <CardDescription>Current reading and recent trends</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-center mb-4">
        <p className="text-5xl font-bold">115</p>
        <p className="text-sm text-muted-foreground">mg/dL</p>
        <p className="text-xs text-green-500">↑ Above average</p>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={bloodGlucoseData}>
          <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} tick={{ fontSize: 12 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const InsightSnapshotCard = () => {
    const [insightIndex, setInsightIndex] = useState(0);
    const insights = [
        { priority: 'medium', title: 'Consider a low-carb snack', description: 'Your afternoon glucose readings show a slight spike. Try almonds or cheese for your 3pm snack instead of crackers.', tag: 'Nutrition' },
        { priority: 'high', title: 'Increase morning activity', description: 'Your fasting glucose is slightly elevated. A 15-minute morning walk could help manage it better.', tag: 'Exercise' },
        { priority: 'low', title: 'Great job with hydration!', description: 'Your hydration levels are optimal, which positively impacts your glucose stability. Keep it up!', tag: 'Lifestyle' }
    ];

    const currentInsight = insights[insightIndex];
    const nextInsight = () => setInsightIndex((prev) => (prev + 1) % insights.length);
    const prevInsight = () => setInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);

    return(
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Insight Snapshot</CardTitle>
            <div className="flex items-center gap-2">
              <button onClick={prevInsight} className="p-1 rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-sm text-muted-foreground">{insightIndex + 1} / {insights.length}</span>
              <button onClick={nextInsight} className="p-1 rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <CardDescription>Lifestyle-adaptive recommendation</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex justify-between items-start mb-2">
             <Badge variant={currentInsight.priority === 'medium' ? 'secondary' : 'default'} className={currentInsight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>{currentInsight.priority} priority</Badge>
             <Badge variant="outline">{currentInsight.tag}</Badge>
           </div>
          <p className="font-semibold mb-2">{currentInsight.title}</p>
          <p className="text-sm text-muted-foreground mb-4">{currentInsight.description}</p>
          <Button className="w-full">Take Action <ChevronRight className="h-4 w-4 ml-2" /></Button>
        </CardContent>
         <CardFooter>
            <div className="w-full flex justify-center gap-2">
                {insights.map((_, i) => (
                    <div key={i} className={`h-1.5 w-4 rounded-full ${i === insightIndex ? 'bg-primary' : 'bg-muted'}`}></div>
                ))}
            </div>
        </CardFooter>
      </Card>
    );
};

const RiskAssessmentCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Risk Assessment</CardTitle>
      <CardDescription>Diabetes complication risk factors</CardDescription>
    </CardHeader>
    <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="relative">
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie data={riskAssessmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2}>
                            {riskAssessmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">50%</span>
                    <span className="text-sm text-muted-foreground">Overall Health</span>
                </div>
            </div>
            <div className="text-sm space-y-2">
                {riskAssessmentData.map(item => (
                    <div key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>1 area needs immediate attention</span>
        </div>
    </CardContent>
  </Card>
);

const Hba1cCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>HbA1c</CardTitle>
      <CardDescription>3-month average blood sugar control</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-baseline mb-4">
        <div>
            <p className="text-4xl font-bold">6.8%</p>
            <p className="text-sm text-green-600">Excellent</p>
        </div>
        <div className="text-right text-sm space-y-1 text-muted-foreground">
            <p>Target <span className="font-semibold text-primary">&lt; 7.0%</span></p>
            <p>3 months ago <span className="font-semibold text-primary">7.2%</span></p>
            <p>6 months ago <span className="font-semibold text-primary">7.0%</span></p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={hba1cData}>
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
          <YAxis domain={[6.5, 7.5]} hide />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        <span>Improving trend - Keep up the good work!</span>
      </div>
    </CardContent>
  </Card>
);

const BloodPressureCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Blood Pressure</CardTitle>
            <CardDescription>Cardiovascular health monitoring</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center mb-4">
                <p className="text-4xl font-bold">142<span className="text-2xl text-muted-foreground">/</span>89</p>
                <p className="text-sm text-muted-foreground">mmHg</p>
                <Badge className="mt-1 bg-red-100 text-red-800">High Blood Pressure</Badge>
            </div>
            <div className="text-sm space-y-2 text-muted-foreground">
                <div className="flex justify-between"><span>This week avg:</span><span className="font-semibold text-primary">138/85</span></div>
                <div className="flex justify-between"><span>Last month avg:</span><span className="font-semibold text-primary">135/82</span></div>
                <div className="flex justify-between"><span>Target:</span><span className="font-semibold text-green-600">&lt;130/80</span></div>
            </div>
        </CardContent>
    </Card>
);

const ExerciseTrackingCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Exercise Tracking</CardTitle>
            <CardDescription>Physical activity and fitness goals</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold">127</p>
            <p className="text-sm text-muted-foreground mb-2">minutes this week</p>
            <Progress value={(127/150)*100} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground text-right">85% of weekly goal (150 min)</p>
            <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Walking</span><span>45 min</span></div>
                <div className="flex justify-between"><span>Swimming</span><span>30 min</span></div>
                <div className="flex justify-between"><span>Cycling</span><span>52 min</span></div>
            </div>
        </CardContent>
    </Card>
);

const DailyNutritionCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Daily Nutrition</CardTitle>
            <CardDescription>Carbohydrate and calorie tracking</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1"><span>Carbohydrates</span><span>165g / 180g</span></div>
                    <Progress value={(165/180)*100} className="h-2" />
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1"><span>Calories</span><span>1847 / 2000</span></div>
                    <Progress value={(1847/2000)*100} className="h-2" />
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1"><span>Fiber</span><span>18g / 25g</span></div>
                    <Progress value={(18/25)*100} className="h-2" />
                </div>
            </div>
        </CardContent>
    </Card>
);

const HealthTimelineCard = () => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <CardTitle>Health Timeline</CardTitle>
                    <CardDescription>Interactive view of your health metrics over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-md">
                        <Button size="sm" variant="secondary">7 Days</Button>
                        <Button size="sm" variant="ghost">30 Days</Button>
                        <Button size="sm" variant="ghost">3 Months</Button>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} tick={{ fontSize: 12 }} />
                    <YAxis domain={[35, 140]} tickLine={false} axisLine={false} dx={-10} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="glucose" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey={() => 110} stroke="#a1a1aa" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-around text-center text-sm mt-4">
                <div><p className="text-muted-foreground">Average</p><p className="font-bold">121.3 mg/dL</p></div>
                <div><p className="text-muted-foreground">Target</p><p className="font-bold">120 mg/dL</p></div>
                <div><p className="text-muted-foreground">Trend</p><Badge className="bg-green-100 text-green-800">Improving</Badge></div>
            </div>
        </CardContent>
    </Card>
);

const RecentActivityCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest health measurements and actions</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-full"><FileClock className="h-5 w-5 text-blue-500" /></div>
                    <div>
                        <div className="flex justify-between items-center w-full"><p className="font-semibold">Blood Glucose Reading</p><p className="text-xs text-muted-foreground">about 2 hours ago</p></div>
                        <p className="text-sm">115 mg/dL, recorded after lunch</p>
                        <Badge variant="outline" className="mt-1">Slightly elevated</Badge>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full"><CheckCircle className="h-5 w-5 text-green-500" /></div>
                    <div>
                        <div className="flex justify-between items-center w-full"><p className="font-semibold">Medication Taken</p><p className="text-xs text-muted-foreground">about 4 hours ago</p></div>
                        <p className="text-sm">Metformin 850mg taken with breakfast</p>
                        <Badge className="mt-1 bg-green-100 text-green-800">On schedule</Badge>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 rounded-full"><Dumbbell className="h-5 w-5 text-purple-500" /></div>
                    <div>
                        <div className="flex justify-between items-center w-full"><p className="font-semibold">Exercise Session</p><p className="text-xs text-muted-foreground">1 day ago</p></div>
                        <p className="text-sm">30-minute walk in the park</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800">Goal achieved</Badge>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

const MedicalDocumentsCard = () => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>Medical Documents</CardTitle>
                <CardDescription>Reports and files from your healthcare providers</CardDescription>
            </div>
            <Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Upload</Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-green-500" /><div><p className="font-semibold text-sm">Lab_Results_December_2024.pdf</p><p className="text-xs text-muted-foreground">15 minutes ago</p></div></div>
                        <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground cursor-pointer" /><Download className="h-4 w-4 text-muted-foreground cursor-pointer" /></div>
                    </div>
                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs"><p className="font-bold text-blue-600">AI Summary</p><p className="text-muted-foreground">Latest HbA1c: 6.8% (improved from 7.2%). Kidney function normal. Cholesterol levels within target range.</p></div>
                </div>
                 <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-yellow-500" /><div><p className="font-semibold text-sm">Prescription_Update_Jan_2025.pdf</p><p className="text-xs text-muted-foreground">3 days ago</p></div></div>
                        <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground cursor-pointer" /><Download className="h-4 w-4 text-muted-foreground cursor-pointer" /></div>
                    </div>
                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs"><p className="font-bold text-blue-600">AI Summary</p><p className="text-muted-foreground">Updated Metformin dosage to 850mg twice daily. Added Lisinopril 10mg for blood pressure management.</p></div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="justify-center"><Button variant="ghost">View All Documents (3)</Button></CardFooter>
    </Card>
);

const HealthRecommendationsCard = () => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
            <CardTitle>Health Recommendations</CardTitle>
            <CardDescription>Personalized tips based on your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg"><AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" /><div><p className="font-semibold">High Priority</p><p className="text-sm text-muted-foreground">Blood pressure consistently elevated. Schedule appointment with your doctor to discuss medication adjustment.</p></div></div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg"><Info className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" /><div><p className="font-semibold">Moderate Priority</p><p className="text-sm text-muted-foreground">Consider increasing fiber intake to reach daily goals. Add more vegetables and whole grains to meals.</p></div></div>
            <div className="flex items-start gap-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" /><div><p className="font-semibold">Good Progress</p><p className="text-sm text-muted-foreground">Your HbA1c is improving! Continue with current diet and exercise routine to maintain this positive trend.</p></div></div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"><GraduationCap className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" /><div><p className="font-semibold">Education</p><p className="text-sm text-muted-foreground">New diabetes management article available: "Managing Post-Meal Blood Sugar Spikes".</p></div></div>
        </CardContent>
    </Card>
);


// Main Dashboard Component
const DiabetesDashboard = () => (
  <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
    <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Diabetes Dashboard</h1>
                <p className="text-muted-foreground">Monitor glucose levels and manage your diabetes health</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                 <Button variant="outline"><Calendar className="h-4 w-4 mr-2" /> Last 30 days</Button>
                 <Button><Download className="h-4 w-4 mr-2" /> Export Report</Button>
                 <Bell className="text-muted-foreground cursor-pointer" />
                 <User className="text-muted-foreground cursor-pointer" />
            </div>
        </div>
    </header>
    <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Row 1: Key Metrics & Documents */}
      <BloodGlucoseCard />
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Hba1cCard />
        <BloodPressureCard />
      </div>
      <MedicalDocumentsCard />
      
      {/* Row 2: Timeline & Assessment */}
      <HealthTimelineCard />
      <RiskAssessmentCard />

      {/* Row 3: Daily Tracking & Insights */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExerciseTrackingCard />
        <DailyNutritionCard />
      </div>
      <RecentActivityCard />
      <InsightSnapshotCard />

      {/* Row 4: Recommendations */}
      <HealthRecommendationsCard />
    </main>
  </div>
);


// App component to control rendering
export default function DashboardEntryPoint() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGenerateDashboard = () => {
    setShowDashboard(true);

    // Queue notifications to show one after another
    const notifs = [
      { id: 1, icon: <Target className="h-8 w-8 text-red-500" />, title: "New Achievement!", message: "7-Day Glucose Monitoring Streak. Great job!", confetti: true },
      { id: 2, icon: <Flame className="h-8 w-8 text-orange-500" />, title: "Health Streak Update", message: "You're on a 12-day glucose monitoring streak!", confetti: false },
    ];

    notifs.forEach(notif => {
            setNotifications(prev => [...prev, notif]);
            if (notif.confetti) {
                setShowConfetti(true);
            }
    });
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleConfettiComplete = useCallback(() => {
      setShowConfetti(false);
  }, []);

  if (!showDashboard) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Diabetes Health Analytics</h1>
            <p className="text-lg text-muted-foreground mb-8">Click the button below to generate your personalized health dashboard.</p>
            <Button size="lg" onClick={handleGenerateDashboard}>
                Generate Diabetes Dashboard
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showConfetti && <Confetti onComplete={handleConfettiComplete} />}
      <div className="fixed top-5 right-5 z-40 space-y-4">
          {notifications.map(notif => (
              <Notification 
                  key={notif.id}
                  {...notif}
                  onDismiss={() => dismissNotification(notif.id)}
              />
          ))}
      </div>
      <DiabetesDashboard />
    </div>
  );
}
