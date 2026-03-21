import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 sm:py-24 pb-32 sm:pb-24 overflow-hidden relative border-t-8 border-orange-500">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
                
                {/* Brand Column */}
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start gap-6">
                    <Link className="flex items-center gap-2 text-white hover:text-orange-400 transition" href="/">
                        <span className="text-4xl drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">🌅</span>
                        <span className="text-2xl font-black tracking-tighter text-white group-hover:text-orange-400 transition-colors">Travely AI</span>
                    </Link>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                        Stop stressing over planning. Let our advanced AI curate the perfect, hyper-personalized travel itinerary so you can focus on the adventure.
                    </p>
                    <div className="flex gap-4 mt-2">
                        {/* Social Icons (Placeholders) */}
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>

                {/* Links Columns */}
                <div className="md:col-span-2 lg:col-span-2 space-y-4">
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Explore</h3>
                    <ul className="space-y-3">
                        <li><Link href="/" className="hover:text-orange-400 transition-colors font-medium">Home</Link></li>
                        <li><Link href="/create-trip" className="hover:text-amber-400 transition-colors font-medium">Create Trip</Link></li>
                        <li><Link href="/pricing" className="hover:text-rose-400 transition-colors font-medium">Pricing</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2 lg:col-span-2 space-y-4">
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Company</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">About Us</a></li>
                        <li><a href="#" className="hover:text-amber-400 transition-colors font-medium">Careers</a></li>
                        <li><a href="#" className="hover:text-rose-400 transition-colors font-medium">Contact</a></li>
                    </ul>
                </div>

                <div className="md:col-span-3 lg:col-span-4 space-y-4">
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Newsletter</h3>
                    <p className="text-slate-400 text-sm mb-4">Get the best travel tips and destination guides delivered to your inbox weekly.</p>
                    <form className="flex mt-4 max-w-sm">
                        <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 w-full text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all font-medium" />
                        <button type="button" className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-5 py-3 rounded-r-xl font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Travely AI. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-slate-500">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
