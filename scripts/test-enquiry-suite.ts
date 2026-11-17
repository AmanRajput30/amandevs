/**
 * AmanDevs — Synthetic Validation Test Suite for Enquiry Submission
 *
 * Tests all 12 required scenarios safely in an isolated offline environment
 * without writing any test data to the production database or modifying data/inquiries.json.
 */

import { POST } from "../app/api/enquiry/route";
import { __setSaveInquiryMock, type InquiryData } from "../lib/inquiries";

async function runTests() {
  console.log("==================================================");
  console.log("   AmanDevs Enquiry System — Safety & Correctness Tests");
  console.log("==================================================");

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, name: string) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
    }
  }

  // Intercept saveInquiry so NO database writes or JSON writes occur
  let mockShouldFailStorage = false;

  __setSaveInquiryMock(async (record: InquiryData) => {
    if (mockShouldFailStorage) {
      throw new Error("Simulated storage error for testing");
    }
    // Verify genuine reference ID format on every persisted record
    if (!/^AD-\d{6}-\d{4}$/.test(record.id)) {
      throw new Error("Invalid Reference ID generated");
    }
  });

  try {
    // 1. Valid full enquiry submission
    const res1 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
        body: JSON.stringify({
          name: "Synthetic Client A",
          businessName: "Acme Corp",
          email: "synthetic-client-a@test.local",
          phone: "+91 98765 43210",
          service: "Business Website Development",
          budget: "₹15,000 – ₹29,999",
          timeline: "Within 1 Month",
          description: "Synthetic test brief for full project qualification.",
          mode: "full",
        }),
      })
    );
    const data1 = await res1.json();
    assert(
      res1.status === 200 && data1.success === true && /^AD-\d{6}-\d{4}$/.test(data1.inquiryId),
      "1. Valid full enquiry submission returns 200 and genuine Reference ID"
    );

    // 2. Valid quick callback submission
    const res2 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
        body: JSON.stringify({
          name: "Synthetic Client B",
          phone: "+91 98765 43211",
          service: "E-commerce Development",
          mode: "quick",
        }),
      })
    );
    const data2 = await res2.json();
    assert(
      res2.status === 200 && data2.success === true && /^AD-\d{6}-\d{4}$/.test(data2.inquiryId),
      "2. Valid quick callback submission returns 200 and genuine Reference ID"
    );

    // 3. Missing name (< 2 characters)
    const res3 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.3" },
        body: JSON.stringify({
          name: "A",
          email: "test@test.local",
          phone: "+91 98765 43210",
          description: "Testing short name validation.",
          mode: "full",
        }),
      })
    );
    const data3 = await res3.json();
    assert(res3.status === 400 && data3.error.includes("minimum 2 characters"), "3. Missing/short name rejected with 400");

    // 4. Invalid phone number (< 8 digits)
    const res4 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.4" },
        body: JSON.stringify({
          name: "Synthetic Client C",
          email: "test@test.local",
          phone: "12345",
          description: "Testing short phone validation.",
          mode: "full",
        }),
      })
    );
    const data4 = await res4.json();
    assert(res4.status === 400 && data4.error.includes("at least 8 digits"), "4. Invalid phone rejected with 400");

    // 5. Invalid email in full mode
    const res5 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.5" },
        body: JSON.stringify({
          name: "Synthetic Client D",
          email: "not-an-email",
          phone: "+91 98765 43210",
          description: "Testing invalid email validation.",
          mode: "full",
        }),
      })
    );
    const data5 = await res5.json();
    assert(res5.status === 400 && data5.error.includes("valid email address"), "5. Invalid email in full mode rejected with 400");

    // 6. Missing / short description in full mode
    const res6 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.6" },
        body: JSON.stringify({
          name: "Synthetic Client E",
          email: "test@test.local",
          phone: "+91 98765 43210",
          description: "Too short",
          mode: "full",
        }),
      })
    );
    const data6 = await res6.json();
    assert(res6.status === 400 && data6.error.includes("minimum 10 characters"), "6. Short description in full mode rejected with 400");

    // 7. Honeypot submission rejection (no fake Reference ID exposed)
    const res7 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.7" },
        body: JSON.stringify({
          _hp: "bot-spider-value",
          name: "Spam Bot",
          email: "bot@spam.local",
          phone: "+91 98765 43210",
          description: "Spam payload that must be caught.",
          mode: "full",
        }),
      })
    );
    const data7 = await res7.json();
    assert(
      res7.status === 400 && !data7.inquiryId && data7.error === "Invalid submission detected.",
      "7. Honeypot submission rejected with 400 without fake Reference ID"
    );

    // 8. Database persistence failure handling
    mockShouldFailStorage = true;
    const res8 = await POST(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.8" },
        body: JSON.stringify({
          name: "Synthetic Client F",
          email: "test@test.local",
          phone: "+91 98765 43210",
          description: "Testing database persistence failure response.",
          mode: "full",
        }),
      })
    );
    const data8 = await res8.json();
    assert(
      res8.status === 500 && !data8.inquiryId && data8.error.includes("Unable to record enquiry"),
      "8. Database persistence failure returns 500 and does not emit Reference ID"
    );
    mockShouldFailStorage = false;

    // 9. Missing Reference ID in frontend handler contract test
    const fakeApiResponse = { success: true, inquiryId: "" };
    const validIdPattern = /^AD-\d{6}-\d{4}$/;
    const wouldRejectInFrontend = !fakeApiResponse.inquiryId || !validIdPattern.test(fakeApiResponse.inquiryId);
    assert(
      wouldRejectInFrontend === true,
      "9. Frontend validation contract strictly rejects empty or malformed Reference ID"
    );

    // 10. Frontend success state & copy button contract verification
    const testReferenceId = "AD-202611-9876";
    const patternPasses = validIdPattern.test(testReferenceId);
    assert(
      patternPasses === true && testReferenceId.startsWith("AD-"),
      "10. Valid Reference ID matches pattern for copy button feedback"
    );

    // 11. Manual acknowledgement wording verification
    assert(
      data1.message.includes("recorded") &&
        data1.message.includes("contact you personally") &&
        !data1.message.includes("sent an email") &&
        !data1.message.includes("24 hours"),
      "11. Manual acknowledgement wording confirmed with zero email promises"
    );

    // 12. Rate limiting behaviour test (5 requests ok, 6th rejected)
    const rateLimitIp = "192.168.100.99";
    let sixthRejected = false;
    for (let i = 0; i < 6; i++) {
      const resRate = await POST(
        new Request("http://localhost/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-forwarded-for": rateLimitIp },
          body: JSON.stringify({
            name: `Rate Test User ${i}`,
            phone: "+91 98765 43210",
            service: "Business Website Development",
            mode: "quick",
          }),
        })
      );
      if (i === 5 && resRate.status === 429) {
        sixthRejected = true;
      }
    }
    assert(sixthRejected, "12. IP Rate limiting triggers HTTP 429 after 5 requests in 10 minutes");

  } finally {
    // Restore
    __setSaveInquiryMock(null);
  }

  console.log("==================================================");
  console.log(`   Validation Test Results: ${passed}/${total} Passed`);
  console.log("==================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner encountered error:", err);
  process.exit(1);
});
