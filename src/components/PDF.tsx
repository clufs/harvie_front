const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  column: {
    width: "33.33%",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  qrCode: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
});

import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { dbproducts, Product } from "../App";

import jsPDF from "jspdf";
const generatePDF = async () => {
  const doc = new jsPDF();

  const qrSize = 100;
  const qrMargin = 10;
  const qrSpacing = qrSize + qrMargin;

  for (const product of dbproducts) {
    const qrCodeDataURL = await QRCode.toDataURL(product.id);
    product.id = qrCodeDataURL || "no code";
  }

  let x = qrMargin;
  let y = qrMargin;

  for (let i = 0; i < dbproducts.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      x = qrMargin;
      y += qrSpacing;
    }

    const product = dbproducts[i];

    doc.text(`QR Code ${i + 1}`, x, y - 5);
    doc.addImage(product.id, "JPEG", x, y, qrSize, qrSize);
    doc.text(product.title, x, y + qrSize + 5);
    doc.text(`Código: ${product.id}`, x, y + qrSize + 15);
    doc.text(`Precio: ${product.priceToSell}`, x, y + qrSize + 25);
    doc.text(
      `Oferta: Compra ${product.unitsForOffer1} por ${product.offer1} cada uno`,
      x,
      y + qrSize + 35
    );

    x += qrSpacing;
  }

  doc.save("qrcodes.pdf");
};

export default generatePDF;

// const generatePDF = async () => {
//   const generateQRCode = async (code: any) => {
//     try {
//       const qrCodeDataURL = await QRCode.toDataURL(code);
//       return qrCodeDataURL;
//     } catch (error) {
//       console.error("Error al generar el código QR:", error);
//       return null;
//     }
//   };

//   for (const product of dbproducts) {
//     const qrCodeDataURL = await generateQRCode(product.code);
//     product.code = qrCodeDataURL || "no code";
//   }

//   const doc = (
//     <Document>
//       <Page>
//         <View style={styles.page}>
//           {dbproducts.map((product) => (
//             <View key={product.code} style={styles.column}>
//               {/* <Image src={product.code} style={styles.qrCode} /> */}
//               <QRCodeGenerator value={product.code} />
//               <Text style={styles.title}>{product.name}</Text>
//               <Text style={styles.text}>Código: {product.code}</Text>
//               <Text style={styles.text}>Precio: {product.price}</Text>
//               <Text style={styles.text}>
//                 Oferta: Compra {product.unitsForOffer1} por {product.offer1}{" "}
//                 cada uno
//               </Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );

//   // Renderizar el documento PDF utilizando el componente <PDFViewer> o guardar el PDF en un archivo
// };

// export default generatePDF;
