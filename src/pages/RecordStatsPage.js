import { useContext, useEffect } from "react";
import CurrentMatchContext from "../context/CurrentMatchProvider";

function RecordStats() {
    const [currentMatch] = useContext(CurrentMatchContext);

    useEffect(() => {
      console.log(currentMatch);
    }, [currentMatch]);
  return (
    <div>
      <h1>Hello World record stats</h1>
    </div>
  );
}

export default RecordStats;
