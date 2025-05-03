const data = [
    { id: 1, name: "Sensor 1", value: "32°C", status: "Normal" },
    { id: 2, name: "Sensor 2", value: "35°C", status: "Warning" },
    { id: 3, name: "Sensor 3", value: "30°C", status: "Normal" },
  ];
  
  function Table() {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-3">Sensor Data</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.value}</td>
                <td className={`border p-2 ${row.status === "Warning" ? "text-red-500" : "text-green-500"}`}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Table;
  