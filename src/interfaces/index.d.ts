import { JwtPayload } from 'jsonwebtoken';




declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null ; //| {role:string,userId:string}
    }
  }
}