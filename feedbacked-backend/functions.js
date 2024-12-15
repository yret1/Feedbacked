import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import User from "./schemas/usermodel.ts";
import Client from "./schemas/clientmodel.ts";
import jwt from "jsonwebtoken";
