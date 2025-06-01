import { getOrderById } from "@/app/(auth)/login/actions";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  const order = await getOrderById(orderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") || "N/A";
  const firstName = searchParams.get("first_name") || "";
  const lastName = searchParams.get("last_name") || "";
  const customerName = [firstName, lastName].filter(Boolean).join(" ") || "N/A";

  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "Poppins-Regular.ttf"
  );
  const boldFontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "Poppins-Bold.ttf"
  );
  if (!fs.existsSync(fontPath) || !fs.existsSync(boldFontPath)) {
    return NextResponse.json({ error: "Font file not found" }, { status: 500 });
  }

  const doc = new PDFDocument({ margin: 50, font: fontPath });
  let buffers: Uint8Array[] = [];
  doc.on("data", buffers.push.bind(buffers));

  // Header
  doc
    .font(boldFontPath)
    .fontSize(26)
    .fillColor("#e53935")
    .text("INVOICE", { align: "left" });

  doc
    .font(fontPath)
    .fontSize(10)
    .fillColor("#888")
    .text(`Invoice #: ${order.id}`, { align: "left" })
    .text(
      `Date: ${
        order.created_at ? new Date(order.created_at).toLocaleDateString() : ""
      }`,
      { align: "left" }
    )
    .moveDown(1.5);

  // Customer Info
  doc
    .font(boldFontPath)
    .fontSize(12)
    .fillColor("#222")
    .text("Billed To:", { continued: true })
    .font(fontPath)
    .fontSize(12)
    .fillColor("#222")
    .text(`  ${customerName}`)
    .font(fontPath)
    .fontSize(12)
    .fillColor("#222")
    .text(`Email: ${email}`)
    .moveDown(1.5);

  // Items Table Header
  const tableTop = doc.y;
  doc
    .font(boldFontPath)
    .fontSize(12)
    .fillColor("#e53935")
    .text("Item", 50, tableTop)
    .text("Qty", 350, tableTop, { width: 50, align: "right" })
    .text("Price", 450, tableTop, { width: 80, align: "right" });

  doc
    .moveTo(50, tableTop + 16)
    .lineTo(550, tableTop + 16)
    .strokeColor("#e53935")
    .lineWidth(1)
    .stroke();

  // Items Table Rows
  let rowY = tableTop + 24;
  order.items.forEach((item: any) => {
    doc
      .font(fontPath)
      .fontSize(12)
      .fillColor("#222")
      .text(item.name, 50, rowY)
      .text(item.quantity.toString(), 350, rowY, { width: 50, align: "right" })
      .text(`$${Number(item.price).toFixed(2)}`, 450, rowY, { width: 80, align: "right" });
    rowY += 20;
  });

  // Total Section
  doc
    .font(boldFontPath)
    .fontSize(14)
    .fillColor("#222")
    .text("Total:", 350, rowY + 10, { width: 50, align: "right" })
    .text(`$${Number(order.total).toFixed(2)}`, 450, rowY + 10, { width: 80, align: "right" });

  // Footer
  doc
    .moveDown(4)
    .font(fontPath)
    .fontSize(10)
    .fillColor("#888")
    .text("Thank you for your purchase!", { align: "center" });

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=invoice-${order.id}.pdf`,
    },
  });
}
