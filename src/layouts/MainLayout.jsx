import { useMediaQuery } from "react-responsive"
import DesktopNavbar from "../components/desktop/NavbarDesktop"
import MobileNavbar from "../components/mobile/Navbar"

function MainLayout({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className="min-h-screen blue-gradient-bg">
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      <div className="container px-4 py-8 mx-auto content-container">{children}</div>
    </div>
  )
}

export default MainLayout

