import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const handleChangeStart = () => {
    setLoading(true);
  };
  const handleChangeDone = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeDone);
    router.events.on("routeChangeError", handleChangeDone);
    return function cleanup() {
      router.events.off("routeChangeStart", handleChangeStart);
      router.events.off("routeChangeComplete", handleChangeDone);
      router.events.off("routeChangeError", handleChangeDone);
    };
  });

  console.log("loading");

  return (
    <div>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: "100vh",
            height: "100vh",
            background: "green",
          }}
        >
          Loading
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
