import React from "react";

export default () => {
  return (
    <footer
      className="text-white text-center"
      style={{
        backgroundColor: "#282c34",
        color: "#dee1e5",
        height: "50px",
        position: "fixed",
        marginTop: "10%",
        width: "100%"
      }}
    >
      Copyright &copy; {new Date().getFullYear()} Nice Infotech
    </footer>
  );
};
