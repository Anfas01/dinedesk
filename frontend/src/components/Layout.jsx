import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;