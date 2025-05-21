import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Typography,
  Button
} from '@mui/material';
import '../styles/HoldingsTable.css';

const HoldingsTable = ({ holdings, onSelectionChange, selectedHoldings }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedHoldings = showAll ? holdings : holdings.slice(0, 10);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    onSelectionChange(checked ? holdings.map(h => h.coin) : []);
  };

  const handleSelectHolding = (coin) => {
    const newSelected = selectedHoldings.includes(coin)
      ? selectedHoldings.filter(id => id !== coin)
      : [...selectedHoldings, coin];
    onSelectionChange(newSelected);
    setSelectAll(newSelected.length === holdings.length);
  };

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <Box className="holdings-table-container">
      <Typography variant="h6" className="holdings-title">
        Holdings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  indeterminate={selectedHoldings.length > 0 && selectedHoldings.length < holdings.length}
                />
              </TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Holdings<br/>Avg Buy Price</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Short-Term<br/>Gain/Loss</TableCell>
              <TableCell>Long-Term<br/>Gain/Loss</TableCell>
              <TableCell>Amount to Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedHoldings.map((holding) => (
              <TableRow
                key={holding.coin}
                selected={selectedHoldings.includes(holding.coin)}
                onClick={() => handleSelectHolding(holding.coin)}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedHoldings.includes(holding.coin)}
                  />
                </TableCell>
                <TableCell>
                  <Box className="asset-cell">
                    <img src={holding.logo} alt={holding.coin} className="coin-logo" />
                    <Box>
                      <Typography variant="body1">{holding.coin}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {holding.coinName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{holding.totalHolding.toFixed(2)}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${holding.averageBuyPrice.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>{formatCurrency(holding.currentPrice)}</TableCell>
                <TableCell>
                  <Typography className={holding.stcg.gain >= 0 ? 'gain' : 'loss'}>
                    {formatCurrency(holding.stcg.gain)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {holding.stcg.balance.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className={holding.ltcg.gain >= 0 ? 'gain' : 'loss'}>
                    {formatCurrency(holding.ltcg.gain)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {holding.ltcg.balance.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {selectedHoldings.includes(holding.coin) ? holding.totalHolding.toFixed(2) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {holdings.length > 10 && (
        <Box className="view-all-container">
          <Button
            variant="text"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HoldingsTable; 