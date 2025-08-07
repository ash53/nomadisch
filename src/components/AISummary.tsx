export default function AISummary({ text }: { text: string }) {
    if (!text) return null;
    return (
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-3xl shadow">
        <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
        <p>{text}</p>
      </div>
    );
  }
  