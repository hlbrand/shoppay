import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=ejy2o3mglg5zy4mm")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(data);
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "Morocco",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
      },
    },
  };
}
