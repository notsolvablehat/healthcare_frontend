import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Target,
  HeartPulse,
  CalendarDays,
  Download,
  Eye,
  Pill,
  Plus,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


const cardStyles = {
  compact: {
    padding: '12px',
    minHeight: '120px',
  },
  compactHeader: {
    paddingBottom: '8px',
  },
  compactContent: {
    padding: '8px 0',
  }
};

// Mock data
const healthMetricsData = {
  bloodGlucose: {
    current: 115,
    unit: 'mg/dL',
    target: '80-130',
    history: [
      { name: 'May 1', value: 120 },
      { name: 'May 8', value: 110 },
      { name: 'May 15', value: 118 },
      { name: 'May 22', value: 115 },
    ],
    progress: 75,
  },
  hba1c: {
    current: 6.8,
    unit: '%',
    target: '< 7.0',
    history: [
      { name: '6m ago', value: 7.2 },
      { name: '3m ago', value: 7.0 },
      { name: 'Current', value: 6.8 },
    ],
    progress: 80,
  },
  bloodPressure: {
    current: '128/82',
    unit: 'mmHg',
    target: '< 130/80',
    history: [
      { name: 'May 1', systolic: 130, diastolic: 85 },
      { name: 'May 8', systolic: 132, diastolic: 84 },
      { name: 'May 15', systolic: 129, diastolic: 83 },
      { name: 'May 22', systolic: 128, diastolic: 82 },
    ],
    progress: 85,
  },
};

const glucoseLevelsData = [
  { day: 'Mon', glucose: 130, target: 130 },
  { day: 'Tue', glucose: 145, target: 130 },
  { day: 'Wed', glucose: 120, target: 130 },
  { day: 'Thu', glucose: 110, target: 130 },
  { day: 'Fri', glucose: 150, target: 130 },
  { day: 'Sat', glucose: 160, target: 130 },
  { day: 'Sun', glucose: 125, target: 130 },
];

const medicationData = [
  { name: 'Metformin', adherence: 95, color: '#22c55e' },
  { name: 'Lisinopril', adherence: 90, color: '#22c55e' },
  { name: 'Insulin', adherence: 85, color: '#eab308' },
];

const riskFactorData = [
  { name: 'Neuropathy', value: 25, color: '#ef4444' },
  { name: 'Retinopathy', value: 15, color: '#f97316' },
  { name: 'Nephropathy', value: 10, color: '#eab308' },
  { name: 'Low Risk', value: 50, color: '#22c55e' },
];

const recentActivityData = [
  { 
    icon: CalendarDays, 
    title: 'Endocrinologist Follow-up', 
    time: 'May 25, 2025 - 10:00 AM', 
    status: 'Upcoming',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  { 
    icon: CheckCircle, 
    title: 'Annual Retina Scan', 
    time: 'Completed on May 02, 2025', 
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800'
  },
  { 
    icon: Pill, 
    title: 'Metformin Refill Due', 
    time: 'Due in 3 days', 
    status: 'Active',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  { 
    icon: CheckCircle, 
    title: 'Podiatrist Check-up', 
    time: 'Completed on Apr 15, 2025', 
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800'
  },
];

const DashboardHeader = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Diabetes Dashboard</h1>
      <p className="text-gray-600 mt-1">Monitor glucose levels and manage your diabetes health</p>
    </div>
    <div className="flex items-center gap-3 mt-4 md:mt-0">
      <Button variant="outline" className="flex items-center gap-2">
        <CalendarDays className="w-4 h-4" />
        Last 30 days
      </Button>
      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
        <Download className="w-4 h-4" />
        Export Report
      </Button>
    </div>
  </div>
);

const HealthMetricCard = ({ icon: Icon, title, value, unit, target, progress, color, children }) => (
  <Card className="h-full" style={cardStyles.compact}>
    <CardHeader className="flex flex-row items-center justify-between pb-3">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <CardTitle className="text-sm font-medium text-gray-900">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {value}<span className="text-sm text-gray-500 ml-1 font-normal">{unit}</span>
          </div>
          <p className="text-xs text-gray-500">Target: {target}</p>
        </div>
        <Progress value={progress} className="h-2" />
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Recent History</span>
            <button className="text-xs text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {children}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BodyVisualization = () => {
  const Marker = ({ top, left, label, info }) => (
    <div className="absolute group" style={{ top, left }}>
      <div className="w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center cursor-pointer shadow-lg">
        <Plus className="w-2 h-2 text-white" />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-white border border-gray-200 text-gray-800 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
        <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
        <p className="text-gray-600">{info}</p>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Body Health Indicators
        </CardTitle>
        <CardDescription>Interactive map of diabetes-related health points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 flex justify-center items-center bg-gray-50 rounded-lg">
            <img 
                src="/person-silhouette.jpg" 
                alt="Human body silhouette for health mapping"
                className="w-48 h-48"
                onError={(e) => {
                e.target.style.display = 'none';
                }}
            />
          <Marker top="15%" left="45%" label="Eyes (Retinopathy)" info="High blood sugar can damage blood vessels in the retina." />
          <Marker top="45%" left="48%" label="Pancreas" info="Reduced insulin production leads to high blood sugar." />
          <Marker top="55%" left="52%" label="Kidneys (Nephropathy)" info="Diabetes can impair kidney function over time." />
          <Marker top="85%" left="42%" label="Feet (Neuropathy)" info="Nerve damage can cause numbness and injury risk." />
        </div>
      </CardContent>
    </Card>
  );
};

const GlucoseLevelsChart = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Glucose Levels
      </CardTitle>
      <CardDescription>Blood glucose readings over the last 7 days</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={glucoseLevelsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              domain={[60, 200]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="glucose" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#ef4444" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const MedicationAdherence = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Pill className="w-5 h-5" />
        Medication Adherence
      </CardTitle>
      <CardDescription>Your medication schedule and effectiveness</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {medicationData.map((med) => (
          <div key={med.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm text-gray-900">{med.name}</p>
              <p className="text-sm font-semibold text-gray-900">{med.adherence}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${med.adherence}%`, 
                  backgroundColor: med.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const RiskFactors = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Risk Assessment
      </CardTitle>
      <CardDescription>5-year complication risk factors</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskFactorData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {riskFactorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {riskFactorData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-600">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Activity
      </CardTitle>
      <CardDescription>Latest diabetes-related events</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {recentActivityData.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                {activity.status}
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default function DiabetesDashboard() {
  const { bloodGlucose, hba1c, bloodPressure } = healthMetricsData;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top row - Body visualization and charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <BodyVisualization />
              <div className="space-y-6">
                <MedicationAdherence />
                <RiskFactors />
              </div>
            </div>
            
            {/* Glucose levels chart */}
            <GlucoseLevelsChart />
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6 h-[20rem]">
            {/* Health metrics cards */}
            <HealthMetricCard 
              icon={HeartPulse} 
              title="Blood Glucose" 
              value={bloodGlucose.current} 
              unit={bloodGlucose.unit}
              target={bloodGlucose.target}
              progress={bloodGlucose.progress}
              color="bg-blue-500"
            >
              {bloodGlucose.history.map(h => (
                <div key={h.name} className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm font-bold text-gray-900">{h.value}</p>
                  <p className="text-xs text-gray-500">{h.name}</p>
                </div>
              ))}
            </HealthMetricCard>

            <HealthMetricCard 
              icon={Target} 
              title="HbA1c" 
              value={hba1c.current} 
              unit={hba1c.unit}
              target={hba1c.target}
              progress={hba1c.progress}
              color="bg-green-500"
            >
              {hba1c.history.map(h => (
                <div key={h.name} className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm font-bold text-gray-900">{h.value}%</p>
                  <p className="text-xs text-gray-500">{h.name}</p>
                </div>
              ))}
            </HealthMetricCard>

            <HealthMetricCard 
              icon={HeartPulse} 
              title="Blood Pressure" 
              value={bloodPressure.current} 
              unit={bloodPressure.unit}
              target={bloodPressure.target}
              progress={bloodPressure.progress}
              color="bg-red-500"
            >
              {bloodPressure.history.map(h => (
                <div key={h.name} className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-sm font-bold text-gray-900">{h.systolic}/{h.diastolic}</p>
                  <p className="text-xs text-gray-500">{h.name}</p>
                </div>
              ))}
            </HealthMetricCard>

            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}