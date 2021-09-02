import { fetchAPIData } from "../api";
import { useEffect, useMemo, useState } from "react";
import Tr from "./Tr";
import "./Table.css";

const Table = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setInputText] = useState("");

  const fiteredCoins = useMemo(() => {
    return filterText.length === 0
      ? coins
      : coins.filter(
          ({ name }) =>
            name.toLowerCase().slice(0, filterText.length) === filterText
        );
  }, [filterText, coins]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchAPIData();
      data = data.sort((a, b) => {
        if (b["market_cap"] > a["market_cap"]) return -1;
        if (b["market_cap"] < a["market_cap"]) return 1;
        if (b["market_cap"] === a["market_cap"]) return 0;
      });
      setCoins(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="crypto-table">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <label>
            Фильтр по названию:
            <input type="text" value={filterText} onChange={handleChange} />
          </label>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Символ</th>
                <th>Логотип</th>
                <th>Цена</th>
                <th>
                  Изменение <br /> за час
                </th>
                <th>
                  Изменения <br />
                  за 24 часа
                </th>
                <th>Капитализация</th>
                <th>Последнее обновление</th>
              </tr>
            </thead>
            <tbody>
              {fiteredCoins.map((coin) => (
                <Tr key={coin.id} coin={coin} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Table;
