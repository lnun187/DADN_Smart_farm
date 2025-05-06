import React, { useState } from "react"; 
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { useAuth } from "@/context/AuthContext"; // Import hook useAuth đã tạo

export function SignIn() {
  // --- Thêm State để quản lý input và lỗi ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State cho thông báo lỗi

  // --- Lấy hàm login và navigate ---
  const { login } = useAuth();
  const navigate = useNavigate();

  // --- Hàm xử lý khi nhấn nút Sign In ---
  const handleSignIn = (event) => {
    event.preventDefault(); 
    setError(""); 

    // Gọi hàm login giả lập từ AuthContext
    const loginSuccess = login(email, password); 

    if (loginSuccess) {
      // Nếu login thành công, chuyển hướng vào dashboard
      navigate("/dashboard/home"); // Hoặc trang mặc định bạn muốn
    } else {
      // Nếu login thất bại, hiển thị lỗi
      setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        {/* --- Sử dụng onSubmit cho form --- */}
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            {/* --- Thêm value và onChange cho Input email --- */}
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            {/* --- Thêm value và onChange cho Input password --- */}
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {/* --- Hiển thị lỗi nếu có --- */}
          {error && (
            <Typography variant="small" color="red" className="mt-2 text-center">
              {error}
            </Typography>
          )}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {/* --- Thêm type="submit" cho Button Sign In --- */}
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            {/* ... Checkbox Subscribe ... */}
            {/* ... Link Forgot Password ... */}
          </div>
          <div className="space-y-4 mt-8">
             {/* ... Button Sign in with Google/Twitter ... */}
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;