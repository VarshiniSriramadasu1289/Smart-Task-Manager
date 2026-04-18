interface SmartPanelProps {
  summary: string;
}

function SmartPanel({ summary }: SmartPanelProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Smart insights</p>
          <h2 className="mt-2 text-2xl font-semibold">What should I focus on?</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm uppercase tracking-[0.28em] text-slate-300">AI-inspired</span>
      </div>
      <p className="mt-5 text-base leading-7 text-slate-200">{summary}</p>
    </div>
  );
}

export default SmartPanel;
