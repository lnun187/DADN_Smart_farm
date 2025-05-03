import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ClockIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '70px',
          left: '6px',
          zIndex: 50,
          padding: '8px',
          borderRadius: '6px',
          backgroundColor: '#1f2937',
          color: 'white',
          border: 'none',
          outline: 'none'
        }}
      >
        {isOpen ? (
          <XMarkIcon style={{ width: 30, height: 30 }} />
        ) : (
          <Bars3Icon style={{ width: 30, height: 30 }} />
        )}
      </button>

      {/* Sidebar Menu */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          height: 'calc(100vh - 64px)',
          backgroundColor: '#1f2937',
          color: 'white',
          transition: 'all 0.3s',
          zIndex: 40,
          width: isOpen ? '140px' : '0',
          padding: isOpen ? '16px' : '0',
          overflow: 'hidden'
        }}
      >
        {isOpen && (
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <li>
              <Link to="/user-profile"
                style={linkStyle}
                onClick={() => setIsOpen(false)}>
                <HomeIcon style={iconStyle} />
                <span style={labelStyle}>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard"
                style={linkStyle}
                onClick={() => setIsOpen(false)}>
                <Squares2X2Icon style={iconStyle} />
                <span style={labelStyle}>Tổng quát</span>
              </Link>
            </li>
            <li>
              <Link to="/superchart"
                style={linkStyle}
                onClick={() => setIsOpen(false)}>
                <ChartBarIcon style={iconStyle} />
                <span style={labelStyle}>Phân tích</span>
              </Link>
            </li>
            <li>
              <Link to="/process"
                style={linkStyle}
                onClick={() => setIsOpen(false)}>
                <ClockIcon style={iconStyle} />
                <span style={labelStyle}>Quá trình</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications"
                style={linkStyle}
                onClick={() => setIsOpen(false)}>
                <BellIcon style={iconStyle} />
                <span style={labelStyle}>Thông báo</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

const linkStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px',
  borderRadius: '8px',
};

const iconStyle = {
  width: 30,
  height: 30,
  color: 'white',
};

const labelStyle = {
  marginTop: '4px',
  fontSize: '14px',
  color: '#d1d5db',
};

export default Sidebar;
