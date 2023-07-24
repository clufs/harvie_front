import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface MonthlySaleData {
  profits: number;
  total: number;
}

interface MonthlySalesResponse {
  [date: string]: MonthlySaleData;
}

export const MonthlySalesPage = () => {
  const token = localStorage.getItem("token");

  const [datishaa, setDatishaa] = useState<MonthlySalesResponse | null>(null);

  const getDailySales = async () => {
    try {
      const { data } = await axios.get<MonthlySalesResponse>(
        // "https://backend-harvey-production.up.railway.app/api/sales/",
        "http://localhost:3000/api/sales/get-sales-details-of-month", //Esto es la version testing.
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDatishaa(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDailySales();
  }, []);

  // Función para generar los datos necesarios para el gráfico
  const generateChartData = (data: MonthlySalesResponse) => {
    const labels = Object.keys(data);
    const profits = Object.values(data).map((item) => item.profits);
    const total = Object.values(data).map((item) => item.total);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Total",
          data: total,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Ganancias",
          data: profits,
          borderColor: "rgb(0, 128, 0)",
          backgroundColor: "rgba(0, 128, 20, 0.5)",
        },
      ],
    };

    return chartData;
  };

  const options = {
    // responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gráfico de Ventas Mensuales",
      },
    },
  };

  return (
    <>
      {datishaa ? (
        <Line data={generateChartData(datishaa)} options={options} />
      ) : (
        <p>Cargando manito...</p>
      )}
    </>
  );
};
