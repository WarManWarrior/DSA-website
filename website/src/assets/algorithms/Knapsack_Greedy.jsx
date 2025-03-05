import React, { useState } from "react";


const KnapsackVisualization = () => {
  const [items, setItems] = useState([
    { id: 1, weight: 2, value: 20 },
    { id: 2, weight: 3, value: 30 },
    { id: 3, weight: 4, value: 40 },
    { id: 4, weight: 5, value: 50 },
  ]);
  const [capacity, setCapacity] = useState(10);
  const [result, setResult] = useState({ selected: [], totalValue: 0, calculations: [] });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, weight: 0, value: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateKnapsack = () => {
    let sortedItems = [...items].sort((a, b) => b.value / b.weight - a.value / a.weight);
    let remainingCapacity = capacity;
    let selectedItems = [];
    let totalValue = 0;
    let calculations = [];

    for (let item of sortedItems) {
      if (item.weight <= remainingCapacity) {
        calculations.push(`Selected full item ${item.id}, weight: ${item.weight}, value: ${item.value}`);
        selectedItems.push({ ...item, fraction: 1 });
        totalValue += item.value;
        remainingCapacity -= item.weight;
      } else {
        const fraction = remainingCapacity / item.weight;
        calculations.push(`Selected fraction ${fraction.toFixed(2)} of item ${item.id}, weight: ${item.weight}, value: ${item.value}`);
        selectedItems.push({ ...item, fraction });
        totalValue += item.value * fraction;
        break;
      }
    }

    calculations.push(`Total value: ${totalValue.toFixed(2)}`);
    setResult({ selected: selectedItems, totalValue, calculations });
  };

  return (
    <div className="p-6 bg-base-200 h-full w-full flex flex-col items-center animate-fadeIn">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Knapsack Visualization (Greedy)</h1>

      <div className="card w-full max-w-4xl bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-white">Input Items</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Weight</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-white">Item {item.id}</td>
                    <td>
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => handleItemChange(index, "weight", parseFloat(e.target.value) || 0)}
                        className="input input-bordered w-full text-white"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => handleItemChange(index, "value", parseFloat(e.target.value) || 0)}
                        className="input input-bordered w-full text-white"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => removeItem(index)}
                        className="btn btn-error btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between">
            <button onClick={addItem} className="btn btn-secondary">
              Add Item
            </button>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text ">Knapsack Capacity:</span>
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div className="mt-4">
            <button onClick={calculateKnapsack} className="btn btn-primary w-full animate-fadeInSlow">
              Calculate
            </button>
          </div>
        </div>
      </div>

      <div className="card w-full max-w-4xl bg-base-100 shadow-xl mb-6 animate-fadeInSlow">
        <div className="card-body">
          <h2 className="card-title text-white">Profit by Weight Chart</h2>
          <div className="flex justify-around items-end h-48">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-primary text-yellow-200 p-2 flex flex-col justify-end items-center"
                style={{
                  height: `${(item.value / item.weight / Math.max(...items.map(i => i.value / i.weight))) * 100}%`,
                  width: "70px",
                }}
              >
                <span className="text-sm">{(item.value / item.weight).toFixed(2)}</span>
                <span className="text-sm">Item {item.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card w-full max-w-4xl bg-base-100 shadow-xl mb-6 animate-fadeInSlow">
        <div className="card-body">
          <h2 className="card-title text-white">Results</h2>
          {result.selected.length > 0 ? (
            <div>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Weight</th>
                    <th>Value</th>
                    <th>Fraction</th>
                  </tr>
                </thead>
                <tbody>
                  {result.selected.map((item, index) => (
                    <tr key={index} className="hover text-white">
                      <td>Item {item.id}</td>
                      <td>{item.weight}</td>
                      <td>{item.value}</td>
                      <td>{item.fraction.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white">Total Value: {result.totalValue.toFixed(2)}</h3>
              </div>
              <div className="mt-4 text-white">
                <h3 className="text-lg font-semibold">Calculations:</h3>
                <ul className="list-disc list-inside">
                  {result.calculations.map((calc, index) => (
                    <li key={index}>{calc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>No items selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnapsackVisualization;
