"use client"

import Cookies from "js-cookie"
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookOpen,
  FiMail,
  FiInfo,
  FiUser,
  FiLogOut,
  FiSettings,
  FiDollarSign,
  FiShield,
} from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"

import Footer from "../components/Footer"
import { logout } from "../redux/slices/AuthSlice"

function HomeLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
  const role = useSelector((state) => state?.auth?.role)
  const avatar = useSelector((state) => state?.auth?.data?.avatar?.secure_url)
  const name = useSelector((state) => state?.auth?.data?.name)
  const firstName = name ? name.split(" ")[0] : ""

  async function onLogout() {
    await dispatch(logout())
    Cookies.remove("authToken")
    setIsDrawerOpen(false)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const navigationItems = [
    { icon: FiHome, label: "Home", path: "/" },
    { icon: FiBookOpen, label: "All Courses", path: "/courses" },
    { icon: FiDollarSign, label: "Pricing", path: "/pricing" }, // ✅ Added Pricing
    { icon: FiMail, label: "Contact Us", path: "/contact" },
    { icon: FiInfo, label: "About Us", path: "/about" },
    { icon: FiShield, label: "Privacy Policy", path: "/privacy" }, // ✅ Added Privacy Policy
  ]

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header with Menu Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-xl bg-background shadow-sm transition-all duration-200"
            style={{
              ":hover": { backgroundColor: "#FACC15", color: "black" },
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FACC15"
              e.target.style.color = "black"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = ""
              e.target.style.color = ""
            }}
            aria-label="Toggle menu"
          >
            {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          {/* Right side actions */}
          <div className="w-10" /> {/* Spacer for balance */}
          <div className="font-bold text-xl" style={{ color: "#FACC15" }}>
            MKZ Learning
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Modern Drawer */}
      <aside
        className={`
                fixed top-0 left-0 h-full w-80 bg-card/95 backdrop-blur-xl z-50
                transform transition-transform duration-300 ease-out shadow-2xl
                ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Menu</h2>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-lg transition-all duration-200"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FACC15"
                  e.target.style.color = "black"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = ""
                  e.target.style.color = ""
                }}
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          {isLoggedIn && (
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Welcome back,</p>
                  <p className="font-semibold text-foreground capitalize">
                    {firstName}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {/* Admin Dashboard */}
              {isLoggedIn && role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground transition-all duration-200 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FACC15"
                    e.currentTarget.style.color = "black"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ""
                    e.currentTarget.style.color = ""
                  }}
                >
                  <FiSettings
                    className="group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <span className="font-medium">Admin Dashboard</span>
                </Link>
              )}

              {/* Main Navigation */}
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground transition-all duration-200 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FACC15"
                    e.currentTarget.style.color = "black"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ""
                    e.currentTarget.style.color = ""
                  }}
                >
                  <item.icon
                    className="group-hover:scale-110 transition-all"
                    size={20}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Profile Link for logged in users */}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground transition-all duration-200 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FACC15"
                    e.currentTarget.style.color = "black"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ""
                    e.currentTarget.style.color = ""
                  }}
                >
                  <FiUser
                    className="group-hover:scale-110 transition-all"
                    size={20}
                  />
                  <span className="font-medium">Profile</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4">
            {!isLoggedIn ? (
              <div className="space-y-3">
                <Link to="/login" onClick={closeDrawer} className="block">
                  <button
                    className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-sm text-black"
                    style={{ backgroundColor: "#FACC15" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#E6B800"
                      e.target.style.transform = "translateY(-1px)"
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(250, 204, 21, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#FACC15"
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = ""
                    }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link to="/signup" onClick={closeDrawer} className="block">
                  <button
                    className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 border-2"
                    style={{
                      borderColor: "#FACC15",
                      color: "#FACC15",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#FACC15"
                      e.target.style.color = "black"
                      e.target.style.transform = "translateY(-1px)"
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(250, 204, 21, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"
                      e.target.style.color = "#FACC15"
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = ""
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-destructive/10 text-destructive rounded-xl font-semibold transition-all duration-200"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FACC15"
                  e.target.style.color = "black"
                  e.target.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = ""
                  e.target.style.color = ""
                  e.target.style.transform = "translateY(0)"
                }}
              >
                <FiLogOut size={18} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-20 transition-all duration-300 ${
          isDrawerOpen ? "lg:ml-80" : ""
        }`}
      >
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default HomeLayout
