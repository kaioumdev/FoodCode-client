/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/order-stats");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2
      },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
      }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Welcome Message */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl text-center">
        <div className="stat bg-white shadow-md p-4 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl mx-auto text-green-600" />
          </div>
          <div className="stat-title text-lg font-semibold">Revenue</div>
          <div className="stat-value text-xl">${stats?.revenue}</div>
          <div className="stat-desc text-gray-500">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-white shadow-md p-4 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl mx-auto text-blue-500" />
          </div>
          <div className="stat-title text-lg font-semibold">Users</div>
          <div className="stat-value text-xl">{stats?.users}</div>
          <div className="stat-desc text-gray-500">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-white shadow-md p-4 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl mx-auto text-orange-500" />
          </div>
          <div className="stat-title text-lg font-semibold">Menu Items</div>
          <div className="stat-value text-xl">{stats?.menuItems}</div>
          <div className="stat-desc text-gray-500">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-white shadow-md p-4 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl mx-auto text-purple-500" />
          </div>
          <div className="stat-title text-lg font-semibold">Orders</div>
          <div className="stat-value text-xl">{stats?.orders}</div>
          <div className="stat-desc text-gray-500">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mt-8">
        {/* Bar Chart */}
        <div className="w-full md:w-1/2">
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="mx-auto"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-1/2">
          <PieChart width={400} height={400} className="mx-auto">
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
