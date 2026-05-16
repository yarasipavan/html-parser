import { useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'


function App() {
  const previewRef = useRef(null)

  const [htmlContent, setHtmlContent] = useState("")
  const [loading, setLoading] = useState(false)

  const downloadPdf = async () => {
    try {
      setLoading(true)

      const element = previewRef.current

      if (!element) {
        alert('Preview element not found')
        return
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'document.pdf',
        image: {
          type: 'jpeg',
          quality: 1
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy']
        }
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('Export failed detailed error:', error)

      alert(
        `Failed to generate PDF: ${
          error?.message || JSON.stringify(error)
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>HTML to PDF Generator</h1>

      <textarea
        className="textarea"
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value?.replace(/""/g, '"'))}
        placeholder="Paste HTML body content here..."
      />

      <div className="button-wrapper">
        <button onClick={downloadPdf} disabled={loading}>
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      <h2>Preview</h2>

      <div className="preview-wrapper">
        <div
          ref={previewRef}
          className="preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}

export default App
