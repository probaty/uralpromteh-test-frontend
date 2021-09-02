const Tr = ({ coin }) => {
  const lastUpdate = coin.last_updated.split("T");
  return (
    <tr>
      <td>{coin.name}</td>
      <td>{coin.symbol}</td>
      <td>
        <img src={coin.logo} height={32} width={32} alt={coin.name} />
      </td>
      <td>${coin.price.toFixed(4)}</td>
      <td>{coin.change_1h.toFixed(4)}%</td>
      <td>{coin.change_24h.toFixed(4)}%</td>
      <td>${Math.round(coin.market_cap)}</td>
      <td>
        {lastUpdate[0]}
        <br />
        {lastUpdate[1].slice(0, -5)}
      </td>
    </tr>
  );
};

export default Tr;
