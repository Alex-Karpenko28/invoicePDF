import { InvoicePDFGenerator } from "./app.js";

new InvoicePDFGenerator(
  10,
  "Jhon Doe",
  [
    { title: "Software Engineering", qty: 1, price: 500 },
    { title: "Expense", qty: 3, price: 100 },
  ],
  "Beneficiary\nIBAN \nUA70010000000000000052\nReciever PE\nPE Jhon Doe, 14000, Ukraune, reg.Chernihivska, c.Chernihiv, st. Mira, build. 5, fl.16\n  \nAccount with Institution \nBank \nJSC UNIVERSAL BANK\nCity \nKYIV, UKRAINE \nSwift code \nLLLLLLLLLL \n  \nIntermediary \nBank \nBANK TRUST AMERICANS \nCity \nNEW YORK, USA \nAccount Number \n0000007 \nSwift code \nXXXXllldspdsk",
  "Roga Pte Ltd \nFinance Department \naccountspayable@roga.com \nRoga & Copyta Pte Ltd \n83 OOdjskjd Ave, #02-01 \nUE Square, USA 2533300"
).getPDF();
