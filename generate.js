const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

const reasons = {
  work: 420,
  shopping: 350,
  health: 300,
  family: 270,
  sports: 225,
}

const generatePDF = async ({body:{name, birthdate, address, city, reason, default_signature}, files: {signature} = {}}) => {
  const existingPdfBytes = fs.readFileSync('./Attestation_de_deplacement_derogatoire.pdf')
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  firstPage.drawText(name||'', {
    x: 128,
    y: 620,
    size: 12
  });
  firstPage.drawText(birthdate||'', {
    x: 128,
    y: 595,
    size: 12
  });
  firstPage.drawText(address||'', {
    x: 128,
    y: 560,
    size: 12
  });
  firstPage.drawText('X', {
    x: 49,
    y: reasons[reason] || 406,
    size: 20
  });
  firstPage.drawText(city||'', {
    x: 370,
    y: 140,
    size: 12
  });

  const now = new Date();
  firstPage.drawText(`${now.getUTCDate()}`, {
    x: 480,
    y: 140,
    size: 12
  });
  firstPage.drawText(`${now.getMonth()+1}`, {
    x: 505,
    y: 140,
    size: 12
  });

  if (default_signature || signature.size) {
    const pngImage = await pdfDoc.embedPng(fs.readFileSync(signature.size ? signature.path : 'default-sig.png'));
    firstPage.drawImage(pngImage, {
      x: 370,
      y: 0,
      width: 100,
      height: 100,
    })
  }

  return await pdfDoc.save()
};

module.exports = generatePDF;
