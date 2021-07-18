import { post } from "./common";
import { getUser } from "../api/user.service";
import { setSession } from "./session-storage";

export const loginUser = async ( email: string , password: string ) => {
    const authenticated = await post('/authenticate', { email, password });
    setSession(authenticated);
    if (authenticated) {
      const user = await getUser();
      return user;
      
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default loginUser;