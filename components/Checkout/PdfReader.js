import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import pdf from './constore.pdf'

export default function PdfReader() {
  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

//   const pdfUrl = 'https://storage.googleapis.com/ipaymu-docs/cara-pembayaran/constore.pdf';

  return (
    <div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}
