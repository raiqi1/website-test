import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Terms from "../../components/Activity/Terms";
import ResponsiveAct from "../../components/Activity/ResponsiveAct";
import PackagePage from "../../components/Package/PackagePage";
import GaleryPackage from "../../components/Package/GaleryPackage";

export default function PackageDetails() {
  const [packages, setPackage] = useState({});
  const [images, setImages] = useState([]);
  const [terms, setTerms] = useState([]);
  const [activeDetail, setActiveDetail] = useState("galery");

  const fetchDetails = async (id) => {
    try {
      const res = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/package/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const data = await res.json();
      setPackage(data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil detail aktivitas:",
        error
      );
    }
  };

  const fetchImages = async (id) => {
    try {
      const res = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/package/${id}/gallery`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const dataImages = await res.json();
      setImages(dataImages);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil gambar aktivitas:",
        error
      );
    }
  };

  const fetchTerms = async (id) => {
    try {
      const resp = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/package/${id}/terms-conditions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const dataTerms = await resp.json();
      setTerms(dataTerms);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil Terms and Conditions:",
        error
      );
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    fetchDetails(id);
    fetchImages(id);
    fetchTerms(id);

    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setActiveDetail("overview");
    } else {
      setActiveDetail("galery");
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 768) {
        setActiveDetail("overview");
      } else {
        setActiveDetail("galery");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("packages", packages);
  console.log("images", images);
  console.log("terms", terms);

  return (
    <Layout>
      <div className=" ml-6 mr-6 ">
        <PackagePage activity={packages} image={images} />
        <div className="flex">
          <div className=" w-full">
            <ul className="flex gap-8 w-full">
              <li>
                <button
                  onClick={() => setActiveDetail("galery")}
                  className={`transition ${
                    activeDetail === "galery"
                      ? "border-b-2 border-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Galery
                </button>
              </li>
              <li className="md:hidden">
                <button
                  onClick={() => setActiveDetail("overview")}
                  className={`transition ${
                    activeDetail === "overview"
                      ? "border-b-2 border-black text-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Overview
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveDetail("questions")}
                  className={`transition ${
                    activeDetail === "questions"
                      ? "border-b-2 border-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Terms and Conditions
                </button>
              </li>
            </ul>
            <div>
              {activeDetail === "galery" && (
                <section className="mt-4">
                  <GaleryPackage image={images} />
                </section>
              )}
              {activeDetail === "overview" && (
                <section className="mt-4 md:hidden">
                  <ResponsiveAct activity={packages} />
                </section>
              )}
              {activeDetail === "questions" && (
                <section className="mt-4">
                  <Terms terms={terms} />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
