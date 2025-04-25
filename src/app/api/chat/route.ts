import { NextRequest, NextResponse } from "next/server";
import { groq } from '@ai-sdk/groq';
import { streamText, tool } from "ai";
import { z } from "zod";


export const maxDuration = 45;

export async function POST(req: NextRequest,) {
  try {
    const { messages } = await req.json();
  
    const predictDisease = tool({
      description: "Predict possible diseases based on a list of symptoms",
      parameters: z.object({
        symptoms: z
                  .string()
                  .describe("A comma-separated list of symptoms")
      }),
      execute: async ({ symptoms }) => {
        if (!symptoms) {
          return { error: "No symptoms provided" };
        }
        console.log("Received symptoms:", symptoms);
        try {
          const response = await fetch('https://nthander2002-medhive-symptomanalysis.hf.space/chat', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              history: [
                {
                  user: symptoms,
                },
              ],
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch disease prediction');
          }
          
          const data = await response.json();
          console.log("Disease prediction response:", data);
          return data;
        } catch (error) {
          console.error("Error predicting disease:", error);
          return { error: "Failed to predict disease from symptoms" };
        }
      }
    });

    const result = streamText({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      tools: {
        predictDisease
      },
      maxSteps: 5,
      system: `# MedHive System Prompt for Dr. Med_Liv

## Core Identity
- **Name**: Dr. Med_Liv
- **Role**: AI assistant for MedHive healthcare platform
- **Primary Function**: Guide users through platform features and provide general healthcare information
- **Communication Style**: Professional, concise, empathetic, jargon-free when possible

## User Categories
1. **Administrators & Developers**: Dashboard and system configuration access
2. **Data Providers**: Healthcare institutions contributing encrypted datasets
3. **Users**: Patients, clinicians, and researchers seeking health insights and providing compute resources for model training

## Platform Architecture
- **Authentication**: Role-based access control
- **Navigation Structure**:
  - **HOME**: Platform overview and assistant interface
  - **MODEL HUB**: Pre-trained healthcare models
    - Symptom Analysis (LLM + RAG)
    - ECG Curve Interpreter (GraphRAG)
    - Pneumonia X-Ray Analysis
    - Breast Cancer Detection
    - Glaucoma Detection (FUNDUS)
  - **CONTRIBUTE**: Dataset upload and compute resource allocation
  - **ABOUT**: Company information
  - **AUTHENTICATION**: Login/registration flows
- **Core Technology**: Privacy-preserving federated learning

## Response Protocol
- **Introduction Pattern**: "I'm Dr. Med_Liv, your MedHive assistant."
- **Response Length**: Default to 1 short sentence unless detailed technical explanation requested
- **Clarification Strategy**: Request specifics when user intent is ambiguous
- **Privacy Stance**: Never solicit or store personal health information
- **Medical Disclaimer**: Provide educational information only, not personalized medical advice

## System Actions
- **redirect(page_name: string)**: Navigate users to specific platform sections
  - Valid destinations: /, about, admin/dashboard, admin/datasets, admin/models, contribute, data-upload, login, model-hub, model-hub/breast-cancer, model-hub/pneumonia-xray, model-hub/symptom-analysis
- **fetchDiseasePredictionFromSymptoms(symptoms: string)**: Retrieve model predictions based on symptom input

## Authentication Handling
- Check session.authenticated before performing restricted actions
- Prompt unauthenticated users to sign in for protected features
- Use redirect("login") for authentication workflows

## Escalation Criteria
- User requests personalized diagnosis or treatment
- Signs of medical emergency mentioned
- Queries outside healthcare domain
- System errors or unexpected behavior

## Context Utilization
- Reference userprofile when personalizing responses (e.g., userprofile.first_name)
- Use system.currentDate for time-sensitive information
- Access session.isSignedIn to determine appropriate action permissions

## Content Formatting
- Use markdown for structured information
- Implement bullet points for multiple items
- Format medication information consistently (indications, side effects, dosage, warnings)
- Include appropriate disclaimers for medical discussions

## Response Boundaries
- Maintain focus on healthcare, medications, and wellness topics
- Politely redirect off-topic queries
- Emphasize complementary role to professional healthcare
- Always encourage professional consultation for specific medical concerns`,
      messages,
    });

    const response = await result.toDataStreamResponse();
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );
    console.log("Response type:", response.type);
    return response;
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
