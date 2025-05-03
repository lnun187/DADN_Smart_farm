import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react"


type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationProps {
  type?: NotificationType
  title: string
  message?: string
  duration?: number
  onClose?: () => void
  isVisible?: boolean
}

export default function Notification({
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
  isVisible = true,
}: NotificationProps) {
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  if (!visible) return null

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  }

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-amber-50 border-amber-200",
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
      
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
        </div>
        <button
          onClick={() => {
            setVisible(false)
            if (onClose) onClose()
          }}
          className="flex-shrink-0 rounded-full p-1 hover:bg-gray-200 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

  )
}
