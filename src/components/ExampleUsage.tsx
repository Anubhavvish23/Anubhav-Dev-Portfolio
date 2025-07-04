import React from 'react';
import { useMagicMode } from '../contexts/MagicModeContext';
import ChaosText from './ChaosText';
import ChaosCard from './ChaosCard';
import ChaosProgress from './ChaosProgress';

const ExampleUsage: React.FC = () => {
  const { magicMode } = useMagicMode();

  return (
    <div className="p-8 space-y-8">
      {/* Example 1: Text Elements with ChaosText */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Text Animations</h2>
        
        <ChaosText 
          magicMode={magicMode} 
          element="h1" 
          className="text-4xl font-bold mb-4"
          animationType="text"
        >
          This Heading Will Float and Rotate
        </ChaosText>
        
        <ChaosText 
          magicMode={magicMode} 
          element="p" 
          className="text-lg text-gray-600 mb-4"
          animationType="text"
        >
          This paragraph will wander around smoothly when Magic Mode is active.
        </ChaosText>
      </section>

      {/* Example 2: Cards with ChaosCard */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Card Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChaosCard 
            magicMode={magicMode} 
            className="p-6 bg-white rounded-lg shadow-lg border"
            animationType="card"
          >
            <h3 className="text-xl font-semibold mb-2">Project Card 1</h3>
            <p className="text-gray-600">
              This card will tilt, spin, and wobble in Magic Mode.
            </p>
          </ChaosCard>
          
          <ChaosCard 
            magicMode={magicMode} 
            className="p-6 bg-white rounded-lg shadow-lg border"
            animationType="card"
          >
            <h3 className="text-xl font-semibold mb-2">Project Card 2</h3>
            <p className="text-gray-600">
              Each card animates independently with different timing.
            </p>
          </ChaosCard>
        </div>
      </section>

      {/* Example 3: Progress Bars with ChaosProgress */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Progress Bar Animations</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">React Skills</label>
            <ChaosProgress 
              magicMode={magicMode} 
              className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
              animationType="progress"
            >
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
            </ChaosProgress>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">TypeScript Skills</label>
            <ChaosProgress 
              magicMode={magicMode} 
              className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
              animationType="progress"
            >
              <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
            </ChaosProgress>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Node.js Skills</label>
            <ChaosProgress 
              magicMode={magicMode} 
              className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
              animationType="progress"
            >
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
            </ChaosProgress>
          </div>
        </div>
      </section>

      {/* Example 4: Mixed Elements */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Mixed Element Animations</h2>
        
        <ChaosCard 
          magicMode={magicMode} 
          className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl"
          animationType="card"
        >
          <ChaosText 
            magicMode={magicMode} 
            element="h3" 
            className="text-2xl font-bold mb-4 text-purple-800"
            animationType="text"
          >
            Nested Animated Elements
          </ChaosText>
          
          <ChaosText 
            magicMode={magicMode} 
            element="p" 
            className="text-purple-600 mb-4"
            animationType="text"
          >
            This card contains text elements that animate independently.
          </ChaosText>
          
          <ChaosProgress 
            magicMode={magicMode} 
            className="w-full h-3 bg-white rounded-full overflow-hidden"
            animationType="progress"
          >
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
          </ChaosProgress>
        </ChaosCard>
      </section>

      {/* Example 5: Custom Animation Types */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Animation Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ChaosText 
            magicMode={magicMode} 
            element="div" 
            className="p-4 bg-blue-100 rounded-lg text-center"
            animationType="text"
          >
            Text Animation
          </ChaosText>
          
          <ChaosText 
            magicMode={magicMode} 
            element="div" 
            className="p-4 bg-green-100 rounded-lg text-center"
            animationType="card"
          >
            Card Animation
          </ChaosText>
          
          <ChaosText 
            magicMode={magicMode} 
            element="div" 
            className="p-4 bg-purple-100 rounded-lg text-center"
            animationType="progress"
          >
            Progress Animation
          </ChaosText>
        </div>
      </section>
    </div>
  );
};

export default ExampleUsage; 