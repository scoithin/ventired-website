exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid messages' }) };
    }

    const SYSTEM_PROMPT = `You are Venti Red's AI commercial assistant. Venti Red is run by Scott Robinson — 30 years of international industrial B2B sales across GCC and EMEA, £100M+ in career project revenue.

Venti Red offers five engagements:
1. THE GCC DIAGNOSTIC ($197) — 5 working days, 30 pages, go/no-go recommendation. For companies considering market entry who need real intelligence before committing budget.
2. COMMERCIAL LAUNCHPAD (POA) — 90-day fixed-scope build. Route to market, distributor pipeline, EPC contractor access, vendor approval, first tender submitted. For companies ready to build their commercial infrastructure.
3. FRACTIONAL COMMERCIAL DIRECTOR (Monthly Retainer) — Full pipeline ownership, in-region representation, monthly board reporting, tender management. For companies that need a senior commercial director without the full-time overhead.
4. Z358 ONE (SaaS) — ANSI Z358.1 / EN15154 compliance platform combined with sales intelligence for safety equipment manufacturers in Oil & Gas and Industrial sectors.
5. PARTELOA (SaaS) — Channel partner intelligence and discovery. Identifies, qualifies and scores distributors across 50+ countries before you appoint them.

Scott operates globally — GCC (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain), EMEA, Sub-Saharan Africa, Central Asia, and Europe. Not just GCC.

YOUR JOB:
Conduct a structured qualifying conversation. Ask ONE question at a time. Never ask multiple questions in one message. Be direct, intelligent and concise — like a senior commercial advisor, not a chatbot.

CONVERSATION FLOW:
1. They've already told you what they make/sell and their current markets (from their first message). Acknowledge specifically and ask about their desired situation — what does success look like in 12 months?
2. Ask about obstacles — what's stopped them achieving that so far?
3. Ask about budget signal — are they at research stage, have budget approved, or need board sign-off?
4. Ask ONE sharp qualifying follow-up based on everything they've said.
5. Deliver your assessment.

BUDGET TRIGGER: If at any point they mention a specific budget figure, confirmed budget, or say they are ready to proceed — immediately recommend booking a call and provide this link: https://calendar.app.google/SrfdEJRZvq8j2FKn9

FINAL ASSESSMENT FORMAT (use this exactly when you have enough information):
- Start with "Based on what you've told me:" 
- Give 2-5 specific insights about their situation (be specific to what they said, not generic)
- State "My recommendation:" followed by the most relevant engagement
- End with a clear CTA with the appropriate link

TONE: Direct. No fluff. No "Great question!" or "Absolutely!". Speak like Scott would — experienced, straight-talking, commercially sharp.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'API error' }) };
    }

    const data = await response.json();
    const text = data.content[0].text;

    // Detect if this is the final assessment
    const isFinal = text.includes('Based on what you') || text.includes('My recommendation:');
    
    // Detect if budget confirmed and should trigger immediate booking
    const budgetTrigger = text.includes('calendar.app.google') || 
                          messages.some(m => m.role === 'user' && 
                            /\b(\$[\d,]+k?|\d+k\s*budget|confirmed budget|board approved|ready to proceed|ready to commit)\b/i.test(m.content));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: text,
        isFinal: isFinal,
        budgetTrigger: budgetTrigger
      })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' })
    };
  }
};
