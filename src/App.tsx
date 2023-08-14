import "./App.css";
import { ChessDesc } from "./UI/Components/ChessDesc/ChessDesc";
import { ModalWindow } from "./UI/Components/ChessDesc/ModalWondow/ModalWindow";
import { TitleWhoseTurn } from "./UI/Components/ChessDesc/TitleWhoseTurn/TitleWhoseTurn";
import { Card } from "./UI/Components/ChessDesc/card/Card";
import { Card1 } from "./UI/Components/ChessDesc/card1/Card";

function App() {
  return (
    <div>
      <ModalWindow />
      <TitleWhoseTurn />
      <ChessDesc />

      <Card />
      <Card1 />
    </div>
  );
}

export default App;
