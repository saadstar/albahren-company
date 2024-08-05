import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react'

export const CustomToolbar = ({ rows }) => {
    const handleExport = () => {
        const csvRows = [];
        const headers = Object.keys(rows[0] || {}).join(",");
        csvRows.push(headers);

        rows.forEach(row => {
            const values = Object.values(row).join(",");
            csvRows.push(values);
        })

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data-grid-export.csv');
        link.click();
        document.body.removeChild(link);
    };

  return (
      <GridToolbarContainer>
          <Button
              color='primary'
              variant='contained'
              onClick={handleExport}
          >
              Domnload
          </Button>
    </GridToolbarContainer>
  )
}
