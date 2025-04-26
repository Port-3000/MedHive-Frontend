// src/app/user-profile/page.tsx
//@ts-nocheck

"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { SessionContext } from "@/utils/supabase/usercontext";
import { UserProfile as UserProfileType } from "@/utils/db_types";

import {
  User,
  Key,
  Clock,
  Phone,
  Building,
  CreditCard,
  Shield,
  QrCode,
  Edit,
  Cpu,
  Database,
} from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { CyberCard } from "@/components/cyber-card";

const COLORS = ["#00f2fe", "#4facfe", "#8e44ad", "#ff6b6b", "#1dd1a1"];

// Hardcoded credits data
const CREDITS_DATA = {
  credits: 1425,
  total_credits: 2000,
};

// Hardcoded model usage data
const MODEL_USAGE_DATA = [
  { model: "LLM Symptom", uses: 45 },
  { model: "ECG Analysis", uses: 32 },
  { model: "X-Ray Detection", uses: 28 },
  { model: "Cancer Screening", uses: 19 },
];

interface ModelUsage {
  model: string;
  uses: number;
}

interface ExtendedUserProfile extends UserProfileType {
  uuid: string;
  security_status: string;
  credits: number;
  total_credits: number;
  model_usage: ModelUsage[];
}

export default function UserProfile() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [userData, setUserData] = useState<ExtendedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { sessionData } = useContext(SessionContext);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserData() {
      if (!sessionData.session?.user) return;

      try {
        // Fetch user profile data
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", sessionData.session.user.id)
          .single();

        if (profileError) throw profileError;

        // Combine profile data with hardcoded data
        setUserData({
          ...profile,
          ...CREDITS_DATA,
          model_usage: MODEL_USAGE_DATA,
          uuid: sessionData.session.user.id,
          security_status: profile.role === "admin" ? "verified" : "standard",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [sessionData.session, supabase]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 font-mono flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  const creditPercentage = (userData.credits / userData.total_credits) * 100;
  const usageData = userData.model_usage;

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 font-mono space-y-8">
      <CyberCard className="border-cyan-500/30">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1 shadow-[0_0_25px_-5px_rgba(0,242,254,0.5)]">
              <div className="bg-black rounded-full p-2">
                <User className="w-full h-full text-cyan-400" />
              </div>
              <Button
                variant="ghost"
                className="absolute -bottom-2 right-0 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full p-2 shadow-glow-sm"
              >
                <Edit className="w-4 h-4 text-cyan-400" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {userData.full_name}
            </motion.h1>
            <p className="text-purple-400 text-lg font-semibold">
              {userData.role}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="font-mono">{userData.uuid}</span>
            </div>
          </div>

          <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Shield className="w-4 h-4 mr-2" />
            {userData.security_status.toUpperCase()}
          </Badge>
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identity Section */}
        <CyberCard className="border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">
              <Database className="inline-block w-5 h-5 mr-2" />
              DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow
              icon={<User />}
              label="User ID"
              value={userData.id || "N/A"}
            />
            <InfoRow
              icon={<Clock />}
              label="Member Since"
              value={
                userData.created_at
                  ? new Date(userData.created_at).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoRow
              icon={<Phone />}
              label="Contact"
              value={userData.phone || "N/A"}
            />
            <InfoRow
              icon={<Building />}
              label="Organization"
              value={userData.organization || "N/A"}
            />
          </CardContent>
        </CyberCard>
        {/* Credits Section */}
        <CyberCard className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">
              <CreditCard className="inline-block w-5 h-5 mr-2" />
              NEURO CREDITS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-cyan-400">
                  <AnimatedNumber value={userData.credits} />
                </div>
                <div className="text-sm text-purple-400">
                  of {userData.total_credits} total credits
                </div>
              </div>
              <div className="relative">
                <CreditCard className="w-12 h-12 text-purple-400" />
                <div className="absolute inset-0 bg-purple-500/10 blur-md" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-cyan-300">
                <span>Credit Utilization</span>
                <span>{creditPercentage.toFixed(1)}%</span>
              </div>
              <div className="relative h-2 rounded-full bg-black/50 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${creditPercentage}%` }}
                  transition={{ duration: 1 }}
                  style={{ boxShadow: "0 0 15px rgba(0, 242, 254, 0.3)" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-cyan-500/20">
              <QrCode className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-gray-400 text-sm">
                Institutional verification QR code
              </span>
            </div>
          </CardContent>
        </CyberCard>
        {/* Model Usage Section */}
        <CyberCard className="border-green-500/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-green-400">
              <Cpu className="inline-block w-5 h-5 mr-2" />
              MODEL USAGE ANALYTICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96">
              {/* Bar Chart */}
              <div className="relative group">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    onMouseMove={(e) => {
                      if (e.activeTooltipIndex !== undefined) {
                        setHoveredBar(e.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <defs>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00f2fe"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0066ff"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis
                      dataKey="model"
                      stroke="#4a5568"
                      tick={{ fill: "#00f2fe", fontSize: 12 }}
                      tickLine={{ stroke: "#4a5568" }}
                    />
                    <YAxis
                      stroke="#4a5568"
                      tick={{ fill: "#00f2fe", fontSize: 12 }}
                      tickLine={{ stroke: "#4a5568" }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(0, 242, 254, 0.1)" }}
                    />
                    <Bar
                      dataKey="uses"
                      fill="url(#barGradient)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={800}
                    >
                      {usageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke="#00f2fe"
                          strokeWidth={hoveredBar === index ? 2 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
              </div>

              {/* Pie Chart */}
              <div className="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="uses"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {usageData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#0f172a"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={<PieTooltip />}
                      cursor={{ fill: "rgba(0, 242, 254, 0.1)" }}
                    />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={(value) => (
                        <span className="text-cyan-300 text-sm">{value}</span>
                      )}
                      iconSize={12}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </CyberCard>
      </div>
    </div>
  );
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | null | undefined;
}) => (
  <motion.div
    className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
    whileHover={{ scale: 1.02 }}
  >
    <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm text-cyan-400 font-semibold">{label}</div>
      <div className="text-gray-300 font-mono">{value || "N/A"}</div>
    </div>
  </motion.div>
);

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-black/90 p-3 rounded-lg border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
      <p className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-2 mb-2">
        {payload[0].payload.model}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-cyan-500" />
        <span className="text-purple-300 font-mono">
          {payload[0].value} uses
        </span>
      </div>
    </div>
  );
};

const PieTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-black/90 p-3 rounded-lg border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
      <p className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-2 mb-2">
        {payload[0].name}
      </p>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: payload[0].color }}
        />
        <span className="text-purple-300 font-mono">
          {payload[0].value} uses (
          {(payload[0].payload.percent * 100).toFixed(1)}%)
        </span>
      </div>
    </div>
  );
};
