import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // 使用者資料 `truthy` 時使用 `<Outlet>` el 渲染子層級屬於使用者的資訊
  // 沒有使用者資料就導向 `'/logn'` 路由
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
