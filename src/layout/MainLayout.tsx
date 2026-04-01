import React, { useState } from "react";
import Logo from "../~global/Logo";
import avatar from "../assets/images/profil-desktop.png";
import hamburgerIcon from "../assets/images/hamburger-icon.png";

export default function MainLayout({ children }: { readonly children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-[20px_10px_40px_rgba(62,67,74,0.31)] relative w-full h-18.5 md:pl-20 md:shadow-none px-6 py-4 flex justify-between items-center">
                {/* Logo di kiri */}
                <Logo />

                {/* Hamburger Icon (mobile only) */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <img src={hamburgerIcon} alt="Menu" className="w-6 h-6" />
                </button>

                {/* Desktop Menu (hidden di hp) */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Kategori */}
                    <details className="relative">
                        <summary className="cursor-pointer text-gray-700 font-medium hover:text-orange-500 list-none">
                            Kategori
                        </summary>
                    </details>

                    {/* Foto profil */}
                    <details className="relative pr-20">
                        <summary className="list-none cursor-pointer">
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-10 h-10 rounded-lg border border-gray-300"
                            />
                        </summary>
                    </details>
                </div>
            </header>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">
                    <button className="text-left text-gray-700 font-medium hover:text-orange-500">
                        Kategori
                    </button>
                    <div className="flex items-center gap-3">
                        <img
                            src={avatar}
                            alt="Profile"
                            className="w-10 h-10 rounded-lg border border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">Profil</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="grow bg-[#fdf8f2]">{children}</main>
        </div>
    );
}
