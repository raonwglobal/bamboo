/**
 * Cloudflare Worker entry: static assets (ASSETS) + contact API.
 * Replaces Pages Functions `functions/api/contact.ts` for Workers Builds
 * which run `wrangler deploy` (not `wrangler pages deploy`).
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(),
        });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
      }

      try {
        const data = await request.json();

        if (!data.email || !data.company) {
          return json({ error: "필수 항목 누락" }, 400);
        }

        console.log("New inquiry from b/a:", data);

        // Optional: set RESEND_API_KEY + CONTACT_EMAIL in dashboard Variables
        if (env.RESEND_API_KEY) {
          const to = env.CONTACT_EMAIL || "contact@b-a.asia";
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "b/a <noreply@b-a.asia>",
              to: [to],
              subject: `[b/a 문의] ${data.company} - ${data.industry || "일반"}`,
              html: `
                <h2>b/a 새로운 문의</h2>
                <p><b>회사:</b> ${data.company}</p>
                <p><b>이름:</b> ${data.name || ""}</p>
                <p><b>이메일:</b> ${data.email}</p>
                <p><b>업종:</b> ${data.industry || ""}</p>
                <p><b>투자규모:</b> ${data.budget || ""}</p>
                <p><b>진출지역:</b> ${data.region || ""}</p>
                <p><b>내용:</b><br/>${data.message || ""}</p>
              `,
            }),
          });
        }

        return json({ success: true, message: "문의가 접수되었습니다." }, 200);
      } catch (e) {
        console.error(e);
        return json({ error: "서버 오류" }, 500);
      }
    }

    // Static site (Next.js export in ./out)
    return env.ASSETS.fetch(request);
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
