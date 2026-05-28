import { Sparkles } from 'lucide-react'

export default function AIInsightPanel({ title = 'AI Strategic Summary', content, recommendations = [] }) {
  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-enterprise overflow-hidden">
      <div className="px-5 py-3.5 border-b border-stone-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-navy-500/10 flex items-center justify-center">
          <Sparkles size={13} className="text-navy-500" />
        </div>
        <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
        <span className="text-[10px] bg-navy-50 text-navy-600 px-1.5 py-0.5 rounded-full font-medium ml-auto">AI Generated</span>
      </div>
      <div className="p-5">
        {typeof content === 'string' ? (
          <div className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">{content}</div>
        ) : (
          content
        )}
        {recommendations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <p className="text-[11px] font-semibold text-stone-700 mb-2">Recommendations</p>
            <ul className="space-y-1.5">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-600">
                  <span className="w-4 h-4 rounded-full bg-navy-50 text-navy-600 flex items-center justify-center text-[10px] font-semibold mt-0.5 shrink-0">{i + 1}</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
