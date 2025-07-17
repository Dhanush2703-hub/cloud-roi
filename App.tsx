import React, { useState, useEffect } from 'react';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { ROIInputs, ROIResults } from './types';
import { calculateROI } from './utils/calculations';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    annualRevenue: 10000000,
    infraCloudCosts: 500000,
    opsTeamSize: 50,
    opsCostPerFTE: 100000,
    offshorePercentage: 30,
    avgDowntimeHours: 100,
    downtimeCostPerHour: 50000,
    currentDataCenterUtilization: 70,
    annualSoftwareLicenses: 200000,
  });

  const [results, setResults] = useState<ROIResults>({
    infraCostAvoided: 0,
    opsCostSaved: 0,
    downtimeCostAvoided: 0,
    revenueUplift: 0,
    totalAnnualBenefit: 0,
    migrationCost: 0,
    roi: 0,
  });

  const handleInputChange = (key: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const newResults = calculateROI(inputs);
    setResults(newResults);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Cloud ROI Calculator
          </h1>
          <p className="text-gray-400 text-lg">
            Optimize your cloud infrastructure investment with intelligent cost analysis
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Panel - Inputs */}
          <div className="h-[calc(100vh-220px)]">
            <InputPanel inputs={inputs} onInputChange={handleInputChange} />
          </div>

          {/* Right Panel - Outputs */}
          <div className="h-[calc(100vh-220px)]">
            <OutputPanel results={results} inputs={inputs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;