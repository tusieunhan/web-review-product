import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/user.action";

export function useIsLogin() {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.common);

  const dispatch = useDispatch();
  useEffect(
    () => {
      user && dispatch(getUser(user.id));
    },
    // eslint-disable-next-line
    []
  );
  const { users } = useSelector((state) => state.user);
  const avatar = users === null || users.avatar === null ? "" : users.avatar;

  return {
    isLogin: user.user,
    avatar,
    loading,
  };
}
