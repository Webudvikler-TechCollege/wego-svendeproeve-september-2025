export const Layout = ({ children }) => {
  return (
    <main className="min-h-screen pt-24 bg-background">
      <div className=" mx-auto">
        {children}
      </div>
    </main>
  );
};
