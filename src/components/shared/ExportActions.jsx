import { Download, FileText, Presentation, Share2 } from 'lucide-react'

export default function ExportActions({ onExportPDF, onExportPPT, onShare }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onExportPDF}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors"
      >
        <FileText size={13} /> Export PDF
      </button>
      <button
        onClick={onExportPPT}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors"
      >
        <Presentation size={13} /> Export PPT
      </button>
      <button
        onClick={onShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-navy-500 rounded-lg hover:bg-navy-600 transition-colors"
      >
        <Share2 size={13} /> Share
      </button>
    </div>
  )
}
