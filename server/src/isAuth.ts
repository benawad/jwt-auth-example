import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./MyContext";
import { createAccessToken } from "./auth";
import { User } from "./entity/User";

// bearer 102930ajslkdaoq01

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (context.req.cookies.jid) {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      context.res.clearCookie("jid");
      throw new Error("not authenticated");
    }

    try {
      const token = authorization.split(" ")[1];
      const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: number };
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        context.res.clearCookie("jid");
        throw new Error("not authenticated");
      }
      context.payload = user;
    } catch (err) {
      try {
        const { userId, tokenVersion } = verify(context.req.cookies.jid, process.env.REFRESH_TOKEN_SECRET!) as { userId: number; tokenVersion: number; };
        const user = await User.findOne({ where: { id: userId } });
        if (!user || user.tokenVersion !== tokenVersion) {
          context.res.clearCookie("jid");
          throw new Error("not authenticated");
        }
        context.res.setHeader("access-token", createAccessToken(user));
        context.payload = user;
      } catch (error) {
        console.log(error);
        context.res.clearCookie("jid");
        throw new Error("not authenticated");
      }
    }
    return next();
  };
  throw new Error("not authenticated");
};
