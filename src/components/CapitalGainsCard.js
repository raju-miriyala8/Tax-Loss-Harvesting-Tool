import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import '../styles/CapitalGainsCard.css';

const CapitalGainsCard = ({ title, gains, className, preHarvestingGains }) => {
  if (!gains) return null;

  const calculateNetGains = (type) => {
    return gains[type].profits - gains[type].losses;
  };

  const totalRealizedGains = calculateNetGains('stcg') + calculateNetGains('ltcg');
  const showSavings = preHarvestingGains && (
    calculateNetGains('stcg') + calculateNetGains('ltcg') <
    (preHarvestingGains.stcg.profits - preHarvestingGains.stcg.losses) +
    (preHarvestingGains.ltcg.profits - preHarvestingGains.ltcg.losses)
  );

  return (
    <Paper className={`capital-gains-card ${className}`}>
      <Typography variant="h6" className="card-title">
        {title}
      </Typography>

      <Box className="gains-section">
        <Box className="gains-row header">
          <Typography></Typography>
          <Typography>Short-term</Typography>
          <Typography>Long-term</Typography>
        </Box>

        <Box className="gains-row">
          <Typography>Profits</Typography>
          <Typography>${gains.stcg.profits.toFixed(2)}</Typography>
          <Typography>${gains.ltcg.profits.toFixed(2)}</Typography>
        </Box>

        <Box className="gains-row">
          <Typography>Losses</Typography>
          <Typography>${gains.stcg.losses.toFixed(2)}</Typography>
          <Typography>${gains.ltcg.losses.toFixed(2)}</Typography>
        </Box>

        <Box className="gains-row">
          <Typography>Net Capital Gains</Typography>
          <Typography>${calculateNetGains('stcg').toFixed(2)}</Typography>
          <Typography>${calculateNetGains('ltcg').toFixed(2)}</Typography>
        </Box>
      </Box>

      <Box className="total-gains">
        <Typography variant="h6">
          {title === 'Pre Harvesting' ? 'Realised' : 'Effective'} Capital Gains:
        </Typography>
        <Typography variant="h6" className="total-amount">
          ${totalRealizedGains.toFixed(2)}
        </Typography>
      </Box>

      {showSavings && (
        <Box className="savings-message">
          <Typography>
            🎉 Your taxable capital gains are reduced by: $
            {(
              ((preHarvestingGains.stcg.profits - preHarvestingGains.stcg.losses) +
                (preHarvestingGains.ltcg.profits - preHarvestingGains.ltcg.losses)) -
              (calculateNetGains('stcg') + calculateNetGains('ltcg'))
            ).toFixed(2)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CapitalGainsCard; 