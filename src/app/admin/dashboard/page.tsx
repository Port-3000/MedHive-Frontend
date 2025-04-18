//src/app/Admin/dashboard/page.tsx

"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
  ComposedChart,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Server,
  Cpu,
  Database,
  Shield,
  Clock,
  Activity,
  Network,
  Key,
  BrainCircuit,
  CircuitBoard,
  Lock,
  HeartPulse,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CYBER_COLORS = ["#00f2fe", "#4facfe", "#8e44ad", "#ff6b6b", "#1dd1a1"];
const GLOW_STYLES = {
  boxShadow: "0 0 15px rgba(0, 242, 254, 0.3)",
};

const generateFederatedMetrics = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    round: i + 1,
    globalAcc: Math.floor(Math.random() * (97 - 85 + 1)) + 85,
    localAcc: Math.floor(Math.random() * (90 - 75 + 1)) + 75,
    dataVolume: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
    latency: Math.random() * 1.5 + 0.5,
    anomalies: Math.floor(Math.random() * 10),
  }));
};

const modelMetrics = {
  ecg: {
    name: "ECG Analysis",
    accuracy: 92.4,
    dataSources: ["Mayo Clinic", "Johns Hopkins", "Mass General"],
    anomalies: 12,
    updates: 45,
    version: "v2.1.4",
    encryption: "AES-256-GCM",
    lastUpdated: "2024-03-20",
    trainingTime: "4.2h",
    params: { layers: 128, epochs: 50, batch_size: 32 },
  },
  xray: {
    name: "X-Ray Detection",
    accuracy: 88.7,
    dataSources: ["Cleveland Clinic", "Stanford Health", "UCLA Medical"],
    anomalies: 8,
    updates: 32,
    version: "v1.9.2",
    encryption: "AES-256-CBC",
    lastUpdated: "2024-03-19",
    trainingTime: "6.1h",
    params: { layers: 256, epochs: 75, batch_size: 64 },
  },
  symptom: {
    name: "Symptom Checker",
    accuracy: 94.1,
    dataSources: ["NIH", "Karolinska Institute", "Oxford Medical"],
    anomalies: 5,
    updates: 28,
    version: "v3.0.1",
    encryption: "AES-256-XTS",
    lastUpdated: "2024-03-18",
    trainingTime: "3.8h",
    params: { layers: 64, epochs: 100, batch_size: 16 },
  },
  breastCancer: {
    name: "Breast Cancer Detection",
    accuracy: 91.2,
    dataSources: ["MD Anderson", "Dana-Farber", "Memorial Sloan Kettering"],
    anomalies: 7,
    updates: 24,
    version: "v1.2.3",
    encryption: "AES-256-GCM",
    lastUpdated: "2024-03-17",
    trainingTime: "5.5h",
    params: { layers: 192, epochs: 60, batch_size: 48 },
  },
  glaucoma: {
    name: "Glaucoma Detection",
    accuracy: 89.5,
    dataSources: [
      "Moorfields Eye Hospital",
      "Wilmer Eye Institute",
      "Mass Eye and Ear",
    ],
    anomalies: 9,
    updates: 31,
    version: "v2.0.8",
    encryption: "AES-256-CBC",
    lastUpdated: "2024-03-16",
    trainingTime: "4.9h",
    params: { layers: 160, epochs: 80, batch_size: 24 },
  },
};

export default function AdminDashboard() {
  const [metricsData, setMetricsData] = useState(generateFederatedMetrics());
  const [selectedModel, setSelectedModel] = useState("ecg");
  const [activeNodes, setActiveNodes] = useState(178);
  const [networkHealth, setNetworkHealth] = useState(98.7);
  const [encryptionStatus, setEncryptionStatus] = useState("AES-256 Active");
  const [securityEvents, setSecurityEvents] = useState([
    {
      id: 1,
      type: "Model Update",
      status: "Verified",
      timestamp: "2024-03-20 14:23",
    },
    {
      id: 2,
      type: "Data Audit",
      status: "Completed",
      timestamp: "2024-03-20 13:45",
    },
    {
      id: 3,
      type: "Encryption Rotate",
      status: "Pending",
      timestamp: "2024-03-20 12:11",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes((prev) =>
        Math.max(100, Math.min(200, prev + Math.floor(Math.random() * 5 - 2)))
      );
      setNetworkHealth((prev) =>
        Math.max(95, Math.min(99.9, prev + Math.random() * 0.4 - 0.2))
      );
      setEncryptionStatus(`AES-256 (${Date.now().toString(16).slice(-6)})`);
      setSecurityEvents((prev) => [
        {
          id: Date.now(),
          type: ["Model Update", "Data Audit", "Access Request"][
            Math.floor(Math.random() * 3)
          ],
          status: ["Verified", "Pending", "Failed"][
            Math.floor(Math.random() * 3)
          ],
          timestamp: new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
        },
        ...prev.slice(0, 2),
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    // Safely extract values with fallbacks
    const globalAcc =
      payload.find((p: any) => p.dataKey === "globalAcc")?.value ?? "N/A";
    const localAcc =
      payload.find((p: any) => p.dataKey === "localAcc")?.value ?? "N/A";
    const dataVolume =
      payload.find((p: any) => p.dataKey === "dataVolume")?.value ?? "N/A";
    const anomalies =
      payload.find((p: any) => p.dataKey === "anomalies")?.value ?? "N/A";

    return (
      <div className="bg-black/90 p-4 rounded-lg border border-cyan-500/30 backdrop-blur-xl">
        <p className="text-cyan-400 font-bold mb-2">Round {label}</p>
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-cyan-500 rounded-full" />
            Global Accuracy: <span className="text-cyan-300">{globalAcc}%</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full" />
            Local Accuracy: <span className="text-purple-300">{localAcc}%</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Data Volume: <span className="text-green-300">{dataVolume}GB</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Anomalies: <span className="text-red-300">{anomalies}</span>
          </p>
        </div>
      </div>
    );
  };

  const ModelRegistry = ({ models }: { models: typeof modelMetrics }) => (
    <CyberCard>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h3 className="text-xl font-bold text-cyan-400">Model Registry</h3>
        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
          {Object.keys(models).length} Registered Models
        </Badge>
      </div>
      <div className="space-y-4">
        {Object.entries(models).map(([key, model]) => (
          <div
            key={key}
            className="p-3 sm:p-4 rounded-lg bg-black/20 border border-cyan-500/20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CircuitBoard className="w-4 h-4 text-purple-400" />
                  <span className="font-medium text-cyan-300">
                    {model.name}
                  </span>
                  <Badge className="text-xs bg-cyan-500/20 text-cyan-400">
                    v{model.version}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-cyan-500">
                    Accuracy: {model.accuracy}%
                  </span>
                  <span className="text-purple-500">
                    Training: {model.trainingTime}
                  </span>
                  <span className="text-green-500">
                    Nodes: {model.dataSources.length}
                  </span>
                </div>
              </div>
              <Button variant="ghost" className="text-cyan-400 mt-2 sm:mt-0">
                View Artifacts
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CyberCard>
  );

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-start sm:items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <CircuitBoard className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MEDHIVE NEURAL CONTROL
            </h1>
          </motion.div>

          <div className="w-full sm:w-[300px]">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full bg-black border-cyan-500/50 hover:border-cyan-400">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="bg-black border-cyan-500/50">
                {Object.entries(modelMetrics).map(([key, model]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="hover:bg-cyan-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{model.name}</span>
                      <span className="text-xs text-purple-400">
                        {model.version}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          <CyberCard
            title="Active Nodes"
            value={activeNodes}
            delta="+4.2%"
            icon={<Network className="w-6 h-6" />}
          />
          <CyberCard
            title="Model Accuracy"
            value={`${
              modelMetrics[selectedModel as keyof typeof modelMetrics].accuracy
            }%`}
            delta="+1.8%"
            icon={<BrainCircuit className="w-6 h-6" />}
          />
          <CyberCard
            title="Network Health"
            value={`${networkHealth.toFixed(1)}%`}
            delta="-0.3%"
            icon={<Activity className="w-6 h-6" />}
            statusIndicator={
              <div
                className={`absolute right-4 bottom-4 w-3 h-3 rounded-full 
                ${
                  networkHealth > 98 ? "bg-green-500" : "bg-yellow-500"
                } animate-pulse`}
              />
            }
          />
          <CyberCard
            title="Encryption"
            value={
              modelMetrics[selectedModel as keyof typeof modelMetrics]
                .encryption
            }
            icon={<Key className="w-6 h-6" />}
            statusIndicator={
              <div
                className="radial-progress text-cyan-500 absolute right-4 bottom-4"
                style={
                  { "--value": 100, "--size": "1.5rem" } as React.CSSProperties
                }
              >
                <Lock className="w-3 h-3" />
              </div>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 relative z-10">
          <CyberCard>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-xl font-bold text-cyan-400">
                Federated Learning Metrics
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  className="text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  Last 15 Rounds
                </Button>
                <Button
                  variant="ghost"
                  className="text-purple-400 border border-purple-500/30 hover:bg-purple-500/10"
                >
                  Compare Models
                </Button>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="round" stroke="#4a5568" />
                  <YAxis yAxisId="left" stroke="#4a5568" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4a5568" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="globalAcc"
                    stroke="#00f2fe"
                    fill="#00f2fe"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="localAcc"
                    stroke="#8e44ad"
                    fill="#8e44ad"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="anomalies"
                    stroke="#ff6b6b"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CyberCard>

          <CyberCard>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-green-400">
                Security Posture
              </h3>
              <div className="flex items-center gap-2 text-sm text-cyan-300">
                <Shield className="w-4 h-4" />
                Last Audited: 2h ago
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 h-[500px] md:h-80 p-2 sm:p-4">
              <div className="space-y-4 sm:space-y-6">
                <SecurityMetric
                  label="Model Encryption"
                  value={
                    modelMetrics[selectedModel as keyof typeof modelMetrics]
                      .encryption
                  }
                  icon={<Key className="w-4 h-4 text-cyan-400" />}
                  strength={95}
                />
                <SecurityMetric
                  label="Data Anonymization"
                  value="98.7%"
                  icon={<Database className="w-4 h-4 text-cyan-400" />}
                  strength={98}
                />
                <SecurityMetric
                  label="Access Requests"
                  value="12/min"
                  icon={<Activity className="w-4 h-4 text-cyan-400" />}
                  strength={85}
                />
              </div>
              <div className="md:border-l md:border-cyan-500/30 md:pl-6">
                <h4 className="text-lg mb-4 font-semibold text-purple-400">
                  Threat Detection
                </h4>
                <div className="space-y-4 text-purple-400">
                  <AnomalyMetric
                    label="Model Drift"
                    value="2.1%"
                    threshold={5}
                    color="red"
                  />
                  <AnomalyMetric
                    label="Data Skew"
                    value="5.4%"
                    threshold={7}
                    color="yellow"
                  />
                  <AnomalyMetric
                    label="Adversarial Attacks"
                    value="0.3%"
                    threshold={1}
                    color="green"
                  />
                </div>
              </div>
            </div>
          </CyberCard>

          <CyberCard>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-purple-400">
                Data Flow & Node Distribution
              </h3>
              <div className="text-sm text-cyan-300">
                <HeartPulse className="inline w-4 h-4 mr-2" />
                Live Node Updates
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={modelMetrics[
                    selectedModel as keyof typeof modelMetrics
                  ].dataSources.map((source) => ({
                    source,
                    contributions: Math.floor(Math.random() * 40) + 10,
                    throughput: Math.floor(Math.random() * 500) + 100,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="source" stroke="#4a5568" />
                  <YAxis yAxisId="left" stroke="#4a5568" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4a5568" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid #00f2fe",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="contributions"
                    fill="#00f2fe"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="throughput"
                    stroke="#8e44ad"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CyberCard>

          <CyberCard className="border-purple-500/20">
            <div className="flex flex-col h-[500px] sm:h-80">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-cyan-400">
                  Security Events
                </h3>
                <Button
                  variant="ghost"
                  className="text-purple-400 border border-purple-500/30 hover:bg-purple-500/10"
                >
                  View All Logs
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4">
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg bg-black/50 border border-cyan-500/20"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                event.status === "Verified"
                                  ? "bg-green-500"
                                  : event.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="text-sm font-medium text-cyan-300">
                              {event.type}
                            </span>
                          </div>
                          <span className="text-xs text-purple-300">
                            {event.timestamp}
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            event.status === "Verified"
                              ? "text-green-400"
                              : event.status === "Pending"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Aggregation Control */}
        <CyberCard className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-cyan-400">
                Federated Aggregation
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>12 Nodes Ready</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>
                    Model Version:{" "}
                    {
                      modelMetrics[selectedModel as keyof typeof modelMetrics]
                        .version
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 hover:border-cyan-500/80 text-cyan-400 gap-2"
                disabled={securityEvents.some((e) => e.status === "Pending")}
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  Initialize Aggregation
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full sm:w-auto text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
              >
                Schedule
              </Button>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
}

const CyberCard = ({
  className,
  children,
  title,
  value,
  delta,
  icon,
  statusIndicator,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "rounded-xl border border-cyan-500/20 bg-black/30 backdrop-blur-lg p-4 sm:p-6 relative",
      "hover:border-cyan-500/40 transition-all duration-300",
      className
    )}
    style={GLOW_STYLES}
  >
    {title ? (
      <>
        <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
          <CardTitle className="text-sm font-medium text-cyan-300">
            {title}
          </CardTitle>
          <div className="text-cyan-400">{icon}</div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-3xl font-bold text-cyan-400 mb-1">{value}</div>
          {delta && <div className="text-xs text-cyan-400/80">{delta}</div>}
          {statusIndicator}
        </CardContent>
      </>
    ) : (
      children
    )}
  </motion.div>
);

const SecurityMetric = ({ label, value, icon, strength }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs sm:text-sm text-cyan-200">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-green-300">{value}</span>
      <div
        className="radial-progress text-cyan-500"
        style={
          {
            "--value": strength,
            "--size": "1.5rem",
            "--thickness": "2px",
          } as React.CSSProperties
        }
      >
        <span className="text-xs text-cyan-200">{strength}%</span>
      </div>
    </div>
  </div>
);

const AnomalyMetric = ({ label, value, threshold, color }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-sm">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium text-${color}-400`}>{value}</span>
      <div className={`relative w-16 h-2 bg-${color}-500/20 rounded-full`}>
        <div
          className={`absolute left-0 top-0 h-full bg-${color}-500 rounded-full`}
          style={{ width: `${(parseFloat(value) / threshold) * 100}%` }}
        />
      </div>
    </div>
  </div>
);
