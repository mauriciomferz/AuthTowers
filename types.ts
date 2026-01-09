import React from 'react';

export enum TowerType {
  OPENFGA = 'OPENFGA',
  OSO = 'OSO',
  GAUTH_GO = 'GAUTH_GO'
}

export interface TowerData {
  id: TowerType;
  title: string;
  label: string;
  description: string;
  architecture: string;
  useCase: string;
  detailedScenario: string;
  performanceMetrics: string[];
  keyDifferentiators: string[];
  colorClass: string;
  accentColor: string;
  icon: React.ReactNode;
  iconDescription: string;
  docsUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}