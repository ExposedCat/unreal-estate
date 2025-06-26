import { setupFormats } from "./schemas/schema";

setupFormats();

export * from "./schemas/routes/login.post";
export * from "./schemas/routes/register.post";
export * from "./schemas/routes/estates.get";
export * from "./schemas/routes/estates.post";
export * from "./schemas/routes/estate.get";
export * from "./schemas/routes/session.get";

export * from "./schemas/common";
export * from "./services/response";
export * from "./schemas/schema";

export * from "./schemas/entities/estate";
export * from "./schemas/entities/user";
