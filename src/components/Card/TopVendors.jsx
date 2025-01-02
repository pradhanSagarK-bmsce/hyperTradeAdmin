import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const TopVendors = () => {
  const vendors = useSelector((state) => state.vendorsData.vendors);
  const themeMode = useSelector((state) => state.theme.mode);
  const [rankedVendors, setRankedVendors] = useState([]);

  // Weighting for each factor (adjust as necessary)
  const weights = {
    totalRevenue: 0.3,
    totalProfits: 0.2,
    noOfOrders: 0.2,
    noDeliverSuccess: 0.2,
    avgRating: 0.1,
  };

  // Normalize a value between 0 and 1 based on the maximum value in the dataset
  const normalize = (value, maxValue) => {
    return maxValue > 0 ? value / maxValue : 0;
  };

  // Calculate the ranking score for each vendor
  const calculateVendorScore = (vendor, maxValues) => {
    return (
      weights.totalRevenue * normalize(vendor.totalRevenue, maxValues.totalRevenue) +
      weights.totalProfits * normalize(vendor.totalProfits, maxValues.totalProfits) +
      weights.noOfOrders * normalize(vendor.noOfOrders, maxValues.noOfOrders) +
      weights.noDeliverSuccess * normalize(vendor.noDeliverSuccess, maxValues.noDeliverSuccess) +
      weights.avgRating * normalize(vendor.avgRating, 5) // Assuming 5 is the max rating
    );
  };

  useEffect(() => {
    if (!vendors.length) return;

    // Find maximum values for normalization
    const maxValues = {
      totalRevenue: Math.max(...vendors.map((v) => v.totalRevenue)),
      totalProfits: Math.max(...vendors.map((v) => v.totalProfits)),
      noOfOrders: Math.max(...vendors.map((v) => v.noOfOrders)),
      noDeliverSuccess: Math.max(...vendors.map((v) => v.noDeliverSuccess)),
    };

    // Calculate score for each vendor and sort them by score
    const scoredVendors = vendors.map((vendor) => ({
      ...vendor,
      score: calculateVendorScore(vendor, maxValues),
    }));

    const sortedVendors = scoredVendors.sort((a, b) => b.score - a.score);

    // Get the top 3 vendors and others
    const topVendors = sortedVendors.slice(0, 3);
    const others = sortedVendors.slice(3);

    const othersValue = others.reduce((sum, item) => sum + item.score, 0);
    if (othersValue > 0) {
      topVendors.push({ name: "Others", score: othersValue });
    }

    setRankedVendors(topVendors);
  }, [vendors]);

  const COLORS = themeMode === "theme-mode-dark"
    ? ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
    : ["#6ab04c", "#2980b9", "#FFBB28", "#FF8042"];

  // Total score of all vendors to calculate percentage
  const totalScore = rankedVendors.reduce((sum, vendor) => sum + vendor.score, 0);

  return (
    <div className={`w-full h-full p-4 flex flex-col shadow-lg ${themeMode === "theme-mode-dark" ? "text-txt-white" : "text-gray-800"}`}>
      <h3 className="text-center text-2xl font-semibold mb-4">Top Vendors</h3>
      {(!vendors.length) ? (
        <div className="w-full h-full mb-8 flex justify-center items-center"><p className="text-xl font-bold">No Vendors Available</p></div>
      ) : (
        <>
          {/* Container for the chart */}
          <div className="rounded-xl h-[60%]">
            <ResponsiveContainer width="100%" height="100%" style={{ border: 'none', margin: 0, padding: 0 }}>
              <PieChart style={{ border: 'none', margin: 0, padding: 0 }}>
                <Pie
                  data={rankedVendors}
                  dataKey="score"
                  nameKey="name"
                  cx="50%"  // Adjusting cx and cy to fit within a smaller container
                  cy="80%"  // This ensures the center of the pie chart is aligned
                  startAngle={180}
                  endAngle={0}
                  innerRadius={120}  // Reduced the inner radius to fit more in the container
                  outerRadius={150}  // Adjusted the outer radius for smaller chart
                  paddingAngle={3} // Gap between arches
                  cornerRadius={7} // Rounded edges
                  labelLine={false} // Disable label line
                >
                  {rankedVendors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={themeMode === "theme-mode-dark" ? "fff" : "#fff"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Labels Section */}
          <div className="mt-3 space-y-2 overflow-hidden">
            {rankedVendors.map((entry, index) => {
              // Calculate percentage only if totalScore is greater than zero
              const percentage = totalScore > 0 ? ((entry.score / totalScore) * 100).toFixed(2) : 0;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    {
                      (entry.name && entry.name === "Others") ? 
                      (
                        <span className="text-[0.85rem] font-semibold">{entry.name}</span>
                      ) 
                      :
                      (
                        <span className="text-[0.85rem] font-semibold">{entry.vendorName}</span>
                      )
                    }
                  </div>
                  <div className="text-[0.85rem]">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TopVendors;
