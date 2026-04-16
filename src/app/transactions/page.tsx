export default function TransactionsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">Transactions Ledger</h2>
      <p className="text-zinc-400 max-w-sm">This is a placeholder page for the transactions view. Here you'd see detailed historical data.</p>
    </div>
  );
}
