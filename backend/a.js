import axios from "axios";

const API = "http://localhost:5050";
const MATCH_ID = 1513073;

async function testEndpoint(name, url) {
  try {
    const res = await axios.get(url);

    console.log(`\n========== ${name} ==========`);
    console.log("STATUS:", res.status);
    console.log("SUCCESS:", res.data?.success);
    console.log("COUNT:", res.data?.count);
    console.log("DATA:", JSON.stringify(res.data?.data, null, 2));
  } catch (err) {
    console.log(`\n========== ${name} ERROR ==========`);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
    console.log("MESSAGE:", err.message);
  }
}

async function run() {
  await testEndpoint("EVENTS", `${API}/api/football/${MATCH_ID}/events`);

  await testEndpoint("LINEUPS", `${API}/api/football/${MATCH_ID}/lineups`);

  await testEndpoint(
    "STATISTICS",
    `${API}/api/football/${MATCH_ID}/statistics`,
  );

  await testEndpoint("PLAYERS", `${API}/api/football/${MATCH_ID}/players`);
}

run();
