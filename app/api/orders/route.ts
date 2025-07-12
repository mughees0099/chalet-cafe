import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import User from "@/models/user";
import { sendEmail } from "@/lib/mailer";
import "@/models";
import Product from "@/models/Product";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      user,
      products,
      paymentMethod,
      totalAmount,
      notes,
      deliveryAddress,
    } = body;

    if (
      !user ||
      !products ||
      !paymentMethod ||
      !totalAmount ||
      !deliveryAddress
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const checkUser = await User.findById(user);
    if (!checkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newOrder = new Order({
      user,
      products,
      paymentMethod,
      totalAmount,
      notes,
      deliveryAddress,
    });

    await newOrder.save();
    newOrder.orderId = `ORD-${newOrder._id.toString().slice(-6).toUpperCase()}`;
    await newOrder.save();
    const populatedProducts = await Promise.all(
      newOrder.products.map(async (item) => {
        const productData = await Product.findById(item.product._id).select(
          "name price image"
        );
        return {
          name: productData.name,
          price: productData.price,
          quantity: item.quantity,
          total: productData.price * item.quantity,
        };
      })
    );

    // customer email
    const to = checkUser.email;
    const subject = "Order Received – Awaiting Confirmation | Chalet Cafe";
    const text = `Hello ${checkUser.name},
    
    We’ve received your order and it is currently pending confirmation. 🕒
    
    Our team will call you shortly to confirm the details. Once confirmed, we’ll begin preparing your order!
    
    Thank you for choosing Chalet Cafe.
    `;

    const productTableRows = populatedProducts
      .map(
        (p) => `
        <tr>
          <td>${p.name}</td>
          <td align="center">${p.quantity}</td>
          <td align="right">PKR ${p.price}</td>
          <td align="right">PKR ${p.total}</td>
        </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
    <html lang="en" style="margin: 0; padding: 0; background-color: #f4f4f4;">
      <head>
        <meta charset="UTF-8" />
        <title>Order Received</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 40px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
                <tr>
                  <td align="center" style="background-color: #FFD700; padding: 30px;">
                    <h1 style="margin: 0; color: #111;">Order Received!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <p style="font-size: 16px; color: #333;">
                      Hello <strong>${checkUser.name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #333;">
                      We’ve received your order and it is currently <strong>pending confirmation</strong>. 🕒
                    </p>
    
                    <h3 style="color: #111;">🧾 Order Summary:</h3>
                    <table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 14px; color: #333;">
                      <thead style="background-color: #f9f9f9;">
                        <tr>
                          <th align="left">Item</th>
                          <th align="center">Qty</th>
                          <th align="right">Price</th>
                          <th align="right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${productTableRows}
                        <tr>
                          <td colspan="3" align="right"><strong>Grand Total:</strong></td>
                          <td align="right"><strong>PKR ${totalAmount}</strong></td>
                        </tr>
                      </tbody>
                    </table>
    
                    <p style="font-size: 16px; color: #333; margin-top: 20px;">
                      Our team will call you shortly to confirm your order. Once confirmed, we'll begin preparing it right away.
                    </p>
    
                    <div style="margin: 30px 0; text-align: center;">
                      <a href="https://chalet-cafe.vercel.app" style="background-color: #FFD700; color: #111; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">
                        Visit Chalet Cafe
                      </a>
                    </div>
    
                    <p style="font-size: 14px; color: #999;">
                      You’ll receive another email once your order is confirmed.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Chalet Cafe. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

    // admin email
    const adminSubject = `New Order Received – ${newOrder.orderId}`;
    const adminText = `A new order has been placed.

Customer: ${checkUser.name}
Email: ${checkUser.email}
Order ID: ${newOrder.orderId}
Payment Method: ${paymentMethod}
Delivery Address: ${deliveryAddress}
Notes: ${notes || "None"}

Total Amount: PKR ${totalAmount}
`;

    const adminTableRows = populatedProducts
      .map(
        (p) => `
    <tr>
      <td>${p.name}</td>
      <td align="center">${p.quantity}</td>
      <td align="right">PKR ${p.price}</td>
      <td align="right">PKR ${p.total}</td>
    </tr>`
      )
      .join("");

    const adminHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Order Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="600" style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
            <tr>
              <td align="center" style="background-color: #ff3333; padding: 30px;">
                <h1 style="color: white;">New Order Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <h3>Order ID: ${newOrder.orderId}</h3>
                <p><strong>Customer:</strong> ${checkUser.name} (${
      checkUser.email
    })</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
                <p><strong>Notes:</strong> ${notes || "None"}</p>

                <h3 style="margin-top: 20px;">🧾 Order Summary:</h3>
                <table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                  <thead style="background-color: #f9f9f9;">
                    <tr>
                      <th align="left">Item</th>
                      <th align="center">Qty</th>
                      <th align="right">Price</th>
                      <th align="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${adminTableRows}
                    <tr>
                      <td colspan="3" align="right"><strong>Grand Total:</strong></td>
                      <td align="right"><strong>PKR ${totalAmount}</strong></td>
                    </tr>
                  </tbody>
                </table>

                <p style="margin-top: 20px;">Please confirm this order with the customer before processing.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Chalet Cafe Admin Notification
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    await sendEmail(to, subject, text, html);
    await sendEmail(
      process.env.SMTP_FROM || "",
      adminSubject,
      adminText,
      adminHtml
    );
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const reqFromUser = req.headers.get("referer")?.includes("dashboard");
    const reqFromAdmin = req.headers.get("referer")?.includes("admin");
    if (reqFromUser) {
      const userId = req.nextUrl.searchParams.get("userId");
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }
      const orders = await Order.find({ user: userId })
        .populate("user", "name email")
        .populate("products.product", "name price image")
        .sort({ createdAt: -1 });
      if (orders.length === 0) {
        return NextResponse.json(
          { message: "No orders found for this user" },
          { status: 404 }
        );
      }
      return NextResponse.json(orders, { status: 200 });
    }
    if (reqFromAdmin) {
      const orders = await Order.find({})
        .populate("user", "name email")
        .populate("products.product", "name price image")
        .sort({ createdAt: -1 });
      if (orders.length === 0) {
        return NextResponse.json(
          { message: "No orders found" },
          { status: 404 }
        );
      }
      return NextResponse.json(orders, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Failed to process GET request" },
      { status: 500 }
    );
  }
}
