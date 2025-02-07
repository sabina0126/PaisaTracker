export async function POST(req) {
  try {
    const { createdAt } = await req.json();
    
    if (!createdAt) {
      throw new Error("Missing 'createdAt' field");
    }

    console.log("Sending data to Flask:", { createdAt });

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ createdAt }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Prediction API Error: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Received response from Flask:", data);
    
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
