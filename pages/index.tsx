import Sidebar from "../components/Sidebar";
import prisma from "../lib/prisma";

interface HomeProps {
  boards: [
    {
      id: number;
      name: string;
      created_at: Date;
    }
  ];
}

export const getStaticProps = async () => {
  const boards = await prisma.board.findMany();
  return {
    props: { boards },
  };
};

const Home = ({ boards }: HomeProps) => {
  return (
    <div className="light">
      <Sidebar boards={boards} />
    </div>
  );
};

export default Home;
