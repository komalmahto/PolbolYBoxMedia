const Layout = (props) => {
  return (
    <div
      style={{
        paddingTop: "100px",
      }}
    >
      {props.children}
    </div>
  );
};

export default Layout;
