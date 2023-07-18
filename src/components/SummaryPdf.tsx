import { Typography } from "@mui/material";
import { Document, Page } from "@react-pdf/renderer";
import { useAppSelector } from "../provider/hooks";
import { Pie } from "react-chartjs-2";
import { MonthlySummary } from "../provider/slices/summary";
import { stylesPDF } from "../App";

export const PDFSummary = ({ summary }: { summary: MonthlySummary }) => {
  const chartData = {
    labels: summary.sales.map((sale) => sale.name),
    datasets: [
      {
        data: summary.sales.map((sale) => sale.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  return (
    <>
      <Document>
        <Page style={stylesPDF.page}>
          <Typography variant="h1">Resumen del mes.</Typography>
          <Pie data={chartData} />
        </Page>
      </Document>
    </>
  );
};
