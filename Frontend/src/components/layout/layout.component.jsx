export const Layout = ({ children }) => {
  return (
    <main className="min-h-screen pt-24 bg-off-white relative z-10">
      <div className=" mx-auto">
        {children}
      </div>
    </main>
  );
};
