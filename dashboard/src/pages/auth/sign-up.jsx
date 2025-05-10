import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,        
  DialogHeader,  
  DialogBody,    
  DialogFooter,  
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";


export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  
  // --- STATE MỚI CHO DIALOG ĐIỀU KHOẢN ---
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  
  // const { /* register, */ login } = useAuth(); 
  const navigate = useNavigate();

  // --- HÀM MỞ/ĐÓNG DIALOG ĐIỀU KHOẢN ---
  const handleOpenTermsDialog = () => setOpenTermsDialog(true);
  const handleCloseTermsDialog = () => setOpenTermsDialog(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("Bạn cần đồng ý với các điều khoản và điều kiện.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    
     alert(`Đăng ký thành công (giả lập) cho ${name} với email ${email}. Vui lòng đăng nhập.`);
     navigate("/auth/sign-in"); 
  };

  // --- NỘI DUNG ĐIỀU KHOẢN VÀ ĐIỀU KIỆN (TỰ CHẾ) ---
  const termsAndConditionsContent = (
    <>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        Điều Khoản và Điều Kiện Sử Dụng
      </Typography>
      <Typography className="mb-4 font-normal">
        Chào mừng bạn đến với Hệ thống Giám sát Nhà kính! Vui lòng đọc kỹ các điều khoản sau đây trước khi sử dụng dịch vụ của chúng tôi.
      </Typography>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        1. Chấp nhận Điều khoản
      </Typography>
      <Typography className="mb-3 font-normal text-sm">
        Bằng việc truy cập hoặc sử dụng Hệ thống, bạn đồng ý bị ràng buộc bởi các Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản, bạn không được phép truy cập Dịch vụ.
      </Typography>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        2. Tài khoản Người dùng
      </Typography>
      <Typography className="mb-3 font-normal text-sm">
        Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và hiện tại. Việc không làm như vậy cấu thành một sự vi phạm Điều khoản, có thể dẫn đến việc chấm dứt ngay lập tức tài khoản của bạn trên Dịch vụ của chúng tôi.
      </Typography>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        3. Sử dụng Hệ thống
      </Typography>
      <Typography className="mb-3 font-normal text-sm">
        Bạn đồng ý không sử dụng Hệ thống cho bất kỳ mục đích bất hợp pháp nào hoặc theo bất kỳ cách nào có thể gây hại, làm mất khả năng, quá tải hoặc làm suy yếu Hệ thống hoặc cản trở việc sử dụng của bất kỳ bên nào khác.
      </Typography>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        4. Sở hữu Trí tuệ
      </Typography>
      <Typography className="mb-3 font-normal text-sm">
        Hệ thống và nội dung gốc của nó (không bao gồm Nội dung do người dùng cung cấp), các tính năng và chức năng là và sẽ vẫn là tài sản độc quyền của chúng tôi và các nhà cấp phép của chúng tôi.
      </Typography>
      <Typography className="font-normal mt-4">
        Cập nhật lần cuối: 10 tháng 5, 2025
      </Typography>

    </>
  );


  return (
    <> {/* Bọc ngoài cùng bằng Fragment nếu cần cho Dialog */}
      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="container mx-auto">
          <Card className="flex-row w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-white">
            {/* Cột bên trái chứa form */}
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center p-8 md:p-12 animate-fadeInUp">
              <div className="text-center mb-8">
                <Typography variant="h2" className="font-bold mb-4 text-gray-800">Tạo Tài Khoản</Typography>
                <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Nhập thông tin của bạn để đăng ký.</Typography>
              </div>
              <form className="w-full max-w-sm" onSubmit={handleSignUp}>
                <div className="mb-1 flex flex-col gap-6">
                  <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Họ và Tên</Typography><Input size="lg" type="text" placeholder="Họ và Tên của bạn" className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300" labelProps={{ className: "before:content-none after:content-none" }} value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Email của bạn</Typography><Input size="lg" type="email" placeholder="name@mail.com" className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300" labelProps={{ className: "before:content-none after:content-none" }} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Mật khẩu</Typography><Input type="password" size="lg" placeholder="********" className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300" labelProps={{ className: "before:content-none after:content-none" }} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                  <div><Typography variant="small" color="blue-gray" className="mb-1 font-medium">Xác nhận Mật khẩu</Typography><Input type="password" size="lg" placeholder="********" className="!border-t-blue-gray-200 focus:!border-t-green-500 focus:!border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300" labelProps={{ className: "before:content-none after:content-none" }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                </div>

                {error && (<Typography variant="small" color="red" className="mt-2 mb-2 text-center">{error}</Typography>)}


                {/* Phần Checkbox "Tôi đồng ý với Điều khoản và Điều kiện" */}
                <div className="flex items-center -ml-2.5 mt-4">
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-medium cursor-pointer select-none"
                    
                  >
                    <label htmlFor="terms-checkbox" className="cursor-pointer">Tôi đồng ý với&nbsp;</label> 
                    <span 
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan ra Typography cha (nếu có)
                        handleOpenTermsDialog(); // Mở Dialog Điều khoản
                      }}
                      className="font-semibold text-green-600 hover:text-green-700 transition-colors underline cursor-pointer"
                    >
                      Điều khoản và Điều kiện
                    </span>
                  </Typography>
                </div>

                <Button type="submit" className="mt-6 bg-green-500 hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-300" fullWidth>Đăng Ký Ngay</Button>
                
                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
                  Đã có tài khoản?
                  <Link to="/auth/sign-in" className="text-green-600 hover:text-green-700 ml-1 font-semibold transition-colors">Đăng nhập</Link>
                </Typography>
              </form>
            </div>

            {/* Cột bên phải chứa ảnh */}
            <div className="w-full lg:w-2/5 hidden lg:flex items-center justify-center">
              <img src="/img/modern2.png" alt="Greenhouse Signup Theme" className="h-full w-full object-cover"/>
            </div>
          </Card>
        </div>
      </section>

      {/* --- DIALOG HIỂN THỊ ĐIỀU KHOẢN VÀ ĐIỀU KIỆN --- */}
      <Dialog open={openTermsDialog} handler={handleCloseTermsDialog} size="lg" scrollable={true}> {/* scrollable cho nội dung dài */}
        <DialogHeader>Điều khoản và Điều kiện Sử dụng Dịch vụ</DialogHeader>
        <DialogBody divider className="max-h-[70vh] overflow-y-auto"> {/* Giới hạn chiều cao và cho phép cuộn */}
          {termsAndConditionsContent} {/* Hiển thị nội dung đã tạo */}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleCloseTermsDialog}>
            Đã hiểu
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SignUp;