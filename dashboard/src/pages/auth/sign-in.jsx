import React, { useState } from "react";
import {
  Card, // Có thể dùng Card để bọc form cho đẹp hơn
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, MOCK_USERS } from "@/context/AuthContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    setError("");
    
    const loginAttemptSuccess = login(email, password);

    if (loginAttemptSuccess) {
      const loggedInUser = MOCK_USERS[email]; 
      
      if (loggedInUser) {
        if (loggedInUser.role === 'admin') {
          console.log("Admin logged in, navigating to Admin Dashboard");
          navigate("/dashboard/admin-dashboard"); 
        } else if (loggedInUser.role === 'staff') {
          console.log("Staff logged in, navigating to Staff Dashboard");

          navigate("/dashboard/staff-dashboard"); 
        } else {
          navigate("/dashboard/staff-dashboard"); 
        }
      } else {
        setError("Lỗi không xác định vai trò người dùng.");
      }
    } else {
      setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
  };

  return (
    // Section bao ngoài, canh giữa toàn bộ nội dung
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> {/* Thêm bg-gray-100 và padding */}
      <div className="container mx-auto">
        <Card className="flex-row w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden"> {/* Dùng Card bao cả 2 cột */}
          {/* Cột bên trái chứa form */}
          <div className="w-full lg:w-3/5 flex flex-col items-center justify-center p-8 md:p-12 animate-fadeInUp"> {/* Canh giữa và thêm animation */}
            <div className="text-center mb-8">
              <Typography variant="h2" className="font-bold mb-4 text-gray-800">
                Đăng Nhập
              </Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                Nhập email và mật khẩu của bạn để tiếp tục.
              </Typography>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSignIn}> {/* Bỏ mx-auto, w-80 */}
              <div className="mb-4 flex flex-col gap-6">
                <div> {/* Bọc label và input */}
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Email của bạn
                  </Typography>
                  <Input
                    size="lg"
                    type="email" // Thêm type email
                    placeholder="name@gmail.com"
                    className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    labelProps={{ className: "before:content-none after:content-none" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
             
                  />
                </div>
                <div> {/* Bọc label và input */}
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Mật khẩu
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    labelProps={{ className: "before:content-none after:content-none" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  
                  />
                </div>
              </div>

              {error && (
                <Typography variant="small" color="red" className="mt-2 mb-2 text-center"> {/* Thêm mb-2 */}
                  {error}
                </Typography>
              )}

              <div className="flex items-center justify-between mt-4 mb-2"> {/* Điều chỉnh khoảng cách */}
                <Checkbox
                  label={
                    <Typography variant="small" color="gray" className="flex items-center font-medium">
                      Remember me 
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Typography variant="small" className="font-medium text-green-600 hover:text-green-700 transition-colors">
                  <Link to="#">Quên mật khẩu?</Link> {/* Link tới trang quên mật khẩu nếu có */}
                </Typography>
              </div>

              <Button type="submit" className="mt-6 bg-green-500 hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-300" fullWidth>
                Đăng Nhập
              </Button>
              
              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
                Chưa có tài khoản?
                <Link to="/auth/sign-up" className="text-green-600 hover:text-green-700 ml-1 font-semibold transition-colors">
                  Tạo tài khoản mới
                </Link>
              </Typography>
            </form>
          </div>

          {/* Cột bên phải chứa ảnh */}
          <div className="w-full lg:w-2/5 hidden lg:flex items-center justify-center"> {/* Thêm flex, items-center, justify-center */}
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