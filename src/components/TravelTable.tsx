export default function TravelTable({ options }: { options: any[] }) {
    return (
      <table className="w-full max-w-4xl bg-white shadow rounded-lg overflow-hidden mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Mode</th>
            <th className="p-3 text-left">From → To</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Price (€)</th>
          </tr>
        </thead>
        <tbody>
          {options.map((o, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-3">{o.mode}</td>
              <td className="p-3">{o.origin} → {o.destination}</td>
              <td className="p-3">{o.date}</td>
              <td className="p-3">{o.duration}</td>
              <td className="p-3 font-semibold">€{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  