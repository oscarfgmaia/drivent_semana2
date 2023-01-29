import { Router } from "express";
import { getTypes,getTickets,createTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .get("/",authenticateToken,getTickets)
  .post("/",authenticateToken,createTicket)
  .get("/types",authenticateToken,getTypes)


export { ticketsRouter };
