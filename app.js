import "jspdf-autotable";
import { jsPDF } from "jspdf";
import moment from "moment";


const doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: "a4",
});

let currentPossitionY = 30;

export class InvoicePDFGenerator {
  constructor(
    invoiceNumber,
    fullName,
    dataToGenerate,
    paymentDetails,
    companyDetails
  ) {
    this.invoiceNumber = invoiceNumber;
    this.fullName = fullName;
    this.dataToGenerate = dataToGenerate;
    this.paymentDetails = paymentDetails;
    this.companyDetails = companyDetails;
  }

  getPDF() {
    // doc title
    doc.setFontSize(25);
    doc.setFont("times", "bold");
    doc.text(`Invoice ${this.invoiceNumber}`, 15, currentPossitionY);

    doc.setFontSize(14);
    doc.setFont("times", "normal");
    doc.text(`${moment().format("LL")}`, 120, currentPossitionY);

    doc.setFont("times", "bold");
    doc.text(`Payment Due `, 120, (currentPossitionY += 20)); //50

    doc.setFont("times", "normal");
    doc.text(
      `${moment().endOf("month").format("LL")}`,
      120,
      (currentPossitionY += 5)
    ); //55

    doc.text(this.companyDetails, 15, (currentPossitionY += 10), {
      maxWidth: 80,
    }); //65
    doc.text(`${this.fullName}`, 120, currentPossitionY); //65

    doc.autoTable({
      headStyles: { fillColor: false, textColor: 0 },
      theme: "grid",
      startY: (currentPossitionY += 35), //100
      head: [["", "Qty.", "Price", "Total"]],
      body: this.generateTableDataAndTotalPrice(this.dataToGenerate),
      bodyStyles: {
        fillColor: false,
        textColor: 0,
      },
      tableLineColor: 0,
      styles: {
        lineColor: 0,
      },
    });

    doc.text(
      this.paymentDetails,
      15,
      (currentPossitionY += 20 + 10 * this.dataToGenerate.length),
      { maxWidth: 190 }
    ); //150 (20 + 10 * data.length )

    doc.line(15, 290, 200, 290);

    doc.save(`Invoice ${this.invoiceNumber}.pdf`);
  }

  generateTableDataAndTotalPrice(dataToGenerate) {
    const array = [];
    let totalPrice = 0;

    dataToGenerate.forEach((item, index) => {
      array.push([]);
      array[index].push(item.title);
      array[index].push(item.qty);
      array[index].push(item.price);
      totalPrice = totalPrice + item.qty * item.price;
      array[index].push(item.qty * item.price);
    });

    array.push(["", "", "Total(USD)", totalPrice]);

    return array;
  }
}
