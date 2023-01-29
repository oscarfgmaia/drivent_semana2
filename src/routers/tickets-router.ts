import { Router } from "express";
import { getTypes,getTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .get("/",authenticateToken,getTickets)
  .get("/types",authenticateToken,getTypes)


export { ticketsRouter };
