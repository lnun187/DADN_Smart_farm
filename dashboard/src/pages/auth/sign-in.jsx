import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated, userRole } = useAuth(); 
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError("");
    await login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/dashboard/admin-dashboard");
      } else if (userRole === "staff") {
        navigate("/dashboard/staff-dashboard");
      } else {
        navigate("/dashboard/staff-dashboard");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="container mx-auto">
        <Card className="flex-row w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full lg:w-3/5 flex flex-col items-center justify-center p-8 md:p-12 animate-fadeInUp">
            <div className="text-center mb-8">
              <Typography variant="h2" className="font-bold mb-4 text-gray-800">
                Đăng Nhập
              </Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                Nhập email và mật khẩu của bạn để tiếp tục.
              </Typography>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSignIn}>
              <div className="mb-4 flex flex-col gap-6">
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Email của bạn
                  </Typography>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="name@gmail.com"
                    className="!border-t-blue-gray-200 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20"
                    labelProps={{ className: "before:content-none after:content-none" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Mật khẩu
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20"
                    labelProps={{ className: "before:content-none after:content-none" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <Typography variant="small" color="red" className="mt-2 mb-2 text-center">
                  {error}
                </Typography>
              )}

              <div className="flex items-center justify-between mt-4 mb-2">
                <Checkbox
                  label={
                    <Typography variant="small" color="gray" className="flex items-center font-medium">
                      Remember me
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Typography variant="small" className="font-medium text-green-600 hover:text-green-700">
                  <Link to="#">Quên mật khẩu?</Link>
                </Typography>
              </div>

              <Button type="submit" className="mt-6 bg-green-500 hover:bg-green-600" fullWidth>
                Đăng Nhập
              </Button>

              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
                Chưa có tài khoản?
                <Link to="/auth/sign-up" className="text-green-600 hover:text-green-700 ml-1 font-semibold">
                  Tạo tài khoản mới
                </Link>
              </Typography>
            </form>
          </div>

          <div className="w-full lg:w-2/5 hidden lg:flex items-center justify-center">
            <img
              src="/img/modern1.png"
              alt="Greenhouse Theme"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

export default SignIn;
