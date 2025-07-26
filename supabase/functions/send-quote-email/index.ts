import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  pickupAddress: string;
  deliveryAddress: string;
  preferredDate?: string;
  vehicleType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Quote email function called");
    
    const quoteData: QuoteRequest = await req.json();
    console.log("Quote data received:", quoteData);

    const {
      customerName,
      customerEmail,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      preferredDate,
      vehicleType,
    } = quoteData;

    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Quote Request <onboarding@resend.dev>",
      to: ["alex@server9.dev"], // Quote requests will come to you
      subject: `New Quote Request from ${customerName}`,
      html: `
        <h2>New Car Transport Quote Request</h2>
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
        
        <h3>Transport Details:</h3>
        <p><strong>Pickup Address:</strong> ${pickupAddress}</p>
        <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
        <p><strong>Vehicle Type:</strong> ${vehicleType || 'Not specified'}</p>
        
        <h3>Next Steps:</h3>
        <p>Reply to this email or call <strong>${customerPhone || customerEmail}</strong> to provide the quote.</p>
        <p>Customer is expecting a response within 24 hours.</p>
      `,
    });

    console.log("Business email sent:", businessEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Auto Carrier <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Quote Request Received - We'll Get Back to You Soon!",
      html: `
        <h2>Thank you for your quote request, ${customerName}!</h2>
        <p>We have received your car transport quote request and will get back to you within 24 hours.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Pickup:</strong> ${pickupAddress}</p>
        <p><strong>Delivery:</strong> ${deliveryAddress}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
        <p><strong>Vehicle Type:</strong> ${vehicleType || 'Not specified'}</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Auto Carrier Team</p>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        businessEmailId: businessEmailResponse.data?.id,
        customerEmailId: customerEmailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);