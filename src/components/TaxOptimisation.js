import React, { useState, useEffect } from 'react';
import { fetchHoldings, fetchCapitalGains } from '../services/api';
import CapitalGainsCard from './CapitalGainsCard';
import HoldingsTable from './HoldingsTable';
import '../styles/TaxOptimisation.css';

const howItWorksText = `
1. See your capital gains for the year in the left card.\n2. Check boxes for assets you plan on selling to reduce your tax liability.\n3. Instantly see your updated tax liability in the right card.\nPro tip: Experiment with different combinations of your holdings to optimize your tax liability!`;

const disclaimerText = [
  {
    title: 'Price Source Disclaimer',
    text: 'Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.'
  },
  {
    title: 'Country-specific Availability',
    text: 'Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.'
  },
  {
    title: 'Utilization of Losses',
    text: 'Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.'
  }
];

const TaxOptimisation = () => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [afterHarvestingGains, setAfterHarvestingGains] = useState(null);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [holdingsData, gainsData] = await Promise.all([
        fetchHoldings(),
        fetchCapitalGains()
      ]);
      setHoldings(holdingsData);
      setCapitalGains(gainsData.capitalGains);
      setAfterHarvestingGains(gainsData.capitalGains);
    };
    loadData();
  }, []);

  const handleHoldingSelection = (selectedIds) => {
    setSelectedHoldings(selectedIds);
    updateAfterHarvestingGains(selectedIds);
  };

  const updateAfterHarvestingGains = (selectedIds) => {
    const selectedAssets = holdings.filter(holding => selectedIds.includes(holding.coin));
    const updatedGains = {
      stcg: { ...capitalGains.stcg },
      ltcg: { ...capitalGains.ltcg }
    };
    selectedAssets.forEach(asset => {
      if (asset.stcg.gain > 0) {
        updatedGains.stcg.profits += asset.stcg.gain;
      } else {
        updatedGains.stcg.losses += Math.abs(asset.stcg.gain);
      }
      if (asset.ltcg.gain > 0) {
        updatedGains.ltcg.profits += asset.ltcg.gain;
      } else {
        updatedGains.ltcg.losses += Math.abs(asset.ltcg.gain);
      }
    });
    setAfterHarvestingGains(updatedGains);
  };

  return (
    <div className="tax-optimisation">
      <div className="heading-row">
        <h1 className="title">Tax Optimisation</h1>
        <button className="how-it-works-link" onClick={() => setHowItWorksOpen(true)}>
          How it works?
        </button>
      </div>

      {/* How it works Modal */}
      {howItWorksOpen && (
        <div className="custom-modal-overlay" onClick={() => setHowItWorksOpen(false)}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>How it works</span>
              <button className="close-btn" onClick={() => setHowItWorksOpen(false)}>×</button>
            </div>
            <div className="modal-content">
              {howItWorksText.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Section */}
      <div className="disclaimer-section">
        <div className="disclaimer-header" onClick={() => setDisclaimerOpen(!disclaimerOpen)}>
          <span className="disclaimer-title">Important Notes And Disclaimer</span>
          <span className="disclaimer-toggle">{disclaimerOpen ? '▲' : '▼'}</span>
        </div>
        {disclaimerOpen && (
          <div className="disclaimer-content">
            {disclaimerText.map((item, idx) => (
              <div key={item.title} className="disclaimer-item">
                <div className="disclaimer-item-title">{item.title}</div>
                <div className="disclaimer-item-text">{item.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="gains-cards-container">
        <CapitalGainsCard
          title="Pre Harvesting"
          gains={capitalGains}
          className="pre-harvesting"
        />
        <CapitalGainsCard
          title="After Harvesting"
          gains={afterHarvestingGains}
          className="after-harvesting"
          preHarvestingGains={capitalGains}
        />
      </div>

      <HoldingsTable
        holdings={holdings}
        onSelectionChange={handleHoldingSelection}
        selectedHoldings={selectedHoldings}
      />
    </div>
  );
};

export default TaxOptimisation; 