import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Libro A", Leidos: 400 },
  { name: "Libro B", Leidos: 300 },
  { name: "Libro C", Leidos: 200 },
  { name: "Libro D", Leidos: 278 },
  { name: "Libro E", Leidos: 189 },
  { name: "Libro F", Leidos: 239 },
  { name: "Libro G", Leidos: 349 },
];

const MostReadBooksComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Leidos" fill="#dc8524" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MostReadBooksComponent;
