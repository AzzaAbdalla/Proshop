import dns from "dns/promises";
import mongoose from "mongoose";

// mongodb+srv waits on a DNS TXT lookup that never returns on this network.
// Resolve the SRV hosts ourselves and connect with a normal seed-list URI.
const toSeedListUri = async (uri) => {
  if (!uri?.startsWith("mongodb+srv://")) return uri;

  const parsed = new URL(uri);
  const records = await dns.resolveSrv(`_mongodb._tcp.${parsed.hostname}`);
  const hosts = records
    .map((record) => `${record.name}:${record.port}`)
    .join(",");
  const params = new URLSearchParams(parsed.search);
  params.set("tls", "true");
  if (!params.has("authSource")) params.set("authSource", "admin");

  const user = encodeURIComponent(decodeURIComponent(parsed.username));
  const pass = encodeURIComponent(decodeURIComponent(parsed.password));
  return `mongodb://${user}:${pass}@${hosts}${parsed.pathname}?${params}`;
};

const connectDB = async () => {
  try {
    const uri = await toSeedListUri(process.env.MONGO_URI);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
