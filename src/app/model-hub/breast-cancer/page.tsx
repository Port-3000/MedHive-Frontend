"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormValues = {
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
  radius_se: number;
  texture_se: number;
  perimeter_se: number;
  area_se: number;
  smoothness_se: number;
  compactness_se: number;
  concavity_se: number;
  concave_points_se: number;
  symmetry_se: number;
  fractal_dimension_se: number;
  radius_worst: number;
  texture_worst: number;
  perimeter_worst: number;
  area_worst: number;
  smoothness_worst: number;
  compactness_worst: number;
  concavity_worst: number;
  concave_points_worst: number;
  symmetry_worst: number;
};

export default function BreastCancerPredictionPage() {
  const [prediction, setPrediction] = useState<{
    prediction: number;
    diagnosis: string;
    probability: number;
    timestamp: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      radius_mean: 0,
      texture_mean: 0,
      perimeter_mean: 0,
      area_mean: 0,
      smoothness_mean: 0,
      compactness_mean: 0,
      concavity_mean: 0,
      concave_points_mean: 0,
      symmetry_mean: 0,
      fractal_dimension_mean: 0,
      radius_se: 0,
      texture_se: 0,
      perimeter_se: 0,
      area_se: 0,
      smoothness_se: 0,
      compactness_se: 0,
      concavity_se: 0,
      concave_points_se: 0,
      symmetry_se: 0,
      fractal_dimension_se: 0,
      radius_worst: 0,
      texture_worst: 0,
      perimeter_worst: 0,
      area_worst: 0,
      smoothness_worst: 0,
      compactness_worst: 0,
      concavity_worst: 0,
      concave_points_worst: 0,
      symmetry_worst: 0,
    }
  });

  async function onSubmit(values: FormValues) {
    try {
      setError(null);
      const response = await fetch("/api/v1/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || "Prediction failed");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="bg-black/50 border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Breast Cancer Prediction</CardTitle>
          <CardDescription className="text-gray-400">
            Enter the tumor characteristics to get a prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mean Values */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Mean Values</h3>
                  {Object.entries(form.getValues())
                    .filter(([key]) => key.endsWith("_mean"))
                    .map(([key]) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">
                              {key.replace(/_/g, " ").replace("mean", "").trim()}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.0001"
                                className="bg-zinc-900 border-cyan-400/30 text-white"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                </div>

                {/* Standard Error Values */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Standard Error Values</h3>
                  {Object.entries(form.getValues())
                    .filter(([key]) => key.endsWith("_se"))
                    .map(([key]) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">
                              {key.replace(/_/g, " ").replace("se", "").trim()}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.0001"
                                className="bg-zinc-900 border-cyan-400/30 text-white"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                </div>

                {/* Worst Values */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Worst Values</h3>
                  {Object.entries(form.getValues())
                    .filter(([key]) => key.endsWith("_worst"))
                    .map(([key]) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">
                              {key.replace(/_/g, " ").replace("worst", "").trim()}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.0001"
                                className="bg-zinc-900 border-cyan-400/30 text-white"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={form.formState.isSubmitting}
              >
                Get Prediction
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {prediction && (
            <Alert className="mt-6 bg-cyan-500/20 border-cyan-400/30">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <AlertTitle className="text-cyan-400">Prediction Result</AlertTitle>
              <AlertDescription className="text-gray-200">
                <div className="mt-2">
                  <p>Diagnosis: {prediction.diagnosis}</p>
                  <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
                  <p>Timestamp: {new Date(prediction.timestamp).toLocaleString()}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}