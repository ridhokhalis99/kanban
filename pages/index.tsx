import { useState, useEffect } from "react";
import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import prisma from "../lib/prisma";
import { Board } from "../interfaces/Board";
import { isEmpty } from "lodash";

interface HomeProps {
  boards: [Board];
}

export const getStaticProps = async () => {
  const boards = await prisma.board.findMany();
  return {
    props: { boards },
  };
};

const Home = ({ boards }: HomeProps) => {
  const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);

  useEffect(() => {
    if (boards.length > 0) {
      return setCurrentBoard(boards[0]);
    }
  }, []);

  return (
    <div className="light">
      <Sidebar
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />

      <div
        style={{
          width: "calc(100% - 300px)",
          position: "relative",
          left: 300,
        }}
      >
        {!isEmpty(currentBoard) && <Controlbar currentBoard={currentBoard} />}
      </div>
    </div>
  );
};

export default Home;
