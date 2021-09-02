import axios from "axios";

export const fetchAPIData = async () => {
  return await axios
    .get("https://uralpromteh-test.herokuapp.com/coins", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
};
