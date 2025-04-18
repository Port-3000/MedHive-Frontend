'use client';

import { useState } from "react";
import { Circle } from "lucide-react";
import { toast } from "sonner";
import { BlurContainer } from "@/components/ui/BlurContainer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

type Model = {
  id: string;
  name: string;
  status: "trained" | "training";
  accuracy?: number;
  f1_score?: number;
  precision_score?: number;
  recall_score?: number;
  lastTrained?: string;
};

export default function Models() {
  const [models, setModels] = useState<Model[]>(() => ([
    {
      id: "1",
      name: "Breast Cancer Detection",
      status: "trained" as const,
      accuracy: 0.95,
      f1_score: 0.94,
      precision_score: 0.93,
      recall_score: 0.96,
      lastTrained: "4/19/2025, 2:30:00 PM"
    },
    {
      id: "2",
      name: "Pneumonia X-Ray Detection",
      status: "trained" as const,
      accuracy: 0.92,
      f1_score: 0.91,
      precision_score: 0.90,
      recall_score: 0.93,
      lastTrained: "4/16/2025, 3:20:00 PM"
    },
    {
      id: "3",
      name: "ECG Curve Analysis",
      status: "trained" as const,
      accuracy: 0.89,
      f1_score: 0.88,
      precision_score: 0.87,
      recall_score: 0.90,
      lastTrained: "4/18/2025, 11:45:00 AM"
    },
    {
      id: "4",
      name: "LLM Symptoms Analysis",
      status: "trained" as const,
      accuracy: 0.93,
      f1_score: 0.93,
      precision_score: 0.95,
      recall_score: 0.92,
      lastTrained: "4/17/2025, 9:15:00 AM"
    },
    {
      id: "5",
      name: "Glaucoma Fundus Analysis",
      status: "trained" as const,
      accuracy: 0.91,
      f1_score: 0.90,
      precision_score: 0.92,
      recall_score: 0.89,
      lastTrained: "4/16/2025, 3:20:00 PM"
    },
    {
      id: "6",
      name: "Health Outcome Predictor",
      status: "trained" as const,
      accuracy: 0.86,
      f1_score: 0.85,
      precision_score: 0.87,
      recall_score: 0.84,
      lastTrained: "4/16/2025, 3:20:00 PM"
    }
  ]));

  const handleApprove = (modelName: string) => {
    toast.success("Model Approved", {
      description: `${modelName} has been approved.`,
      duration: 3000,
    });
  };

  const handleRetrain = (modelId: string, modelName: string) => {
    setModels(prevModels => {
      const newModels = prevModels.map(model =>
        model.id === modelId 
          ? { ...model, status: "training" as const } 
          : model
      ).sort((a, b) => (a.status === 'training' ? -1 : b.status === 'training' ? 1 : 0));
      return newModels;
    });

    toast.loading(`Retraining ${modelName}...`,{duration:3000});

    setTimeout(() => {
      setModels(prevModels => {
        const currentDateTime = new Date().toLocaleString();
        const newModels = prevModels.map(model =>
          model.id === modelId 
            ? { ...model, status: "trained" as const, lastTrained: currentDateTime } 
            : model
        );
        // Keep training models at the top
        return newModels.sort((a, b) => (a.status === 'training' ? -1 : b.status === 'training' ? 1 : 0));
      });
      toast.success(`${modelName} has been retrained`, {
        description: "Model training completed successfully.",
        duration: 3000,
      });
    }, 5000);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-white mb-6">ML Models Dashboard</h1>
      <BlurContainer 
        variant="dark" 
        intensity="medium" 
        hoverable 
        className="p-6"
      >
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-cyan-300">Status</TableHead>
                <TableHead className="text-cyan-300">Model Name</TableHead>
                <TableHead className="text-cyan-300">Metrics</TableHead>
                <TableHead className="text-cyan-300">Last Trained</TableHead>
                <TableHead className="text-cyan-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Circle
                        fill="currentColor"
                        className={`h-3 w-3 fill-current ${
                          model.status === "training" 
                          ? "text-emerald-400 animate-pulse" 
                          : "text-gray-600"
                        }`}
                      />
                      <span
                        className={
                          model.status === "training"
                            ? "text-emerald-400"
                            : "text-gray-300"
                        }
                      >
                        {model.status === "training" ? "Training" : "Trained"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{model.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      {model.accuracy && (
                        <p>Accuracy: {model.accuracy.toFixed(3)}</p>
                      )}
                      {model.f1_score && (
                        <p>F1 Score: {model.f1_score.toFixed(3)}</p>
                      )}
                      {model.precision_score && (
                        <p>Precision: {model.precision_score.toFixed(3)}</p>
                      )}
                      {model.recall_score && (
                        <p>Recall: {model.recall_score.toFixed(3)}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {model.lastTrained || "Not trained yet"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleApprove(model.name)}
                        disabled={model.status === "training"}
                        className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRetrain(model.id, model.name)}
                        disabled={model.status === "training"}
                        className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                      >
                        Retrain
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </BlurContainer>
    </div>
  );
}