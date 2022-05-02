import { expressJwtSecret } from "jwks-rsa";
import { expressjwt } from "express-jwt";
import { AuthzOptions } from "express-jwt-authz";

export const authorizationCheck = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-49-pebi8.us.auth0.com/.well-known/jwks.json",
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ["RS256"],
});

export const authOptions: AuthzOptions = {
  customScopeKey: "permissions",
  customUserKey: "auth",
};
