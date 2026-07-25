import crypto from "crypto";

export default new (class {
  createRandomToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
})();
